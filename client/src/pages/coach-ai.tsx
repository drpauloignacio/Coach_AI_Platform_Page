import { useState } from "react";
import { Search, Bell, Settings, Play, Download, Cog, ExpandIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/sidebar";
import DataEngineTab from "@/components/data-engine-tab";
import CoachBrainTab from "@/components/coach-brain-tab";
import PlaybookTab from "@/components/playbook-tab";
import ImpactTab from "@/components/impact-tab";
import ConversationsTab from "@/components/conversations-tab";
import RewardsTab from "@/components/rewards-tab";

const tabItems = [
  { id: "data-engine", label: "Data Engine", icon: "🔍" },
  { id: "coach-brain", label: "Coach Brain", icon: "🧠" },
  { id: "playbook", label: "Playbook", icon: "🗒️" },
  { id: "impact", label: "Impact", icon: "📊" },
  { id: "conversations", label: "Conversations", icon: "💬" },
  { id: "rewards", label: "Rewards", icon: "🏆" },
];

const dataSources = [
  { name: "Mobile App", icon: "📱", status: "Connected", connected: true },
  { name: "Wearables", icon: "⌚", status: "Available", connected: false },
  { name: "Health Records", icon: "🏥", status: "Available", connected: false },
  { name: "Analytics", icon: "📊", status: "Available", connected: false },
];

const recentActivities = [
  { title: "Model training completed", time: "2 minutes ago", type: "success" },
  { title: "New insights generated", time: "5 minutes ago", type: "info" },
  { title: "Data scan initiated", time: "12 minutes ago", type: "processing" },
];

const performanceMetrics = [
  { label: "Processing Speed", value: "2.1k/min", color: "text-navy" },
  { label: "Accuracy Rate", value: "94.2%", color: "text-green-600" },
  { label: "Uptime", value: "99.8%", color: "text-blue-600" },
  { label: "Data Quality", value: "Excellent", color: "text-gold" },
];

export default function CoachAIPage() {
  const [activeTab, setActiveTab] = useState("data-engine");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-navy">Coach AI</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {/* Tabs Component */}
            <div className="mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200 h-auto">
                  {tabItems.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all data-[state=active]:bg-navy data-[state=active]:!text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
                    >
                      <span>{tab.icon}</span>
                      <span className="text-sm text-[#000000]">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="data-engine" className="mt-6">
                  <DataEngineTab />
                </TabsContent>

                <TabsContent value="coach-brain" className="mt-6">
                  <CoachBrainTab />
                </TabsContent>

                <TabsContent value="playbook" className="mt-6">
                  <PlaybookTab />
                </TabsContent>

                <TabsContent value="impact" className="mt-6">
                  <ImpactTab />
                </TabsContent>

                <TabsContent value="conversations" className="mt-6">
                  <ConversationsTab />
                </TabsContent>

                <TabsContent value="rewards" className="mt-6">
                  <RewardsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
