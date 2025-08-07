import { useState } from "react";
import { Search, Bell, Settings, Play, Download, Cog, ExpandIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/sidebar";
import DataEngineTab from "@/components/data-engine-tab";

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-navy">Coach AI</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-navy transition-colors">WC OF HEALING</a>
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-navy transition-colors">PRODUCT</a>
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-navy transition-colors">SCRIPTS</a>
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-navy transition-colors">LEARNING</a>
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-navy transition-colors">RESEARCH</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-sm font-medium">
                W
              </div>
            </div>
          </div>
        </header>

        {/* Sticky Ribbon */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-navy to-navy-light border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="rounded-lg px-4 py-2 border border-opacity-20 bg-[#00000061]">
                  <div className="flex items-center space-x-2">
                    <span className="text-gold text-sm">📊</span>
                    <span className="text-white text-sm font-medium">142 Sessions</span>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-lg px-4 py-2 border border-white border-opacity-20">
                  <div className="flex items-center space-x-2">
                    <span className="text-gold text-sm">🎯</span>
                    <span className="text-white text-sm font-medium">94% Accuracy</span>
                  </div>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg px-4 py-2 border border-white border-opacity-20">
                  <div className="flex items-center space-x-2">
                    <span className="text-gold text-sm">⚡</span>
                    <span className="text-white text-sm font-medium">1.2s Avg Response</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button className="bg-gold hover:bg-gold-light text-navy">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

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
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all data-[state=active]:bg-navy data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
                    >
                      <span>{tab.icon}</span>
                      <span className="text-sm">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="data-engine" className="mt-6">
                  <DataEngineTab />
                </TabsContent>

                {/* Other tab contents */}
                {tabItems.slice(1).map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-6">
                    <Card className="p-8 text-center">
                      <div className="text-6xl mb-4">{tab.icon}</div>
                      <h2 className="text-2xl font-bold text-navy mb-2">{tab.label}</h2>
                      <p className="text-gray-600">This tab content will be implemented in future updates.</p>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
