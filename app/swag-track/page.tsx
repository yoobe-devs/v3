"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { SwagOrder, SwagMetrics } from "@/types/swagtrack"

// Mock data for demonstration
const swagOrders: SwagOrder[] = [
  {
    id: "1",
    productName: "Company T-Shirt",
    recipient: "John Doe",
    orderDate: "2024-02-01",
    status: "delivered",
    trackingNumber: "TRACK123456",
    estimatedDelivery: "2024-02-05",
  },
  {
    id: "2",
    productName: "Branded Mug",
    recipient: "Jane Smith",
    orderDate: "2024-02-03",
    status: "shipped",
    trackingNumber: "TRACK789012",
    estimatedDelivery: "2024-02-07",
  },
  {
    id: "3",
    productName: "Company Notebook",
    recipient: "Bob Johnson",
    orderDate: "2024-02-05",
    status: "processing",
    trackingNumber: "TRACK345678",
    estimatedDelivery: "2024-02-10",
  },
]

const swagMetrics: SwagMetrics = {
  totalOrders: 150,
  activeOrders: 45,
  deliveredOrders: 100,
  averageDeliveryTime: 4.5,
}

export default function SwagTrackPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">SwagTrack</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{swagMetrics.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{swagMetrics.activeOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Entregues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{swagMetrics.deliveredOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{swagMetrics.averageDeliveryTime} dias</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rastreamento de Pedidos</CardTitle>
          <CardDescription>Acompanhe o status dos pedidos de swag</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Buscar
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="search" placeholder="Buscar por produto ou destinatário" className="pl-8" />
              </div>
            </div>
            <div className="flex-1 md:max-w-[200px]">
              <Label htmlFor="status" className="sr-only">
                Status
              </Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="shipped">Enviado</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 md:max-w-[240px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Selecionar data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID do Pedido</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Destinatário</TableHead>
                <TableHead>Data do Pedido</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nº de Rastreio</TableHead>
                <TableHead>Entrega Estimada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {swagOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.recipient}</TableCell>
                  <TableCell>{format(new Date(order.orderDate), "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "shipped"
                            ? "secondary"
                            : order.status === "processing"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {order.status === "delivered"
                        ? "Entregue"
                        : order.status === "shipped"
                          ? "Enviado"
                          : order.status === "processing"
                            ? "Processando"
                            : "Cancelado"}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.trackingNumber}</TableCell>
                  <TableCell>{format(new Date(order.estimatedDelivery), "dd/MM/yyyy")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
