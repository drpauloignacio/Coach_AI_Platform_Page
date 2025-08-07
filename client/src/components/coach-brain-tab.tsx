import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Search, User, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import guardiola from "@assets/generated_images/Pep_Guardiola_coaching_portrait_fd0a5837.png";
import ancelotti from "@assets/generated_images/Carlo_Ancelotti_coaching_portrait_519941e0.png";
import mourinho from "@assets/generated_images/José_Mourinho_coaching_portrait_f1df2036.png";

interface BucketData {
  id: string;
  title: string;
  icon: string;
  recordCount: number;
  lastUpdated: string;
  description: string;
  trainingDescription: string;
}

const bucketData: BucketData[] = [
  {
    id: "practical",
    title: "Practical",
    icon: "🛠️",
    recordCount: 12847,
    lastUpdated: "2 hours ago",
    description: "Daily care routines, feeding schedules, sleep training",
    trainingDescription: "Trained on the knowledge of 25 subject matter experts including world-renowned midwives Dr. Heloisa Lessa and Jennie Joseph"
  },
  {
    id: "social",
    title: "Social",
    icon: "👥",
    recordCount: 8934,
    lastUpdated: "15 minutes ago",
    description: "Community support, peer connections, family dynamics",
    trainingDescription: "Trained on 267 mother stories and 4,600 message exchanges between mothers"
  },
  {
    id: "clinical",
    title: "Clinical",
    icon: "🏥",
    recordCount: 5623,
    lastUpdated: "1 hour ago",
    description: "Medical guidelines, health assessments, safety protocols",
    trainingDescription: "Trained on educational content from the world's number 1 hospital, Mayo Clinic"
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
      className="relative w-48 h-40 cursor-pointer"
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
          <CardContent className="flex flex-col justify-center h-full p-4">
            <div className="text-xs text-gray-300 text-center leading-relaxed">
              {bucket.trainingDescription}
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
  const [selectedCoach, setSelectedCoach] = useState("guardiola");

  const coachingStyles = {
    guardiola: {
      name: "Pep Guardiola Style",
      avatar: guardiola,
      description: "Tactical precision, positional play",
      tone: ["Methodical", "Detailed", "Patient"],
      approach: "Systematic guidance with step-by-step analysis"
    },
    ancelotti: {
      name: "Carlo Ancelotti Style", 
      avatar: ancelotti,
      description: "Calm leadership, adaptive strategy",
      tone: ["Calm", "Flexible", "Experienced"],
      approach: "Balanced support adapting to individual needs"
    },
    mourinho: {
      name: "José Mourinho Style",
      avatar: mourinho, 
      description: "Motivational intensity, results-focused",
      tone: ["Direct", "Motivating", "Confident"],
      approach: "High-energy motivation with clear objectives"
    }
  } as const;

  const currentCoach = coachingStyles[selectedCoach as keyof typeof coachingStyles];
  const languages = ["English", "Spanish", "Portuguese"];
  const safetyFilters = ["Age-appropriate", "Medically reviewed", "Cultural sensitivity"];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <h3 className="text-lg font-bold text-navy mb-4">Coaching Style</h3>
      
      {/* Coach Style Selector */}
      <div className="mb-4">
        <div className="flex flex-col gap-2">
          {Object.entries(coachingStyles).map(([key, coach]) => (
            <div
              key={key}
              onClick={() => setSelectedCoach(key)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedCoach === key 
                  ? 'border-gold bg-gold/10' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                    <img 
                      src={coach.avatar}
                      alt={coach.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-navy">{coach.name}</div>
                    <div className="text-xs text-gray-600">{coach.description}</div>
                  </div>
                </div>
                {selectedCoach === key && (
                  <Badge variant="outline" className="text-xs">Active</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Coaching Approach</h5>
          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{currentCoach.approach}</p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Communication Style</h5>
          <div className="flex flex-wrap gap-1">
            {currentCoach.tone.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Languages</h5>
          <div className="flex flex-wrap gap-1">
            {languages.map((lang, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Safety Filters</h5>
          <div className="space-y-1">
            {safetyFilters.map((filter, index) => (
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
                <h3 className="text-xl font-bold text-navy mb-2">Braintrust Knowledge</h3>
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