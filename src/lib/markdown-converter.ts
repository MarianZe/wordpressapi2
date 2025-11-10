/**
 * Markdown to HTML Converter
 *
 * Converts Markdown syntax to semantic HTML
 */

import { marked } from 'marked'

/**
 * Configure marked options
 */
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
})

/**
 * Convert Markdown to HTML
 */
export function convertMarkdownToHtml(markdown: string): string {
  try {
    const html = marked.parse(markdown)
    return typeof html === 'string' ? html : ''
  } catch (error) {
    console.error('Error converting Markdown:', error)
    return markdown // Return original text if conversion fails
  }
}

/**
 * Detect if text contains Markdown syntax
 */
export function hasMarkdownSyntax(text: string): boolean {
  const markdownPatterns = [
    /^#{1,6}\s/m, // Headers
    /\*\*.*?\*\*/g, // Bold
    /\*.*?\*/g, // Italic
    /\[.*?\]\(.*?\)/g, // Links
    /^\s*[-*+]\s/m, // Unordered lists
    /^\s*\d+\.\s/m, // Ordered lists
    /```/g, // Code blocks
  ]

  return markdownPatterns.some(pattern => pattern.test(text))
}

/**
 * Process text that might contain Markdown
 */
export function processText(text: string): string {
  if (hasMarkdownSyntax(text)) {
    return convertMarkdownToHtml(text)
  }
  return text
}

/**
 * Clean HTML output from marked (remove wrapping <p> tags if needed)
 */
export function cleanHtml(html: string): string {
  // Remove wrapping <p> tags for single-line content
  if (html.startsWith('<p>') && html.endsWith('</p>') && !html.includes('</p><p>')) {
    return html.slice(3, -4)
  }
  return html
}

/**
 * Convert inline Markdown formatting to HTML
 * (for use within Gutenkit blocks)
 */
export function convertInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // Links
}
