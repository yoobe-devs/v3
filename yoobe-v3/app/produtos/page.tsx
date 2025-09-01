"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, SlidersHorizontal, Edit } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  country: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Boné Azul Hapvida",
    price: 448.00,
    image: "/placeholder.svg?height=200&width=200",
    country: "Brasil"
  },
  {
    id: "2", 
    name: "Boné Laranja Hapvida",
    price: 448.00,
    image: "/placeholder.svg?height=200&width=200",
    country: "Brasil"
  },
  {
    id: "3",
    name: "Boné Preto Hapvida",
    price: 448.00,
    image: "/placeholder.svg?height=200&width=200",
    country: "Brasil"
  }
]

const claimMethods = [
  { id: "free", label: "Grátis" },
  { id: "points", label: "Pontos" },
  { id: "credit", label: "Cartão" },
  { id: "pix", label: "PIX" },
  { id: "boleto", label: "Boleto" },
]

export default function ProductsPage() {
  const [selectedClaimMethods, setSelectedClaimMethods] = useState<string[]>([])

  const handleClaimMethodChange = (methodId: string) => {
    setSelectedClaimMethods(prev => 
      prev.includes(methodId)
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Meus Produtos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ Novo produto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar novo produto</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo produto
              </DialogDescription>
            </DialogHeader>
            {/* Add product form would go here */}
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-9" placeholder="Pesquisar" />
        </div>
        <Select defaultValue="alfabetica">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alfabetica">Ordem Alfabética</SelectItem>
            <SelectItem value="recentes">Recentes</SelectItem>
            <SelectItem value="maior-preco">Maior preço</SelectItem>
            <SelectItem value="menor-preco">Menor preço</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <CardTitle>{product.name}</CardTitle>
                <Link href={`/produtos/editar/${product.id}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>
                <div className="flex items-center justify-between mb-4">
                  <span>R$ {product.price.toFixed(2)}</span>
                  <span>{product.country}</span>
                </div>
                <div className="space-y-4">
                  <Label>Métodos de Resgate</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {claimMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${product.id}-${method.id}`}
                          checked={selectedClaimMethods.includes(method.id)}
                          onCheckedChange={() => handleClaimMethodChange(method.id)}
                        />
                        <Label htmlFor={`${product.id}-${method.id}`}>{method.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

