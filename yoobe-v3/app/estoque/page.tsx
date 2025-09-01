import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Edit } from 'lucide-react'

interface InventoryItem {
  id: string
  image: string
  sku: string
  name: string
  tags: string[]
  quantity: number
  lastUpdate: string
}

const inventory: InventoryItem[] = [
  {
    id: "1",
    image: "/placeholder.svg?height=50&width=50",
    sku: "YOO-BONE-6418-AZL",
    name: "Boné Azul Hapvida",
    tags: ["Boné", "Azul"],
    quantity: 50,
    lastUpdate: "01/11/2024"
  },
  {
    id: "2",
    image: "/placeholder.svg?height=50&width=50",
    sku: "YOO-BONE-6418-PRT",
    name: "Boné Preto Hapvida",
    tags: ["Boné", "Preto"],
    quantity: 30,
    lastUpdate: "03/11/2024"
  },
  {
    id: "3",
    image: "/placeholder.svg?height=50&width=50",
    sku: "CAM-POLO-5-6883",
    name: "Camisa Polo Branca Hapvida",
    tags: ["Camisa", "Branco"],
    quantity: 100,
    lastUpdate: "21/11/2024"
  }
]

export default function InventoryPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Estoque</h1>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input className="pl-9" placeholder="Pesquisar" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem do produto</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Quantidade em estoque</TableHead>
            <TableHead>Última atualização</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-mono">{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.lastUpdate}</TableCell>
              <TableCell>
                <Link href={`/produtos/editar/${item.id}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

