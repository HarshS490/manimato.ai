import type { Metadata } from 'next'
import './globals.css'
import Provider from '@/context/Provider';

export const metadata = {
  title: "Manimato.ai – Turn Prompts into Code & Video",
  description: "Manimato.ai lets you generate code and explanatory videos directly from natural language prompts. Perfect for learning, teaching, or technical presentations.",
  metadataBase: new URL("https://manimato.ai"), //TODO: replace with actual domain
  openGraph: {
    title: "Manimato.ai – Turn Prompts into Code & Video",
    description: "Instantly convert your prompts into code snippets and narrated videos. Designed for students, educators, and developers.",
    url: "https://manimato.ai",
    siteName: "Manimato.ai",
    images: [
      {
        url: "/og-image.png", //TODO: Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Manimato.ai Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manimato.ai – Turn Prompts into Code & Video",
    description: "Generate narrated coding videos and code from simple prompts.",
    images: ["/og-image.png"], //TODO: Replace with actual image
    creator: "@yourhandle", //TODO: Optional
  },
  keywords: [
    "AI coding tool",
    "prompt to code",
    "prompt to video",
    "educational AI",
    "explain code",
    "Manimato",
    "AI video generator",
  ],
  authors: [{ name: "Harsh Singh", url: "https://github.com/Harsh3011" }],
  themeColor: "#111827",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
