"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateCampaign } from "./create-campaign"
import { CampaignDashboard } from "./campaign-dashboard"

export default function CampanhasPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Enhanced Swag Gifting Campaigns</h1>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <CreateCampaign />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <CampaignDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
