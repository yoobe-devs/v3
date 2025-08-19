"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Store,
  Users,
  Gift,
  BookOpen,
  Boxes,
  Megaphone,
  UserPlus,
  BarChart,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react"

const mainNav = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    href: "/pedidos",
    icon: ShoppingCart,
  },
  {
    title: "Estoque",
    href: "/estoque",
    icon: Package,
  },
  {
    title: "Meus Produtos",
    href: "/produtos",
    icon: Store,
  },
  {
    title: "Loja de Brindes",
    href: "/loja-brindes",
    icon: Gift,
  },
  {
    title: "Usuários",
    href: "/usuarios",
    icon: Users,
  },
  {
    title: "Ativar produtos",
    href: "/ativar-produtos",
    icon: Gift,
  },
  {
    title: "Catálogo Online",
    href: "/catalogo",
    icon: BookOpen,
  },
  {
    title: "Criar Kit",
    href: "/criar-kit",
    icon: Boxes,
  },
  {
    title: "Minhas Campanhas",
    href: "/campanhas",
    icon: Megaphone,
  },
  {
    title: "Onboarding",
    href: "/onboarding",
    icon: UserPlus,
  },
  {
    title: "Swag Track",
    href: "/swag-track",
    icon: BarChart,
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
]

const footerNav = [
  {
    title: "Política de Privacidade",
    href: "/privacidade",
  },
  {
    title: "Termos de Uso",
    href: "/termos",
  },
  {
    title: "Contato",
    href: "/contato",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col border-r bg-white">
      <div className="p-6">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <img src="/placeholder.svg?height=40&width=40" alt="Yoobe Logo" className="h-10 w-10 rounded-full" />
            <span className="font-bold text-xl">Yoobe</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {mainNav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900",
                  pathname === item.href ? "bg-gray-100 text-gray-900" : "",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid gap-1">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-gray-500 hover:text-gray-900">
              {item.title}
            </Link>
          ))}
        </nav>
        <Button variant="outline" className="mt-6 w-full justify-start gap-2">
          <HelpCircle className="h-4 w-4" />
          Tour na plataforma
        </Button>
        <Button variant="ghost" className="mt-2 w-full justify-start gap-2 text-red-500 hover:text-red-600">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
