"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MapPin, Gift, Truck, RefreshCcw, PhoneIcon as WhatsApp } from 'lucide-react'

// Mock data for demonstration
const addresses = [
  { id: 1, street: "Rua A, 123", city: "São Paulo", state: "SP", isDefault: true },
  { id: 2, street: "Av. B, 456", city: "Rio de Janeiro", state: "RJ", isDefault: false },
]

const orders = [
  { id: 1, product: "Camiseta", method: "Pontos", description: "Camiseta azul tamanho M", date: "2023-05-15", status: "Entregue" },
  { id: 2, product: "Caneca", method: "Cartão", description: "Caneca personalizada", date: "2023-06-01", status: "Em trânsito" },
]

export default function ProfilePage() {
  const [points, setPoints] = useState(1500)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">Data de Nascimento</Label>
                  <Input id="birthday" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shirt-size">Tamanho de Camiseta</Label>
                <Select>
                  <SelectTrigger id="shirt-size">
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p">P</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="g">G</SelectItem>
                    <SelectItem value="gg">GG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferências Alimentares</Label>
                <div className="flex space-x-4">
                  <Checkbox id="vegetarian" />
                  <Label htmlFor="vegetarian">Vegetariano</Label>
                  <Checkbox id="vegan" />
                  <Label htmlFor="vegan">Vegano</Label>
                  <Checkbox id="gluten-free" />
                  <Label htmlFor="gluten-free">Sem Glúten</Label>
                </div>
              </div>
              <Button type="submit">Salvar Alterações</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Seus Pontos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold mb-4">{points}</div>
            <p>Pontos disponíveis para resgate</p>
            <Button className="mt-4 bg-white text-purple-500 hover:bg-gray-100">
              <Gift className="mr-2 h-4 w-4" />
              Resgatar Prêmios
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="addresses" className="mt-6">
        <TabsList>
          <TabsTrigger value="addresses">Endereços</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Meus Endereços</CardTitle>
              <CardDescription>Gerencie seus endereços de entrega</CardDescription>
            </CardHeader>
            <CardContent>
              {addresses.map((address) => (
                <div key={address.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{address.street}</p>
                    <p className="text-sm text-gray-500">{address.city}, {address.state}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {address.isDefault && (
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Padrão</span>
                    )}
                    <Button variant="outline" size="sm">Editar</Button>
                  </div>
                </div>
              ))}
              <Button className="mt-4">
                <MapPin className="mr-2 h-4 w-4" />
                Adicionar Novo Endereço
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Meus Pedidos</CardTitle>
              <CardDescription>Histórico de pedidos e status de entrega</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Método de Resgate</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.method}</TableCell>
                      <TableCell>{order.description}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Truck className="mr-2 h-4 w-4" />
                          Rastrear
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Atualizações de Rastreio</CardTitle>
          <CardDescription>Receba atualizações do status de entrega no seu WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Atualizar Rastreio
            </Button>
            <Button variant="outline">
              <WhatsApp className="mr-2 h-4 w-4" />
              Enviar para WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
