"use client"

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Mock data for orders
const orders = [
  { id: 1, product: "Boné Azul", orderNumber: "ORD001", sku: "BON-001", status: "Enviado", quantity: 2, price: 89.90, paymentMethod: "Cartão de Crédito", date: "2023-11-25", user: "João Silva" },
  { id: 2, product: "Camiseta Branca", orderNumber: "ORD002", sku: "CAM-001", status: "Processando", quantity: 1, price: 49.90, paymentMethod: "Boleto", date: "2023-11-24", user: "Maria Santos" },
  { id: 3, product: "Caneca Personalizada", orderNumber: "ORD003", sku: "CAN-001", status: "Entregue", quantity: 3, price: 29.90, paymentMethod: "PIX", date: "2023-11-23", user: "Carlos Oliveira" },
  { id: 4, product: "Boné Azul", orderNumber: "ORD004", sku: "BON-001", status: "Enviado", quantity: 1, price: 89.90, paymentMethod: "Cartão de Crédito", date: "2023-11-22", user: "Ana Rodrigues" },
  { id: 5, product: "Camiseta Preta", orderNumber: "ORD005", sku: "CAM-002", status: "Processando", quantity: 2, price: 59.90, paymentMethod: "PIX", date: "2023-11-21", user: "Pedro Alves" },
]

// Mock data for dashboard insights
const dashboardData = {
  totalOrders: 150,
  totalRevenue: 7500.00,
  averageOrderValue: 50.00,
  mostSoldProduct: "Boné Azul"
}

export function PedidosClient() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pedidos</h1>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {dashboardData.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio do Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {dashboardData.averageOrderValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produto Mais Vendido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.mostSoldProduct}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Export */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input className="max-w-xs" placeholder="Buscar por produto" />
        <Input className="max-w-xs" placeholder="Buscar por usuário" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="processing">Processando</SelectItem>
            <SelectItem value="shipped">Enviado</SelectItem>
            <SelectItem value="delivered">Entregue</SelectItem>
          </SelectContent>
        </Select>
        <Button className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Orders Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nº do Pedido</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Método de Pagamento</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Usuário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.sku}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>R$ {order.price.toFixed(2)}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

