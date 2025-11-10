/**
 * Test Script for Article Processor
 *
 * Run with: npx tsx src/lib/test-processor.ts
 */

import { processArticleFromText } from './article-processor'

const testArticle = `# Digitalisierung in der Bildung

Die Digitalisierung revolutioniert das Bildungswesen. Moderne Lernmethoden ermöglichen personalisiertes Lernen und fördern die individuelle Entwicklung der Lernenden.

## Die Zukunft des Lernens

Digitale Tools verändern, wie wir lehren und lernen. Sie bieten neue Möglichkeiten für interaktives und engagiertes Lernen.

Praxistipp: Beginne mit kleinen Schritten: Integriere zunächst ein digitales Tool pro Monat in deinen Unterricht. So können sich Lehrende und Lernende schrittweise an die neuen Technologien gewöhnen.

Wusstest Du schon? Studien zeigen, dass digitale Lerntools die Motivation um bis zu 30% steigern können, wenn sie richtig eingesetzt werden.

## Die wichtigsten Vorteile

Die wichtigsten Vorteile digitaler Bildung sind:

- **Flexibilität**: Lernen ist nicht mehr an feste Zeiten gebunden
- **Individualisierung**: Jeder kann in seinem eigenen Tempo lernen
- **Interaktivität**: Digitale Tools fördern die aktive Teilnahme

Fun-Fact: Die erste E-Learning-Plattform wurde bereits 1960 an der University of Illinois entwickelt und hieß PLATO.

## KI im Unterricht

Künstliche Intelligenz kann Lehrkräfte unterstützen, indem sie repetitive Aufgaben automatisiert.

Prompt: Erstelle einen personalisierten Lernplan für einen Schüler der 8. Klasse, der Schwierigkeiten in Mathematik hat, aber visuell lernt. Fokussiere dich auf Algebra und Geometrie.

## Zusammenfassung

Die Digitalisierung bietet enorme Chancen für die Bildung. Mit den richtigen Tools und Strategien können wir das Lernen effektiver und zugänglicher machen.

Macher-Tipp: Hole dir Feedback von deinen Lernenden! Frage sie regelmäßig, welche digitalen Tools ihnen helfen und welche nicht. So kannst du deine digitale Lernumgebung kontinuierlich verbessern.`

async function runTest() {
  console.log('========================================')
  console.log('Article Processor Test')
  console.log('========================================\n')

  console.log('Processing test article...\n')

  try {
    // Uses rule-based pattern detection (no AI required)
    const result = await processArticleFromText(testArticle)

    console.log('✓ Processing completed successfully!\n')
    console.log(`Patterns found: ${result.patternsFound}`)
    console.log(`Processing time: ${result.processingTime}ms\n`)
    console.log('========================================')
    console.log('Generated HTML:')
    console.log('========================================\n')
    console.log(result.processedHtml)
    console.log('\n========================================')
    console.log('✓ Test completed!')
    console.log('========================================')
  } catch (error) {
    console.error('✗ Error during processing:', error)
  }
}

runTest()
