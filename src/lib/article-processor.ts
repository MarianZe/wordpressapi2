/**
 * Article Processor
 *
 * Main processing pipeline that orchestrates:
 * 1. Document parsing
 * 2. Pattern recognition
 * 3. Markdown conversion
 * 4. Gutenkit block generation
 * 5. Final HTML assembly
 */

import { parseDocument, normalizeText, splitIntoParagraphs } from './document-parser'
import { analyzeTextForPatterns, detectPatternsSimple, RecognizedPattern } from './ai-pattern-recognition'
import { convertInlineMarkdown, hasMarkdownSyntax, convertMarkdownToHtml } from './markdown-converter'
import {
  generateGutenkitBlock,
  wrapInParagraph,
  wrapInHeading,
  wrapInList,
  generateAutorenbox,
} from './gutenkit-generator'

export interface ProcessingOptions {
  useAI?: boolean
  anthropicApiKey?: string
}

export interface ProcessingResult {
  originalContent: string
  processedHtml: string
  patternsFound: number
  processingTime: number
}

/**
 * Process a single paragraph and convert to HTML
 */
function processParagraph(paragraph: string): string {
  // Check if it's a heading
  if (paragraph.startsWith('# ')) {
    return wrapInHeading(paragraph.slice(2).trim(), 1)
  } else if (paragraph.startsWith('## ')) {
    return wrapInHeading(paragraph.slice(3).trim(), 2)
  } else if (paragraph.startsWith('### ')) {
    return wrapInHeading(paragraph.slice(4).trim(), 3)
  }

  // Check if it's a list
  if (/^[-*+]\s/.test(paragraph)) {
    const items = paragraph.split('\n').map(line =>
      line.replace(/^[-*+]\s/, '').trim()
    )
    return wrapInList(items, false)
  } else if (/^\d+\.\s/.test(paragraph)) {
    const items = paragraph.split('\n').map(line =>
      line.replace(/^\d+\.\s/, '').trim()
    )
    return wrapInList(items, true)
  }

  // Check if it has Markdown syntax
  if (hasMarkdownSyntax(paragraph)) {
    const html = convertMarkdownToHtml(paragraph)
    // If the HTML is just a paragraph, unwrap it for our own wrapper
    if (html.startsWith('<p>') && html.endsWith('</p>')) {
      return wrapInParagraph(html.slice(3, -4))
    }
    return html
  }

  // Regular paragraph with inline markdown
  const processed = convertInlineMarkdown(paragraph)
  return wrapInParagraph(processed)
}

/**
 * Build the text segments, replacing patterns with Gutenkit blocks
 */
function buildHtmlWithPatterns(text: string, patterns: RecognizedPattern[]): string {
  // Sort patterns by position
  const sortedPatterns = [...patterns].sort((a, b) => a.startPosition - b.startPosition)

  let html = ''
  const lines = text.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) {
      i++
      continue
    }

    // Check if this line contains a pattern
    const linePos = lines.slice(0, i).join('\n').length + i
    const pattern = sortedPatterns.find(
      p => linePos >= p.startPosition && linePos <= p.endPosition
    )

    if (pattern) {
      // Generate Gutenkit block for this pattern
      html += generateGutenkitBlock({
        type: pattern.type,
        content: pattern.content,
        metadata: pattern.metadata,
      })
      html += '\n\n'

      // Remove this pattern from the list
      const index = sortedPatterns.indexOf(pattern)
      if (index > -1) {
        sortedPatterns.splice(index, 1)
      }
      i++
    } else {
      // Check if this is a list item
      if (/^[-*+]\s/.test(line) || /^\d+\.\s/.test(line)) {
        // Collect all consecutive list items
        const isOrdered = /^\d+\.\s/.test(line)
        const listItems: string[] = []

        while (i < lines.length) {
          const currentLine = lines[i].trim()
          if (!currentLine) {
            i++
            break
          }

          if (isOrdered ? /^\d+\.\s/.test(currentLine) : /^[-*+]\s/.test(currentLine)) {
            const item = currentLine.replace(/^[-*+]\s/, '').replace(/^\d+\.\s/, '').trim()
            // Convert inline markdown in list items
            listItems.push(convertInlineMarkdown(item))
            i++
          } else {
            break
          }
        }

        if (listItems.length > 0) {
          html += wrapInList(listItems, isOrdered)
          html += '\n\n'
        }
      } else {
        // Regular line, process as paragraph or heading
        html += processParagraph(line)
        html += '\n\n'
        i++
      }
    }
  }

  return html.trim()
}

/**
 * Main article processing function
 */
export async function processArticle(
  file: File,
  options: ProcessingOptions = {}
): Promise<ProcessingResult> {
  const startTime = Date.now()

  try {
    // Step 1: Parse document
    console.log('Step 1: Parsing document...')
    const parsed = await parseDocument(file)
    const normalizedText = normalizeText(parsed.content)

    // Step 2: Pattern recognition
    console.log('Step 2: Recognizing patterns...')
    let patterns: RecognizedPattern[] = []

    if (options.useAI && options.anthropicApiKey) {
      try {
        console.log('Using AI pattern recognition...')
        const analysis = await analyzeTextForPatterns(normalizedText, options.anthropicApiKey)
        patterns = analysis.patterns
      } catch (error) {
        console.warn('AI pattern recognition failed, falling back to simple detection:', error)
        patterns = detectPatternsSimple(normalizedText)
      }
    } else {
      console.log('Using simple pattern detection...')
      patterns = detectPatternsSimple(normalizedText)
    }

    console.log(`Found ${patterns.length} patterns`)

    // Step 3: Build HTML with Gutenkit blocks
    console.log('Step 3: Building HTML with Gutenkit blocks...')
    let processedHtml = buildHtmlWithPatterns(normalizedText, patterns)

    // Step 4: Add Autorenbox at the end
    processedHtml += '\n\n' + generateAutorenbox()

    const processingTime = Date.now() - startTime
    console.log(`Processing completed in ${processingTime}ms`)

    return {
      originalContent: normalizedText,
      processedHtml,
      patternsFound: patterns.length,
      processingTime,
    }
  } catch (error) {
    console.error('Error processing article:', error)
    throw error
  }
}

/**
 * Process article from text string (for testing)
 */
export async function processArticleFromText(
  text: string,
  options: ProcessingOptions = {}
): Promise<ProcessingResult> {
  const startTime = Date.now()

  try {
    const normalizedText = normalizeText(text)

    // Pattern recognition
    let patterns: RecognizedPattern[] = []

    if (options.useAI && options.anthropicApiKey) {
      try {
        const analysis = await analyzeTextForPatterns(normalizedText, options.anthropicApiKey)
        patterns = analysis.patterns
      } catch (error) {
        console.warn('AI pattern recognition failed, falling back to simple detection:', error)
        patterns = detectPatternsSimple(normalizedText)
      }
    } else {
      patterns = detectPatternsSimple(normalizedText)
    }

    // Build HTML
    let processedHtml = buildHtmlWithPatterns(normalizedText, patterns)
    processedHtml += '\n\n' + generateAutorenbox()

    const processingTime = Date.now() - startTime

    return {
      originalContent: normalizedText,
      processedHtml,
      patternsFound: patterns.length,
      processingTime,
    }
  } catch (error) {
    console.error('Error processing article from text:', error)
    throw error
  }
}
