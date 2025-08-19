"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Link, Share2, Package } from 'lucide-react'

interface Product {
  id: string
  name: string
  color: string
  stock: number
}

const products: Product[] = [
  { id: "1", name: "Camiseta", color: "bg-blue-500", stock: 50 },
  { id: "2", name: "Caneca", color: "bg-green-500", stock: 30 },
  { id: "3", name: "Adesivos", color: "bg-yellow-500", stock: 100 },
  { id: "4", name: "Caderno", color: "bg-purple-500", stock: 40 },
  { id: "5", name: "Squeeze", color: "bg-red-500", stock: 0 },
  { id: "6", name: "Boné", color: "bg-indigo-500", stock: 25 },
  { id: "7", name: "Chaveiro", color: "bg-pink-500", stock: 75 },
  { id: "8", name: "Mousepad", color: "bg-teal-500", stock: 60 },
]

const redeemers = [
  { id: "1", name: "Alice Silva", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Bob Santos", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Carol Oliveira", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function OnboardingPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("1")
  const [welcomeText, setWelcomeText] = useState("")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Configuração de Onboarding</h1>
      
      <Tabs defaultValue="template" className="space-y-4">
        <TabsList>
          <TabsTrigger value="template">Template</TabsTrigger>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="invitations">Convites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="template">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Escolha o Template de Onboarding</CardTitle>
              <CardDescription className="text-gray-600">
                Selecione o layout para a página de resgate de onboarding. Cada template oferece uma experiência única para seus novos usuários.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {[1, 2, 3].map((templateId) => (
                  <div
                    key={templateId}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                      selectedTemplate === templateId.toString() ? 'ring-4 ring-primary' : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedTemplate(templateId.toString())}
                  >
                    <Image
                      src={`/placeholder.svg?height=200&width=300&text=Template ${templateId}`}
                      alt={`Template ${templateId}`}
                      width={300}
                      height={200}
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white font-semibold">Template {templateId}</h3>
                      <p className="text-gray-200 text-sm">Descrição breve do template</p>
                    </div>
                    {selectedTemplate === templateId.toString() && (
                      <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo da Página</CardTitle>
              <CardDescription>Personalize o conteúdo da página de onboarding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-text">Texto de Boas-vindas</Label>
                <Textarea
                  id="welcome-text"
                  placeholder="Digite sua mensagem de boas-vindas..."
                  value={welcomeText}
                  onChange={(e) => setWelcomeText(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover-image">Imagem de Capa</Label>
                <Input id="cover-image" type="file" accept="image/*" onChange={handleImageUpload} />
                {coverImage && (
                  <img src={coverImage} alt="Cover" className="mt-2 max-w-sm rounded-lg" />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Produtos do Kit</CardTitle>
              <CardDescription>Selecione os itens que farão parte do kit de onboarding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`product-${product.id}`}
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleProductToggle(product.id)}
                      disabled={product.stock === 0}
                    />
                    <label
                      htmlFor={`product-${product.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${product.color} mr-2`}></div>
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Estoque: {product.stock} {product.stock === 1 ? 'unidade' : 'unidades'}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <h4 className="font-semibold mb-2">Itens selecionados para o kit:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProducts.map((id) => {
                    const product = products.find(p => p.id === id)
                    return product ? (
                      <Badge key={id} variant="secondary" className={`${product.color} text-white`}>
                        {product.name}
                      </Badge>
                    ) : null
                  })}
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="invitations">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Convites</CardTitle>
              <CardDescription>Envie convites e gerencie os resgates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invite-search">Buscar usuário para convidar</Label>
                <div className="flex space-x-2">
                  <Input id="invite-search" placeholder="Nome ou email do usuário" />
                  <Button>Convidar</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Compartilhar</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Resgates Realizados</Label>
                <div className="flex flex-wrap gap-2">
                  {redeemers.map((redeemer) => (
                    <div key={redeemer.id} className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={redeemer.avatar} alt={redeemer.name} />
                        <AvatarFallback>{redeemer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{redeemer.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label htmlFor="airplane-mode">Ativar página de resgate</Label>
        </div>
        <Button>Salvar Configurações</Button>
      </div>
    </div>
  )
}
