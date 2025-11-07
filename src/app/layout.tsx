import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Article to Design Automatisierung',
  description: 'Transformiere Artikel automatisch in WordPress-kompatiblen HTML-Code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
