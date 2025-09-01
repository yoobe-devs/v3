"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const claimMethods = [
  { id: "free", label: "Grátis" },
  { id: "points", label: "Pontos" },
  { id: "credit", label: "Cartão" },
  { id: "pix", label: "PIX" },
  { id: "boleto", label: "Boleto" },
]

export default function EditProductPage() {
  const { id } = useParams()
  const [selectedClaimMethods, setSelectedClaimMethods] = useState<string[]>([])
  const [images, setImages] = useState<string[]>(["/placeholder.svg?height=200&width=200"])

  const handleClaimMethodChange = (methodId: string) => {
    setSelectedClaimMethods(prev => 
      prev.includes(methodId)
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Produto</h1>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="pricing">Preços</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="specs">Especificações</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Edite as informações básicas do produto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input id="name" defaultValue={`Produto ${id}`} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="Separe as tags por vírgula" />
              </div>
              <div className="space-y-2">
                <Label>Métodos de Resgate</Label>
                <div className="grid grid-cols-2 gap-4">
                  {claimMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={method.id}
                        checked={selectedClaimMethods.includes(method.id)}
                        onCheckedChange={() => handleClaimMethodChange(method.id)}
                      />
                      <Label htmlFor={method.id}>{method.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Preços</CardTitle>
              <CardDescription>Defina os preços do produto</CardDescription>
            </CardHeader
>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input id="price" type="number" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Preço em Pontos</Label>
                <Input id="points" type="number" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Galeria de Imagens</CardTitle>
              <CardDescription>Gerencie as imagens do produto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {images.map((image, index) => (
                  <img key={index} src={image} alt={`Produto ${index + 1}`} className="w-full h-40 object-cover rounded" />
                ))}
              </div>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specs">
          <Card>
            <CardHeader>
              <CardTitle>Especificações</CardTitle>
              <CardDescription>Adicione especificações técnicas do produto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input id="material" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensões</Label>
                <Input id="dimensions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso</Label>
                <Input id="weight" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-specs">Especificações Adicionais</Label>
                <Textarea id="additional-specs" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar Alterações</Button>
      </div>
    </div>
  )
}

