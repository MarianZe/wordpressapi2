/**
 * AI Pattern Recognition
 *
 * Uses Claude API to recognize semantic patterns in article text
 * such as "Praxistipp", "Fun-Fact", "Wusstest Du schon?", etc.
 */

import Anthropic from '@anthropic-ai/sdk'

export interface RecognizedPattern {
  type: 'praxistipp' | 'wusstest-du' | 'fun-fact' | 'faq' | 'prompt'
  startPosition: number
  endPosition: number
  content: string
  originalMarker?: string
  metadata?: {
    questions?: Array<{ question: string; answer: string }>
  }
}

export interface AnalysisResult {
  patterns: RecognizedPattern[]
  processedText: string
}

/**
 * Create the analysis prompt for Claude
 */
function createAnalysisPrompt(text: string): string {
  return `Analysiere den folgenden deutschen Artikel und identifiziere semantische Muster für spezielle Formatierungen.

WICHTIGE MUSTER ZUM ERKENNEN:

1. **Praxistipp / Macher-Tipp**: Praktische Tipps oder Handlungsempfehlungen
   - Trigger-Wörter: "Praxistipp", "Tipp", "Macher-Tipp", "So wendest du an", "Praktische Anwendung"

2. **Wusstest Du schon? / Infobox**: Interessante Zusatzinformationen oder Statistiken
   - Trigger-Wörter: "Wusstest du schon?", "Infobox", "Wusstest Du", "Interessant"

3. **Fun-Fact**: Unterhaltsame oder überraschende Fakten
   - Trigger-Wörter: "Fun-Fact", "Fun Fact", "Lustiges"

4. **Prompt / ChatGPT-Prompt**: KI-Prompts oder Beispiel-Prompts
   - Trigger-Wörter: "Prompt", "ChatGPT-Prompt", "KI-Prompt", "Beispielprompt"

5. **FAQ**: Häufig gestellte Fragen mit Antworten
   - Trigger-Wörter: "FAQ", "Häufig gestellte Fragen", "Fragen und Antworten"

ARTIKEL-TEXT:
${text}

Analysiere den Text und gib ALLE gefundenen Muster im folgenden JSON-Format zurück:

{
  "patterns": [
    {
      "type": "praxistipp" | "wusstest-du" | "fun-fact" | "prompt" | "faq",
      "content": "Der Inhalt des Musters (ohne Trigger-Wort)",
      "originalMarker": "Das gefundene Trigger-Wort",
      "metadata": { ... } // Optional, nur für FAQ
    }
  ]
}

WICHTIG:
- Suche EXPLIZIT nach den Trigger-Wörtern im Text
- Wenn du ein Trigger-Wort findest, extrahiere den dazugehörigen Inhalt
- Für FAQs: Identifiziere Frage-Antwort-Paare
- Gib NUR valides JSON zurück, ohne zusätzlichen Text
- Wenn keine Muster gefunden werden, gib ein leeres patterns-Array zurück`
}

/**
 * Analyze text using Claude API
 */
export async function analyzeTextForPatterns(
  text: string,
  apiKey: string
): Promise<AnalysisResult> {
  if (!apiKey) {
    throw new Error('Anthropic API key is required')
  }

  const anthropic = new Anthropic({
    apiKey,
  })

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: createAnalysisPrompt(text),
        },
      ],
    })

    // Extract JSON from response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.warn('No JSON found in Claude response')
      return {
        patterns: [],
        processedText: text,
      }
    }

    const parsed = JSON.parse(jsonMatch[0])

    return {
      patterns: parsed.patterns || [],
      processedText: text,
    }
  } catch (error) {
    console.error('Error analyzing text with Claude:', error)
    throw new Error('Failed to analyze text patterns')
  }
}

/**
 * Simple pattern detection without AI (fallback)
 * Looks for explicit trigger words in the text
 */
export function detectPatternsSimple(text: string): RecognizedPattern[] {
  const patterns: RecognizedPattern[] = []
  const lines = text.split('\n')

  let currentIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lowerLine = line.toLowerCase()

    // Check for Praxistipp
    if (
      lowerLine.includes('praxistipp') ||
      lowerLine.includes('macher-tipp') ||
      lowerLine.includes('tipp:')
    ) {
      const content = line.replace(/^.*?(praxistipp|macher-tipp|tipp):?\s*/i, '').trim()
      patterns.push({
        type: 'praxistipp',
        startPosition: currentIndex,
        endPosition: currentIndex + line.length,
        content,
        originalMarker: 'Praxistipp',
      })
    }

    // Check for Wusstest Du schon?
    if (
      lowerLine.includes('wusstest du') ||
      lowerLine.includes('wusstest du schon') ||
      lowerLine.includes('infobox')
    ) {
      const content = line.replace(/^.*?(wusstest du schon\?|wusstest du|infobox):?\s*/i, '').trim()
      patterns.push({
        type: 'wusstest-du',
        startPosition: currentIndex,
        endPosition: currentIndex + line.length,
        content,
        originalMarker: 'Wusstest Du schon?',
      })
    }

    // Check for Fun-Fact
    if (lowerLine.includes('fun fact') || lowerLine.includes('fun-fact')) {
      const content = line.replace(/^.*?(fun[ -]fact):?\s*/i, '').trim()
      patterns.push({
        type: 'fun-fact',
        startPosition: currentIndex,
        endPosition: currentIndex + line.length,
        content,
        originalMarker: 'Fun Fact',
      })
    }

    // Check for Prompt
    if (
      lowerLine.includes('prompt:') ||
      lowerLine.includes('chatgpt-prompt') ||
      lowerLine.includes('ki-prompt') ||
      lowerLine.includes('beispielprompt')
    ) {
      const content = line.replace(/^.*?(prompt|chatgpt-prompt|ki-prompt|beispielprompt):?\s*/i, '').trim()
      patterns.push({
        type: 'prompt',
        startPosition: currentIndex,
        endPosition: currentIndex + line.length,
        content,
        originalMarker: 'Prompt',
      })
    }

    currentIndex += line.length + 1 // +1 for newline
  }

  return patterns
}
