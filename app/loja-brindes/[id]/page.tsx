"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  image: string
  pricePoints: number
  priceReal: number
  rating: number
  timeToShip: string
  details: string[]
}

const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Corporativa",
    description: "Camiseta de algodão com logo da empresa",
    image: "/placeholder.svg?height=400&width=400",
    pricePoints: 500,
    priceReal: 49.90,
    rating: 4.5,
    timeToShip: "3-5 dias úteis",
    details: [
      "100% algodão",
      "Disponível em vários tamanhos",
      "Logo bordado",
      "Lavável em máquina"
    ]
  },
  {
    id: "2",
    name: "Caneca Personalizada",
    description: "Caneca de cerâmica com design exclusivo",
    image: "/placeholder.svg?height=400&width=400",
    pricePoints: 300,
    priceReal: 29.90,
    rating: 4.8,
    timeToShip: "5-7 dias úteis",
    details: [
      "Cerâmica de alta qualidade",
      "Capacidade de 350ml",
      "Design exclusivo impresso",
      "Própria para microondas e lava-louças"
    ]
  },
  {
    id: "3",
    name: "Mochila Corporativa",
    description: "Mochila resistente com compartimento para laptop",
    image: "/placeholder.svg?height=400&width=400",
    pricePoints: 1000,
    priceReal: 99.90,
    rating: 4.7,
    timeToShip: "5-7 dias úteis",
    details: [
      "Material resistente à água",
      "Compartimento acolchoado para laptop de até 15 polegadas",
      "Múltiplos bolsos organizadores",
      "Alças ajustáveis e ergonômicas"
    ]
  }
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const [redeemMethod, setRedeemMethod] = useState<"points" | "real">("points")
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("existing")
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)

  const product = products.find(p => p.id === id)

  if (!product) {
    return <div>Produto não encontrado</div>
  }

  return (
    <div className="container mx-auto p-6">
      <Link href="/loja-brindes">
        <Button variant="link">&larr; Voltar para a Loja de Brindes</Button>
      </Link>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-gray-600">{product.rating.toFixed(1)}</span>
          </div>
          <div className="mb-4">
            <p className="font-bold">Preço:</p>
            <p>{product.pricePoints} pontos</p>
            <p>R$ {product.priceReal.toFixed(2)}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Tempo estimado de envio:</p>
            <p>{product.timeToShip}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Detalhes do produto:</p>
            <ul className="list-disc list-inside">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Resgatar</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Resgatar {product.name}</DialogTitle>
                  <DialogDescription>
                    Confirme os detalhes do seu resgate abaixo.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Endereço
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        setSelectedAddress(value)
                        setShowNewAddressForm(value === "new")
                      }}
                      defaultValue="existing"
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione um endereço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="existing">Rua Exemplo, 123</SelectItem>
                        <SelectItem value="new">Adicionar novo endereço</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {showNewAddressForm && (
                    <div className="grid gap-4 col-span-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP</Label>
                          <Input id="cep" placeholder="00000-000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <Input id="cpf" placeholder="000.000.000-00" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rua">Rua</Label>
                        <Input id="rua" placeholder="Nome da rua" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="numero">Número</Label>
                          <Input id="numero" placeholder="123" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="complemento">Complemento</Label>
                          <Input id="complemento" placeholder="Apto, Sala, etc." />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input id="bairro" placeholder="Nome do bairro" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cidade">Cidade</Label>
                          <Input id="cidade" placeholder="Nome da cidade" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estado">Estado</Label>
                          <Input id="estado" placeholder="UF" />
                        </div>
                      </div>
                    </div>
                  )}
                  <RadioGroup defaultValue="points" onValueChange={(value) => setRedeemMethod(value as "points" | "real")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="points" id="points" />
                      <Label htmlFor="points">Resgatar com pontos ({product.pricePoints} pontos)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="real" id="real" />
                      <Label htmlFor="real">Pagar em Reais (R$ {product.priceReal.toFixed(2)})</Label>
                    </div>
                  </RadioGroup>
                </div>
                <DialogFooter>
                  <Button type="submit">Confirmar Resgate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
