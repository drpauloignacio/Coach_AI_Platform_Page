import { useState } from "react";
import { Search, Bell, Settings, Play, Download, Cog, ExpandIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/sidebar";

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
                <div className="bg-white bg-opacity-10 rounded-lg px-4 py-2 border border-white border-opacity-20">
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Data Engine Card */}
                    <div className="lg:col-span-2">
                      <Card className="shadow-sm">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-navy flex items-center">
                              <span className="mr-3">🔍</span>
                              Data Engine
                            </CardTitle>
                            <Button variant="ghost" size="icon" className="text-gold hover:text-gold-light">
                              <ExpandIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Data Sources */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Data Sources</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {dataSources.map((source, index) => (
                                <div
                                  key={index}
                                  className={`bg-white rounded-lg p-3 text-center cursor-pointer transition-colors ${
                                    source.connected
                                      ? 'border-2 border-navy'
                                      : 'border border-gray-200 hover:border-navy'
                                  }`}
                                >
                                  <div className="text-2xl mb-2">{source.icon}</div>
                                  <div className="text-xs font-medium text-navy">{source.name}</div>
                                  <div className={`text-xs mt-1 ${
                                    source.connected ? 'text-green-600' : 'text-gray-500'
                                  }`}>
                                    • {source.status}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Processing Status */}
                          <div className="bg-gradient-to-r from-navy to-navy-light rounded-lg p-4 text-white">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold">Processing Status</h3>
                              <div className="flex items-center text-gold text-sm">
                                <div className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse"></div>
                                Live
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Data Ingestion</span>
                                <span className="text-sm font-medium text-gold">2.1k/min</span>
                              </div>
                              <Progress value={78} className="bg-navy-light" />
                              <div className="flex justify-between text-xs text-gray-300">
                                <span>Model Training: 78%</span>
                                <span>ETA: 4 min</span>
                              </div>
                            </div>
                          </div>

                          {/* Data Insights */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-blue-50 border-blue-200">
                              <CardContent className="p-4">
                                <div className="flex items-center mb-2">
                                  <span className="text-blue-600 mr-2">📈</span>
                                  <h4 className="font-semibold text-blue-900">Pattern Recognition</h4>
                                </div>
                                <p className="text-sm text-blue-700">
                                  Identified 23 behavioral patterns across family interactions
                                </p>
                                <div className="mt-2 text-xs text-blue-600">+15% accuracy improvement</div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-green-50 border-green-200">
                              <CardContent className="p-4">
                                <div className="flex items-center mb-2">
                                  <span className="text-green-600 mr-2">🎯</span>
                                  <h4 className="font-semibold text-green-900">Recommendations</h4>
                                </div>
                                <p className="text-sm text-green-700">
                                  Generated 47 personalized coaching suggestions
                                </p>
                                <div className="mt-2 text-xs text-green-600">92% success rate</div>
                              </CardContent>
                            </Card>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-6">
                      {/* Quick Actions */}
                      <Card className="shadow-sm">
                        <CardHeader>
                          <CardTitle className="font-bold text-navy">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full bg-navy hover:bg-navy-light text-white">
                            <Play className="w-4 h-4 mr-2" />
                            Start Analysis
                          </Button>
                          <Button className="w-full bg-gold hover:bg-gold-light text-navy">
                            <Download className="w-4 h-4 mr-2" />
                            Export Data
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Cog className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Recent Activity */}
                      <Card className="shadow-sm">
                        <CardHeader>
                          <CardTitle className="font-bold text-navy">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                activity.type === 'success' ? 'bg-green-100' :
                                activity.type === 'info' ? 'bg-blue-100' : 'bg-gold bg-opacity-20'
                              }`}>
                                <span className={`text-xs ${
                                  activity.type === 'success' ? 'text-green-600' :
                                  activity.type === 'info' ? 'text-blue-600' : 'text-gold'
                                }`}>
                                  {activity.type === 'success' ? '✓' : activity.type === 'info' ? '📊' : '🔍'}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                                <p className="text-xs text-gray-500">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Performance Metrics */}
                      <Card className="shadow-sm">
                        <CardHeader>
                          <CardTitle className="font-bold text-navy">Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {performanceMetrics.map((metric, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">{metric.label}</span>
                              <span className={`text-sm font-semibold ${metric.color}`}>{metric.value}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
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
