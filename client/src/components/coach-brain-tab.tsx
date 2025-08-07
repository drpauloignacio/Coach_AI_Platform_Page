import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Search, User, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BucketData {
  id: string;
  title: string;
  icon: string;
  recordCount: number;
  lastUpdated: string;
  logos: string[];
  description: string;
}

const bucketData: BucketData[] = [
  {
    id: "practical",
    title: "Practical",
    icon: "🛠️",
    recordCount: 12847,
    lastUpdated: "2 hours ago",
    logos: ["👩‍⚕️", "⚽", "🏥"],
    description: "Daily care routines, feeding schedules, sleep training"
  },
  {
    id: "social",
    title: "Social",
    icon: "👥",
    recordCount: 8934,
    lastUpdated: "15 minutes ago",
    logos: ["👩‍⚕️", "⚽", "🏥"],
    description: "Community support, peer connections, family dynamics"
  },
  {
    id: "clinical",
    title: "Clinical",
    icon: "🏥",
    recordCount: 5623,
    lastUpdated: "1 hour ago",
    logos: ["👩‍⚕️", "⚽", "🏥"],
    description: "Medical guidelines, health assessments, safety protocols"
  }
];

interface FlipCardProps {
  bucket: BucketData;
  delay: number;
}

function FlipCard({ bucket, delay }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative w-48 h-32 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="relative w-full h-full preserve-3d duration-500 transform-style-preserve-3d">
        {/* Front Card */}
        <Card className={`absolute inset-0 backface-hidden shadow-md transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
          <CardContent className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-3xl mb-2">{bucket.icon}</div>
            <h3 className="text-lg font-bold text-navy text-center">{bucket.title}</h3>
            <p className="text-xs text-gray-600 text-center mt-1">{bucket.description}</p>
          </CardContent>
        </Card>

        {/* Back Card */}
        <Card className={`absolute inset-0 backface-hidden bg-navy text-white shadow-md transition-transform duration-500 ${isFlipped ? '' : 'rotate-y-180'}`}>
          <CardContent className="flex flex-col justify-between h-full p-4">
            <div>
              <div className="text-2xl font-bold text-gold mb-1">
                {bucket.recordCount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-300 mb-3">records</div>
              
              <div className="text-xs text-gray-400 mb-2">
                Updated {bucket.lastUpdated}
              </div>
            </div>
            
            <div className="flex justify-center space-x-2">
              {bucket.logos.map((logo, index) => (
                <div key={index} className="text-lg">{logo}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

function PipelineStep({ title, icon, delay }: { title: string; icon: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="bg-slate-100 rounded-lg p-4 mb-2 border border-gray-200 min-w-[120px] text-center">
        <div className="text-navy mb-2">{icon}</div>
        <div className="text-sm font-medium text-navy">{title}</div>
      </div>
    </motion.div>
  );
}

function PersonaSection() {
  const persona = {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Coach AI",
    tone: ["Supportive", "Empathetic", "Evidence-based"],
    languages: ["English", "Spanish", "Portuguese"],
    safetyFilters: ["Age-appropriate", "Medically reviewed", "Cultural sensitivity"]
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-bold text-navy mb-4">Active Persona</h3>
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gold mb-3">
          <img 
            src={persona.avatar}
            alt="Coach Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-semibold text-navy">{persona.name}</h4>
        <Badge variant="outline" className="text-xs mt-1">Active</Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Tone</h5>
          <div className="flex flex-wrap gap-1">
            {persona.tone.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Languages</h5>
          <div className="flex flex-wrap gap-1">
            {persona.languages.map((lang, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Safety Filters</h5>
          <div className="space-y-1">
            {persona.safetyFilters.map((filter, index) => (
              <div key={index} className="flex items-center text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {filter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoachBrainTab() {
  const pipelineSteps = [
    { title: "Source Buckets", icon: <Database className="w-6 h-6" /> },
    { title: "Embedding + Retrieval", icon: <Search className="w-6 h-6" /> },
    { title: "Persona Forge", icon: <User className="w-6 h-6" /> },
    { title: "Output Renderer", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="space-y-8">
      {/* Pipeline Section */}
      <Card className="shadow-sm">
        <CardContent className="p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-navy mb-2">AI Processing Pipeline</h3>
            <p className="text-gray-600 text-sm">
              How Coach AI transforms raw data into personalized guidance for mothers
            </p>
          </div>

          {/* Animated Pipeline */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {pipelineSteps.map((step, index) => (
              <div key={step.title} className="flex items-center">
                <PipelineStep 
                  title={step.title} 
                  icon={step.icon} 
                  delay={index * 0.2} 
                />
                {index < pipelineSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.2, duration: 0.3 }}
                  >
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Source Buckets Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-navy mb-2">Knowledge Source Buckets</h3>
                <p className="text-gray-600 text-sm">
                  Hover over each bucket to see detailed statistics and data sources
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-8">
                {bucketData.map((bucket, index) => (
                  <FlipCard 
                    key={bucket.id} 
                    bucket={bucket} 
                    delay={0.5 + index * 0.2} 
                  />
                ))}
              </div>

              {/* Pipeline Stats */}

            </CardContent>
          </Card>
        </div>

        {/* Persona Section */}
        <div className="lg:col-span-1">
          <PersonaSection />
        </div>
      </div>
    </div>
  );
}