"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/campaign"

const products: Product[] = [
  { id: "1", name: "Company Mug", inStock: 100, image: "/placeholder.svg?height=200&width=200" },
  { id: "2", name: "Custom T-Shirt", inStock: 50, image: "/placeholder.svg?height=200&width=200" },
  { id: "3", name: "Branded Notebook", inStock: 75, image: "/placeholder.svg?height=200&width=200" },
  { id: "4", name: "Wireless Earbuds", inStock: 25, image: "/placeholder.svg?height=200&width=200" },
  { id: "5", name: "Water Bottle", inStock: 60, image: "/placeholder.svg?height=200&width=200" },
]

export function CreateCampaign() {
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [campaignName, setCampaignName] = useState("")
  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle campaign creation
    console.log({ campaignName, selectedProduct, date })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
        <CardDescription>Set up a new gifting campaign for your employees</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              placeholder="Enter campaign name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Select Product</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={cn(
                    "border rounded-lg p-4 cursor-pointer transition-colors",
                    selectedProduct === product.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
                  )}
                  onClick={() => setSelectedProduct(product.id)}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">In stock: {product.inStock}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Campaign Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Select Recipients</Label>
            <Button variant="outline" className="w-full justify-start">
              Select Employees (0)
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Create Campaign
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
