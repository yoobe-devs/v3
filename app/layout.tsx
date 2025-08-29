import { RootLayout } from "@/components/layout/root-layout"

export const metadata = {
  title: 'Yoobe Dashboard',
  description: 'Gerenciamento de produtos, pedidos e loja de brindes',
    generator: 'v0.app'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}


import './globals.css'