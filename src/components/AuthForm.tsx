'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './Card'
import { Button } from './Button'

interface AuthFormProps {
  mode?: 'login' | 'signup'
}

export function AuthForm({ mode = 'login' }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be connected to API in Phase 3
    console.log(`${isLogin ? 'Login' : 'Signup'} attempt with`, { email, password })
    alert(`Auth-Funktion wird in Phase 3 implementiert`)
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? 'Anmelden' : 'Registrieren'}</CardTitle>
        <CardDescription>
          {isLogin
            ? 'Melde dich mit deinem Konto an'
            : 'Erstelle ein neues Konto'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--fg-2)] mb-2"
            >
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg-2)] border border-[var(--border)] rounded-[var(--radius-md)] text-[var(--fg-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--fg-2)] mb-2"
            >
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--bg-2)] border border-[var(--border)] rounded-[var(--radius-md)] text-[var(--fg-1)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {isLogin ? 'Anmelden' : 'Registrieren'}
          </Button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-sm text-[var(--fg-3)] hover:text-[var(--fg-1)] transition-colors"
          >
            {isLogin
              ? 'Noch kein Konto? Jetzt registrieren'
              : 'Bereits ein Konto? Jetzt anmelden'}
          </button>
        </form>
      </CardContent>
    </Card>
  )
}
