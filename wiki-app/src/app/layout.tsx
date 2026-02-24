import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { WikiProvider } from '@/components/providers/WikiProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — WikiDocs',
    default: 'WikiDocs',
  },
  description: 'Modular documentation portal template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JetBrains Mono for code */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {/*
          ThemeProvider from next-themes handles dark/light switching.
          defaultTheme="dark" — starts in dark mode.
          attribute="class"  — adds "dark" class to <html>.
          storageKey         — localStorage key for persistence.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="wiki-theme"
        >
          <WikiProvider>
            {children}
          </WikiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
