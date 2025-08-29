"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  image: string
  pricePoints: number
  priceReal: number
}

const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Corporativa",
    description: "Camiseta de algodão com logo da empresa",
    image: "/placeholder.svg?height=200&width=200",
    pricePoints: 500,
    priceReal: 49.90
  },
  {
    id: "2",
    name: "Caneca Personalizada",
    description: "Caneca de cerâmica com design exclusivo",
    image: "/placeholder.svg?height=200&width=200",
    pricePoints: 300,
    priceReal: 29.90
  },
  {
    id: "3",
    name: "Mochila Corporativa",
    description: "Mochila resistente com compartimento para laptop",
    image: "/placeholder.svg?height=200&width=200",
    pricePoints: 1000,
    priceReal: 99.90
  }
]

export default function LojaBrindesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Loja de Brindes</h1>
        <div className="flex items-center space-x-4">
          <Image
            src="/placeholder.svg?height=50&width=150"
            alt="Logo da Empresa"
            width={150}
            height={50}
          />
          <UserProfileMenu />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo à nossa Loja de Brindes!</h2>
        <p>Descubra produtos incríveis e resgate-os com seus pontos ou compre diretamente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p>{product.pricePoints} pontos</p>
                <p>R$ {product.priceReal.toFixed(2)}</p>
              </div>
              <Link href={`/loja-brindes/${product.id}`}>
                <Button>Ver Detalhes</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function UserProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/perfil">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
