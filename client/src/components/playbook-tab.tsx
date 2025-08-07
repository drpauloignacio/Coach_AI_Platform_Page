import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ChevronDown, ChevronRight, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Task {
  id: string;
  icon: string;
  taskTitle: string;
  xpPoints: number;
  avgCompletionMin: number;
  categoryColor: string;
  category: string;
  whatsappMessage: string;
  goal: string;
  whyItMatters: string;
  lifeYearsCredit: string;
}

const categories = [
  { id: "all", label: "All Tasks", color: "bg-gray-500", borderColor: "#6b7280" },
  { id: "nutrition", label: "Nutrition", color: "bg-green-500", borderColor: "#10b981" },
  { id: "stress-relief", label: "Stress Relief", color: "bg-purple-500", borderColor: "#8b5cf6" },
  { id: "movement", label: "Movement", color: "bg-blue-500", borderColor: "#3b82f6" },
  { id: "sleep", label: "Sleep", color: "bg-indigo-500", borderColor: "#6366f1" },
  { id: "mindfulness", label: "Mindfulness", color: "bg-pink-500", borderColor: "#ec4899" },
  { id: "social", label: "Social", color: "bg-orange-500", borderColor: "#f97316" }
];

const getCategoryBorderColor = (categoryColor: string): string => {
  const categoryMap: Record<string, string> = {
    "bg-gray-500": "#6b7280",
    "bg-green-500": "#10b981",
    "bg-purple-500": "#8b5cf6",
    "bg-blue-500": "#3b82f6",
    "bg-indigo-500": "#6366f1",
    "bg-pink-500": "#ec4899",
    "bg-orange-500": "#f97316"
  };
  return categoryMap[categoryColor] || "#6b7280";
};

