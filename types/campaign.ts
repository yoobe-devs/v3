export interface Product {
  id: string
  name: string
  inStock: number
  image: string
}

export interface Campaign {
  id: string
  name: string
  product: Product
  date: string
  recipients: Recipient[]
  status: "delivered" | "in_transit" | "processing"
}

export interface Recipient {
  id: string
  name: string
  trackingCode: string
  status: "delivered" | "in_transit" | "processing"
}
