"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Campaign } from "@/types/campaign"

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Holiday Cheer",
    product: { id: "1", name: "Company Mug", inStock: 100, image: "" },
    date: "2023-12-15",
    recipients: [
      { id: "1", name: "John Doe", trackingCode: "ABC123", status: "delivered" },
      { id: "2", name: "Jane Smith", trackingCode: "DEF456", status: "in_transit" },
    ],
    status: "delivered",
  },
  {
    id: "2",
    name: "Work Anniversary",
    product: { id: "2", name: "Custom T-Shirt", inStock: 50, image: "" },
    date: "2023-11-01",
    recipients: [{ id: "3", name: "Bob Johnson", trackingCode: "GHI789", status: "processing" }],
    status: "in_transit",
  },
]

export function CampaignDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Dashboard</CardTitle>
          <CardDescription>Track the status of your gifting campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Campaign Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <CardTitle>{campaign.name}</CardTitle>
                    <CardDescription>Product: {campaign.product.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {campaign.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        {campaign.recipients.length} recipient(s)
                      </div>
                      <Badge
                        variant={
                          campaign.status === "delivered"
                            ? "default"
                            : campaign.status === "in_transit"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {campaign.status === "delivered"
                          ? "Delivered"
                          : campaign.status === "in_transit"
                            ? "In Transit"
                            : "Processing"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Gift Tracking</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Tracking Code</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.flatMap((campaign) =>
                  campaign.recipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{recipient.name}</TableCell>
                      <TableCell>{campaign.product.name}</TableCell>
                      <TableCell>{recipient.trackingCode}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            recipient.status === "delivered"
                              ? "default"
                              : recipient.status === "in_transit"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {recipient.status === "delivered"
                            ? "Delivered"
                            : recipient.status === "in_transit"
                              ? "In Transit"
                              : "Processing"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )),
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