const mockTasks: Task[] = [
  {
    id: "1",
    icon: "🥗",
    taskTitle: "Prepare a Rainbow Salad",
    xpPoints: 150,
    avgCompletionMin: 15,
    categoryColor: "bg-green-500",
    category: "nutrition",
    whatsappMessage: "Hi mama! 🌈 Time for some colorful nutrition! Try making a rainbow salad with at least 5 different colored vegetables. Red tomatoes, orange carrots, yellow bell peppers, green lettuce, and purple cabbage. Your body (and taste buds) will thank you! 💪✨",
    goal: "Increase daily vegetable intake with diverse nutrients",
    whyItMatters: "Different colored vegetables provide unique vitamins and antioxidants that support immune function and energy levels.",
    lifeYearsCredit: "+0.2 years from improved cardiovascular health"
  },
  {
    id: "2", 
    icon: "🧘‍♀️",
    taskTitle: "5-Minute Morning Meditation",
    xpPoints: 100,
    avgCompletionMin: 5,
    categoryColor: "bg-purple-500",
    category: "stress-relief",
    whatsappMessage: "Good morning, beautiful! 🌅 Start your day with intention. Find a quiet spot, close your eyes, and focus on your breath for 5 minutes. Let thoughts come and go like clouds. You deserve this peaceful moment before the day begins. 🧘‍♀️💜",
    goal: "Reduce morning stress and improve mental clarity",
    whyItMatters: "Morning meditation sets a calm tone for the day and helps regulate cortisol levels.",
    lifeYearsCredit: "+0.1 years from reduced stress-related health impacts"
  },
  {
    id: "3",
    icon: "🚶‍♀️",
    taskTitle: "15-Minute Nature Walk",
    xpPoints: 120,
    avgCompletionMin: 15,
    categoryColor: "bg-blue-500",
    category: "movement",
    whatsappMessage: "Time to step outside! 🌳 Take a 15-minute walk in nature - whether it's a park, your neighborhood, or even just around the block while noticing trees and sky. Fresh air + movement = instant mood boost! 🚶‍♀️✨",
    goal: "Incorporate gentle cardio and vitamin D exposure",
    whyItMatters: "Regular walking improves cardiovascular health, mood, and helps regulate circadian rhythms.",
    lifeYearsCredit: "+0.3 years from cardiovascular and mental health benefits"
  },
  {
    id: "4",
    icon: "💤",
    taskTitle: "Create a Bedtime Ritual",
    xpPoints: 200,
    avgCompletionMin: 30,
    categoryColor: "bg-indigo-500",
    category: "sleep",
    whatsappMessage: "Sweet dreams start with good habits! 🌙 Create a 30-minute wind-down routine: dim lights, put away devices, maybe some gentle stretching or reading. Your future rested self will thank you! 💤✨",
    goal: "Improve sleep quality through consistent routines",
    whyItMatters: "Quality sleep is essential for physical recovery, mental health, and immune function.",
    lifeYearsCredit: "+0.5 years from improved sleep quality and recovery"
  },
  {
    id: "5",
    icon: "🎯",
    taskTitle: "Practice Gratitude Journaling",
    xpPoints: 80,
    avgCompletionMin: 10,
    categoryColor: "bg-pink-500",
    category: "mindfulness",
    whatsappMessage: "Let's shift to gratitude! 📝 Write down 3 things you're grateful for today - they can be big or small. Maybe it's your morning coffee, a text from a friend, or simply having a moment to breathe. 🙏💕",
    goal: "Cultivate positive mindset and emotional resilience",
    whyItMatters: "Gratitude practice has been shown to improve mental health and life satisfaction.",
    lifeYearsCredit: "+0.1 years from improved mental well-being"
  },
  {
    id: "6",
    icon: "☎️",
    taskTitle: "Call a Friend or Family Member",
    xpPoints: 100,
    avgCompletionMin: 20,
    categoryColor: "bg-orange-500",
    category: "social",
    whatsappMessage: "Connection time! 📞 Reach out to someone you care about - call a friend, family member, or loved one. A 10-15 minute chat can brighten both your days and strengthen your support network! 💛",
    goal: "Strengthen social connections and support network",
    whyItMatters: "Strong social connections are linked to better mental health and increased longevity.",
    lifeYearsCredit: "+0.2 years from improved social support and reduced isolation"
  },
  {
    id: "7",
    icon: "💧",
    taskTitle: "Hydration Check-In",
    xpPoints: 60,
    avgCompletionMin: 2,
    categoryColor: "bg-blue-500",
    category: "nutrition",
    whatsappMessage: "Hydration station! 💧 Check in with your water intake today. Aim for 8 glasses or carry a water bottle as your sidekick. Your skin, energy, and brain will all thank you! Stay glowing, mama! ✨",
    goal: "Maintain proper hydration throughout the day",
    whyItMatters: "Adequate hydration supports energy levels, skin health, and cognitive function.",
    lifeYearsCredit: "+0.1 years from improved cellular function"
  },
  {
    id: "8",
    icon: "🎵",
    taskTitle: "Dance to 3 Favorite Songs",
    xpPoints: 140,
    avgCompletionMin: 12,
    categoryColor: "bg-purple-500",
    category: "movement",
    whatsappMessage: "Dance party time! 🎵 Put on 3 of your favorite songs and just move! Dance like nobody's watching - in your kitchen, living room, wherever! Let the music lift your spirits and get your heart pumping! 💃✨",
    goal: "Combine cardio exercise with mood enhancement",
    whyItMatters: "Dancing combines physical activity with emotional expression and stress relief.",
    lifeYearsCredit: "+0.2 years from cardiovascular health and stress reduction"
  }
];

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4" 
        style={{ borderLeftColor: getCategoryBorderColor(task.categoryColor) }}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <span className="text-2xl">{task.icon}</span>
            <Badge className={`${task.categoryColor} text-white text-xs`}>
              +{task.xpPoints} XP
            </Badge>
          </div>
          
          <h3 className="font-semibold text-navy mb-3 line-clamp-2">
            {task.taskTitle}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {task.avgCompletionMin} min
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              {task.xpPoints} XP
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function WhatsAppMockup({ message }: { message: string }) {
  return (
    <div className="bg-green-500 rounded-lg p-4 max-w-sm mx-auto">
      {/* WhatsApp Header */}
      <div className="bg-green-600 rounded-t-lg px-4 py-2 flex items-center">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
          <span className="text-sm">⚽</span>
        </div>
        <div>
          <div className="text-white font-semibold text-sm">Coach AI</div>
          <div className="text-green-100 text-xs">online</div>
        </div>
      </div>
      
      {/* Message Bubble */}
      <div className="bg-white rounded-lg p-3 mt-2 relative">
        <div className="absolute -top-1 left-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white"></div>
        <p className="text-sm text-gray-800 leading-relaxed">{message}</p>
        <div className="text-xs text-gray-500 mt-2 text-right">12:34 PM ✓✓</div>
      </div>
    </div>
  );
}

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const [openSections, setOpenSections] = useState<string[]>(["goal"]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy">{task.taskTitle}</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* WhatsApp Preview */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-navy mb-4">Coach AI Message</h3>
                <WhatsAppMockup message={task.whatsappMessage} />
              </div>

              {/* Task Details Accordion */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-navy">Task Details</h3>
                
                <Collapsible open={openSections.includes("goal")}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => toggleSection("goal")}
                  >
                    <span className="font-medium text-navy">Goal</span>
                    {openSections.includes("goal") ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 text-sm text-gray-700">
                    {task.goal}
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={openSections.includes("why")}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => toggleSection("why")}
                  >
                    <span className="font-medium text-navy">Why It Matters</span>
                    {openSections.includes("why") ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 text-sm text-gray-700">
                    {task.whyItMatters}
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={openSections.includes("credit")}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => toggleSection("credit")}
                  >
                    <span className="font-medium text-navy">Life Years Credit</span>
                    {openSections.includes("credit") ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-3 text-sm text-gray-700">
                    {task.lifeYearsCredit}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function PlaybookTab() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTasks = selectedCategory === "all" 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const generateNewTask = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with typing indicator
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTask: Task = {
      id: Date.now().toString(),
      icon: "🌟",
      taskTitle: "Practice Deep Breathing Exercise",
      xpPoints: 90,
      avgCompletionMin: 8,
      categoryColor: "bg-purple-500",
      category: "stress-relief",
      whatsappMessage: "Take a moment to breathe deeply! 🌟 Find a comfortable position and take 10 slow, deep breaths. Inhale for 4 counts, hold for 4, exhale for 6. Feel your nervous system calm and reset. You've got this, mama! 💜",
      goal: "Activate the parasympathetic nervous system for immediate stress relief",
      whyItMatters: "Deep breathing exercises quickly reduce cortisol levels and promote relaxation.",
      lifeYearsCredit: "+0.1 years from stress reduction and improved autonomic function"
    };
    
    setTasks(prev => [newTask, ...prev]);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Daily Wellness Playbook</h2>
        <p className="text-gray-600">Personalized tasks to boost your health and happiness</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`${selectedCategory === category.id ? 'bg-navy text-white' : ''}`}
          >
            <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Generate Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={generateNewTask}
          disabled={isGenerating}
          className="bg-gold hover:bg-gold-light text-navy shadow-lg rounded-full p-4"
          size="lg"
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy mr-2"></div>
              Generating...
            </div>
          ) : (
            <div className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Generate New Task
            </div>
          )}
        </Button>
      </div>

      {/* Task Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}