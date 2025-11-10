/**
 * Pattern Recognition (Rule-based)
 *
 * Recognizes semantic patterns in article text such as
 * "Praxistipp", "Fun-Fact", "Wusstest Du schon?", etc.
 */

export interface RecognizedPattern {
  type: 'praxistipp' | 'wusstest-du' | 'fun-fact' | 'faq' | 'prompt'
  lineIndex: number  // Which line contains this pattern
  content: string    // Content without trigger word
  originalMarker?: string
  metadata?: {
    questions?: Array<{ question: string; answer: string }>
  }
}

/**
 * Pattern detection with trigger words
 * Looks for explicit trigger words in the text and marks the line index
 */
export function detectPatternsSimple(text: string): RecognizedPattern[] {
  const patterns: RecognizedPattern[] = []
  const lines = text.split('\n')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const lowerLine = line.toLowerCase()

    // Remove HTML tags if present (e.g., <p>, </p>)
    const cleanLine = line.replace(/<\/?[^>]+(>|$)/g, '')

    // Check for Praxistipp
    if (
      lowerLine.includes('praxistipp') ||
      lowerLine.includes('macher-tipp') ||
      lowerLine.includes('tipp:')
    ) {
      const content = cleanLine.replace(/^.*?(praxistipp|macher-tipp|tipp):?\s*/i, '').trim()
      console.log(`[Pattern] Found Praxistipp at line ${i}:`, content.substring(0, 50))
      patterns.push({
        type: 'praxistipp',
        lineIndex: i,
        content,
        originalMarker: 'Praxistipp',
      })
      continue // Skip to next line - this line is now a pattern
    }

    // Check for Wusstest Du schon?
    if (
      lowerLine.includes('wusstest du') ||
      lowerLine.includes('wusstest du schon') ||
      lowerLine.includes('infobox')
    ) {
      const content = cleanLine.replace(/^.*?(wusstest du schon\?|wusstest du|infobox):?\s*/i, '').trim()
      console.log(`[Pattern] Found Wusstest Du at line ${i}:`, content.substring(0, 50))
      patterns.push({
        type: 'wusstest-du',
        lineIndex: i,
        content,
        originalMarker: 'Wusstest Du schon?',
      })
      continue // Skip to next line - this line is now a pattern
    }

    // Check for Fun-Fact
    if (lowerLine.includes('fun fact') || lowerLine.includes('fun-fact')) {
      const content = cleanLine.replace(/^.*?(fun[ -]fact):?\s*/i, '').trim()
      console.log(`[Pattern] Found Fun-Fact at line ${i}:`, content.substring(0, 50))
      patterns.push({
        type: 'fun-fact',
        lineIndex: i,
        content,
        originalMarker: 'Fun Fact',
      })
      continue // Skip to next line - this line is now a pattern
    }

    // Check for Prompt
    if (
      lowerLine.includes('prompt:') ||
      lowerLine.includes('chatgpt-prompt') ||
      lowerLine.includes('ki-prompt') ||
      lowerLine.includes('beispielprompt')
    ) {
      const content = cleanLine.replace(/^.*?(prompt|chatgpt-prompt|ki-prompt|beispielprompt):?\s*/i, '').trim()
      console.log(`[Pattern] Found Prompt at line ${i}:`, content.substring(0, 50))
      patterns.push({
        type: 'prompt',
        lineIndex: i,
        content,
        originalMarker: 'Prompt',
      })
      continue // Skip to next line - this line is now a pattern
    }
  }

  console.log(`[Pattern] Total patterns found: ${patterns.length}`)
  return patterns
}
