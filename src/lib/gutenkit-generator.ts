/**
 * Gutenkit Block Generator
 *
 * Generates WordPress Gutenberg blocks with Gutenkit formatting
 * based on semantic pattern recognition.
 */

export interface BlockPattern {
  type: 'praxistipp' | 'wusstest-du' | 'fun-fact' | 'faq' | 'prompt' | 'autorenbox'
  content: string
  metadata?: {
    questions?: Array<{ question: string; answer: string }>
  }
}

/**
 * Generates a Praxistipp (Practice Tip) box
 */
export function generatePraxistippBox(content: string): string {
  return `<!-- wp:roelmagdaleno/callout-block {"style":{"color":{"background":"#e0f2fe","text":"#063753","link":"#0c4a6e"}},"iconColorValue":"#063753"} -->
<div style="color:#063753;background-color:#e4f2e1" class="wp-block-roelmagdaleno-callout-block has-text-color has-background"><div><!-- wp:paragraph -->
<p align="center"><strong>Praxistipp</strong></br><em>${content}</em></p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:roelmagdaleno/callout-block -->`
}

/**
 * Generates a Wusstest Du schon? (Did You Know?) box
 */
export function generateWusstesDuBox(content: string): string {
  return `<!-- wp:roelmagdaleno/callout-block {"style":{"color":{"background":"#e0f2fe","text":"#063753","link":"#0c4a6e"}},"iconColorValue":"#063753"} -->
<div style="color:#063753;background-color:#dfe7f2" class="wp-block-roelmagdaleno-callout-block has-text-color has-background"><div><!-- wp:paragraph -->
<p><strong>🧠 Wusstest Du schon?</strong> ${content}</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:roelmagdaleno/callout-block -->`
}

/**
 * Generates a Fun-Fact box
 */
export function generateFunFactBox(content: string): string {
  return `<!-- wp:roelmagdaleno/callout-block {"style":{"color":{"background":"#e0f2fe","text":"#063753","link":"#0c4a6e"}},"iconColorValue":"#063753"} -->
<div style="color:#063753;background-color:#ffd191" class="wp-block-roelmagdaleno-callout-block has-text-color has-background"><div><!-- wp:paragraph -->
<p><strong>🎯 Fun Fact:</strong> ${content}</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:roelmagdaleno/callout-block -->`
}

/**
 * Generates a Prompt box (NEW HTML VERSION)
 */
export function generatePromptBox(promptContent: string): string {
  return `<!-- wp:html -->
<div class="prompt-box">
    <textarea readonly class="input-text" style="width: 100%; box-sizing: border-box; resize: none; padding: 10px; background-color: #333333; color: #ffffff; font-size: 17px;">${promptContent}</textarea>
    <button class="copy-btn" style="border-radius: 8px; padding: 10px; font-size: 17px; margin: 0; background-color: #333333; color: #ffffff;" onclick="copyRelatedText(this)">Kopieren</button>
</div>
<!-- /wp:html -->`
}

/**
 * Generates an FAQ section
 */
export function generateFAQSection(title: string, faqs: Array<{ question: string; answer: string }>): string {
  let html = `<!-- wp:heading -->
<h2 class="wp-block-heading">${title}</h2>
<!-- /wp:heading -->\n\n`

  faqs.forEach((faq) => {
    html += `<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">${faq.question}</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>${faq.answer}</p>
<!-- /wp:paragraph -->\n\n`
  })

  return html
}

/**
 * Generates the Autorenbox (Author box) - always at the end
 */
export function generateAutorenbox(): string {
  return `<!-- wp:html -->
<div class="author-box">
  <p><strong>Über den Autor</strong></p>
  <p>Dieser Artikel wurde automatisch generiert und formatiert.</p>
</div>
<!-- /wp:html -->`
}

/**
 * Main function to generate a Gutenkit block based on pattern type
 */
export function generateGutenkitBlock(pattern: BlockPattern): string {
  switch (pattern.type) {
    case 'praxistipp':
      return generatePraxistippBox(pattern.content)

    case 'wusstest-du':
      return generateWusstesDuBox(pattern.content)

    case 'fun-fact':
      return generateFunFactBox(pattern.content)

    case 'prompt':
      return generatePromptBox(pattern.content)

    case 'faq':
      if (!pattern.metadata?.questions) {
        throw new Error('FAQ pattern requires questions in metadata')
      }
      return generateFAQSection('Häufig gestellte Fragen', pattern.metadata.questions)

    case 'autorenbox':
      return generateAutorenbox()

    default:
      throw new Error(`Unknown pattern type: ${pattern.type}`)
  }
}

/**
 * Wraps text in WordPress paragraph block
 */
export function wrapInParagraph(content: string): string {
  return `<!-- wp:paragraph -->
<p>${content}</p>
<!-- /wp:paragraph -->`
}

/**
 * Wraps text in WordPress heading block
 */
export function wrapInHeading(content: string, level: 1 | 2 | 3 = 2): string {
  if (level === 1) {
    return `<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">${content}</h1>
<!-- /wp:heading -->`
  } else if (level === 2) {
    return `<!-- wp:heading -->
<h2 class="wp-block-heading">${content}</h2>
<!-- /wp:heading -->`
  } else {
    return `<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">${content}</h3>
<!-- /wp:heading -->`
  }
}

/**
 * Wraps list items in WordPress list block
 */
export function wrapInList(items: string[], ordered: boolean = false): string {
  const listItems = items.map(item => `  <!-- wp:list-item -->
  <li>${item}</li>
  <!-- /wp:list-item -->`).join('\n')

  if (ordered) {
    return `<!-- wp:list {"ordered":true,"start":1} -->
<ol start="1" class="wp-block-list">
${listItems}
</ol>
<!-- /wp:list -->`
  } else {
    return `<!-- wp:list -->
<ul class="wp-block-list">
${listItems}
</ul>
<!-- /wp:list -->`
  }
}
