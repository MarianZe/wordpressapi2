'use client'

import { ReactNode } from 'react'
import { FileText, Upload, Database, Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './Button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-2)]">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-[var(--bg-1)] border-r border-[var(--border)] transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[var(--border)]">
            <h1 className="text-xl font-bold text-[var(--fg-1)]">
              Article to Design
            </h1>
            <p className="text-sm text-[var(--fg-3)] mt-1">Automatisierung</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <NavItem icon={<FileText />} label="Dashboard" href="/" active />
            <NavItem icon={<Upload />} label="Upload" href="/upload" />
            <NavItem icon={<Database />} label="Training Data" href="/training" />
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--fg-3)]">
              Version 1.0.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[var(--bg-1)] border-b border-[var(--border)] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden w-10" /> {/* Spacer for mobile */}
            <div className="flex-1" />
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

interface NavItemProps {
  icon: ReactNode
  label: string
  href: string
  active?: boolean
}

function NavItem({ icon, label, href, active }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] transition-colors',
        active
          ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
          : 'text-[var(--fg-2)] hover:bg-[var(--bg-2)] hover:text-[var(--fg-1)]'
      )}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  )
}
