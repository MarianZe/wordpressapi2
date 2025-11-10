/**
 * Document Parser
 *
 * Parses .docx, .doc, and .txt files and extracts plain text content
 */

import mammoth from 'mammoth'

export interface ParsedDocument {
  content: string
  filename: string
  format: 'docx' | 'txt'
}

/**
 * Parse a .docx file using mammoth
 */
async function parseDocx(buffer: ArrayBuffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer: buffer })
    return result.value
  } catch (error) {
    console.error('Error parsing DOCX:', error)
    throw new Error('Failed to parse DOCX file')
  }
}

/**
 * Parse a .txt file
 */
function parseTxt(content: string): string {
  return content
}

/**
 * Main document parser function
 * Accepts a File object and returns parsed plain text
 */
export async function parseDocument(file: File): Promise<ParsedDocument> {
  const filename = file.name
  const extension = filename.split('.').pop()?.toLowerCase()

  if (extension === 'docx' || extension === 'doc') {
    const arrayBuffer = await file.arrayBuffer()
    const content = await parseDocx(arrayBuffer)
    return {
      content,
      filename,
      format: 'docx',
    }
  } else if (extension === 'txt') {
    const content = await file.text()
    return {
      content: parseTxt(content),
      filename,
      format: 'txt',
    }
  } else {
    throw new Error(`Unsupported file format: ${extension}`)
  }
}

/**
 * Clean and normalize text content
 * Removes excessive whitespace and normalizes line breaks
 */
export function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize line breaks
    .replace(/\r/g, '\n')
    .replace(/\t/g, '  ') // Convert tabs to spaces
    .replace(/ +/g, ' ') // Collapse multiple spaces
    .trim()
}

/**
 * Split text into paragraphs
 */
export function splitIntoParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
}
