"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface User {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  entryDate: string
  birthDate: string
  tags: string[]
}

const users: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@example.com",
    cpf: "123.456.789-00",
    phone: "(41) 99999-9999",
    entryDate: "01/01/2023",
    birthDate: "15/05/1990",
    tags: ["Onboarding"]
  }
]

export default function UsersPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>+ Novo usuário</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar novo usuário</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo usuário
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="geral" className="w-full">
              <TabsList>
                <TabsTrigger value="geral">Geral</TabsTrigger>
                <TabsTrigger value="enderecos">Endereços</TabsTrigger>
                <TabsTrigger value="permissoes">Permissões</TabsTrigger>
                <TabsTrigger value="pontos">Pontos</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entryDate">Data de ingresso/contratação</Label>
                    <Input id="entryDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de nascimento</Label>
                    <Input id="birthDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Ex.: 1 ano, onboarding..." />
                </div>
              </TabsContent>
              <TabsContent value="pontos" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Pontos atuais</Label>
                    <span className="text-2xl font-bold">1000</span>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pointsAction">Ação</Label>
                    <Select defaultValue="add">
                      <SelectTrigger id="pointsAction">
                        <SelectValue placeholder="Selecione a ação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">Adicionar pontos</SelectItem>
                        <SelectItem value="remove">Remover pontos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pointsAmount">Quantidade de pontos</Label>
                    <Input id="pointsAmount" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pointsReason">Motivo da ação</Label>
                    <Input id="pointsReason" placeholder="Ex: Participação em evento" />
                  </div>
                  <Button>Aplicar alteração de pontos</Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data de ingresso</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto font-normal">{user.name}</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Usuário</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">Nome</Label>
                        <Input id="edit-name" defaultValue={user.name} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-email" className="text-right">Email</Label>
                        <Input id="edit-email" defaultValue={user.email} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-cpf" className="text-right">CPF</Label>
                        <Input id="edit-cpf" defaultValue={user.cpf} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-phone" className="text-right">Telefone</Label>
                        <Input id="edit-phone" defaultValue={user.phone} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-entryDate" className="text-right">Data de ingresso</Label>
                        <Input id="edit-entryDate" type="date" defaultValue={user.entryDate} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-birthDate" className="text-right">Data de nascimento</Label>
                        <Input id="edit-birthDate" type="date" defaultValue={user.birthDate} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-tags" className="text-right">Tags</Label>
                        <Input id="edit-tags" defaultValue={user.tags.join(', ')} className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Salvar alterações</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.cpf}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.entryDate}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
