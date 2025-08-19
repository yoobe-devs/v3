"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Search, SlidersHorizontal, Edit, ShoppingCart, ExternalLink } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  country: string
  stockQuantity: number
  requestedItems: number
  priceByQuantity: { [key: number]: number }
  estimatedDelivery: string
  specifications: string
  isActive: boolean // Added isActive property
}

const products: Product[] = [
  {
    id: "1",
    name: "Boné Azul Hapvida",
    price: 448.0,
    image: "/placeholder.svg?height=200&width=200",
    country: "Brasil",
    stockQuantity: 100,
    requestedItems: 50,
    priceByQuantity: { 1: 448.0, 5: 425.0, 10: 400.0, 50: 380.0, 100: 360.0, 1000: 340.0 },
    estimatedDelivery: "5-7 dias úteis",
    specifications: "100% algodão, ajustável, logo bordado",
    isActive: true,
  },
  {
    id: "2",
    name: "Boné Laranja Hapvida",
    price: 448.0,
    image: "/placeholder.svg?height=200&width=200",
    country: "Brasil",
    stockQuantity: 75,
    requestedItems: 30,
    priceByQuantity: { 1: 448.0, 5: 425.0, 10: 400.0, 50: 380.0, 100: 360.0, 1000: 340.0 },
    estimatedDelivery: "5-7 dias úteis",
    specifications: "100% algodão, ajustável, logo bordado",
    isActive: false,
  },
  {
    id: "3",
    name: "Boné Preto Hapvida",
    price: 448.0,
    image: "/placeholder.svg?height=200&width=200",
    country: "Brasil",
    stockQuantity: 50,
    requestedItems: 40,
    priceByQuantity: { 1: 448.0, 5: 425.0, 10: 400.0, 50: 380.0, 100: 360.0, 1000: 340.0 },
    estimatedDelivery: "5-7 dias úteis",
    specifications: "100% algodão, ajustável, logo bordado",
    isActive: true,
  },
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
  const [purchaseQuantities, setPurchaseQuantities] = useState<{ [key: string]: number }>({})

  const handleClaimMethodChange = (methodId: string) => {
    setSelectedClaimMethods((prev) =>
      prev.includes(methodId) ? prev.filter((id) => id !== methodId) : [...prev, methodId],
    )
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    setPurchaseQuantities((prev) => ({ ...prev, [productId]: quantity }))
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
              <DialogDescription>Preencha os dados do novo produto</DialogDescription>
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
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <CardTitle className="flex items-center gap-2">
                  {product.name}
                  {product.isActive ? (
                    <span className="text-xs font-normal text-green-500 bg-green-100 px-2 py-1 rounded-full">
                      Ativo
                    </span>
                  ) : (
                    <span className="text-xs font-normal text-red-500 bg-red-100 px-2 py-1 rounded-full">Inativo</span>
                  )}
                </CardTitle>
                <Link href={`/produtos/editar/${product.id}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">R$ {product.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">{product.country}</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Estoque:</span>
                    <span>{product.stockQuantity} unidades</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Solicitados (30 dias):</span>
                    <span>{product.requestedItems} unidades</span>
                  </div>
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
            <CardFooter className="flex-col items-start gap-4">
              <div className="w-full">
                <Label htmlFor={`quantity-${product.id}`}>Comprar mais</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id={`quantity-${product.id}`}
                    type="number"
                    min="1"
                    placeholder="Quantidade"
                    value={purchaseQuantities[product.id] || ""}
                    onChange={(e) => handleQuantityChange(product.id, Number.parseInt(e.target.value))}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Comprar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detalhes da Compra - {product.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>
                          <strong>Especificações:</strong> {product.specifications}
                        </p>
                        <p>
                          <strong>Prazo de entrega estimado:</strong> {product.estimatedDelivery}
                        </p>
                        <div>
                          <strong>Preço por quantidade:</strong>
                          <ul className="list-disc list-inside">
                            {Object.entries(product.priceByQuantity).map(([quantity, price]) => (
                              <li key={quantity}>
                                {quantity} unidades: R$ {price.toFixed(2)} cada
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Confirmar Pedido de Compra</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <Button variant="link" className="w-full justify-start p-0">
                <ExternalLink className="h-4 w-4 mr-2" />
                <Link href="http://catalogo.yoobe.co">Ver mais produtos no catálogo</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
