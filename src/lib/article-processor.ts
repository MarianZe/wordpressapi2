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

import { parseDocument, normalizeText } from './document-parser'
import { detectPatternsSimple, RecognizedPattern } from './ai-pattern-recognition'
import { convertInlineMarkdown, hasMarkdownSyntax, convertMarkdownToHtml } from './markdown-converter'
import {
  generateGutenkitBlock,
  wrapInParagraph,
  wrapInHeading,
  wrapInList,
  generateAutorenbox,
} from './gutenkit-generator'

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
 * IMPORTANT: Lines that are converted to pattern boxes should NOT be processed as regular paragraphs
 */
function buildHtmlWithPatterns(text: string, patterns: RecognizedPattern[]): string {
  let html = ''
  const lines = text.split('\n')

  // Create a Set of line indices that are patterns (for fast lookup)
  const patternLineIndices = new Set(patterns.map(p => p.lineIndex))

  console.log('[BuildHTML] Processing', lines.length, 'lines')
  console.log('[BuildHTML] Pattern lines:', Array.from(patternLineIndices))

  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) {
      i++
      continue
    }

    // Check if this line is a pattern
    const pattern = patterns.find(p => p.lineIndex === i)

    if (pattern) {
      // This line contains a pattern - convert to Gutenkit block
      console.log(`[BuildHTML] Line ${i} is a pattern (${pattern.type}) - generating box`)
      html += generateGutenkitBlock({
        type: pattern.type,
        content: pattern.content,
        metadata: pattern.metadata,
      })
      html += '\n\n'
      i++
      // IMPORTANT: Do NOT process this line as a regular paragraph!
      continue
    }

    // This line is NOT a pattern - process normally

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

        // Make sure this list item line is not a pattern
        if (patternLineIndices.has(i)) {
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
      console.log(`[BuildHTML] Line ${i} is regular content - processing as paragraph`)
      html += processParagraph(line)
      html += '\n\n'
      i++
    }
  }

  return html.trim()
}

/**
 * Main article processing function
 * Uses rule-based pattern detection (no AI required)
 */
export async function processArticle(file: File): Promise<ProcessingResult> {
  const startTime = Date.now()

  try {
    // Step 1: Parse document
    console.log('[Step 1] Parsing document...')
    const parsed = await parseDocument(file)
    const normalizedText = normalizeText(parsed.content)
    console.log('[Step 1] Document parsed, length:', normalizedText.length)

    // Step 2: Pattern recognition (rule-based)
    console.log('[Step 2] Recognizing patterns...')
    const patterns = detectPatternsSimple(normalizedText)
    console.log(`[Step 2] Found ${patterns.length} pattern(s)`)

    // Step 3: Build HTML with Gutenkit blocks
    console.log('[Step 3] Building HTML with Gutenkit blocks...')
    let processedHtml = buildHtmlWithPatterns(normalizedText, patterns)

    // Step 4: Add Autorenbox at the end
    console.log('[Step 4] Adding Autorenbox...')
    processedHtml += '\n\n' + generateAutorenbox()

    const processingTime = Date.now() - startTime
    console.log(`[Complete] Processing completed in ${processingTime}ms`)

    return {
      originalContent: normalizedText,
      processedHtml,
      patternsFound: patterns.length,
      processingTime,
    }
  } catch (error) {
    console.error('[Error] Processing article failed:', error)
    throw error
  }
}

/**
 * Process article from text string (for testing)
 * Uses rule-based pattern detection (no AI required)
 */
export async function processArticleFromText(text: string): Promise<ProcessingResult> {
  const startTime = Date.now()

  try {
    console.log('[ProcessText] Starting processing...')
    const normalizedText = normalizeText(text)

    // Pattern recognition (rule-based)
    const patterns = detectPatternsSimple(normalizedText)
    console.log(`[ProcessText] Found ${patterns.length} pattern(s)`)

    // Build HTML
    let processedHtml = buildHtmlWithPatterns(normalizedText, patterns)
    processedHtml += '\n\n' + generateAutorenbox()

    const processingTime = Date.now() - startTime
    console.log(`[ProcessText] Completed in ${processingTime}ms`)

    return {
      originalContent: normalizedText,
      processedHtml,
      patternsFound: patterns.length,
      processingTime,
    }
  } catch (error) {
    console.error('[Error] Processing text failed:', error)
    throw error
  }
}
