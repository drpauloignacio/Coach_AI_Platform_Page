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
  { id: "nutrition", label: "Nutrition Support", color: "bg-green-500", borderColor: "#10b981" },
  { id: "stress-relief", label: "Stress Relief", color: "bg-purple-500", borderColor: "#8b5cf6" },
  { id: "sleep", label: "Sleep Support", color: "bg-blue-500", borderColor: "#3b82f6" },
  { id: "household", label: "Household Help", color: "bg-indigo-500", borderColor: "#6366f1" },
  { id: "emotional", label: "Emotional Support", color: "bg-pink-500", borderColor: "#ec4899" },
  { id: "appreciation", label: "Appreciation", color: "bg-orange-500", borderColor: "#f97316" },
  { id: "practical", label: "Practical Help", color: "bg-teal-500", borderColor: "#14b8a6" }
];

const getCategoryBorderColor = (categoryColor: string): string => {
  const categoryMap: Record<string, string> = {
    "bg-gray-500": "#6b7280",
    "bg-green-500": "#10b981",
    "bg-purple-500": "#8b5cf6",
    "bg-blue-500": "#3b82f6",
    "bg-indigo-500": "#6366f1",
    "bg-pink-500": "#ec4899",
    "bg-orange-500": "#f97316",
    "bg-teal-500": "#14b8a6"
  };
  return categoryMap[categoryColor] || "#6b7280";
};

const mockTasks: Task[] = [
  {
    id: "1",
    icon: "🍲",
    taskTitle: "Prepare Her Favorite Meal",
    xpPoints: 150,
    avgCompletionMin: 45,
    categoryColor: "bg-green-500",
    category: "nutrition",
    whatsappMessage: "Hi there! 👋 It's time to show some love through food. Cook her favorite meal or order from that restaurant she mentioned. When she doesn't have to think about dinner, it's one less decision in her already full day. Food = love! 🍲💕",
    goal: "Reduce meal planning stress and provide nutritional support",
    whyItMatters: "Taking meal decisions off a mother's plate gives her mental space and ensures proper nutrition.",
    lifeYearsCredit: "+0.2 years from reduced decision fatigue and better nutrition"
  },
  {
    id: "2", 
    icon: "🛁",
    taskTitle: "Gift Her 1 Hour of Alone Time",
    xpPoints: 200,
    avgCompletionMin: 60,
    categoryColor: "bg-purple-500",
    category: "stress-relief",
    whatsappMessage: "Time for the ultimate gift: SPACE! 🌟 Take the kids for an hour. Tell her to take a bath, nap, read, or just stare at the wall. No agenda, no guilt. Just pure, uninterrupted time to breathe. She needs this more than she'll admit. 🛁✨",
    goal: "Provide mental restoration and stress relief",
    whyItMatters: "Alone time allows mothers to decompress and recharge, preventing burnout.",
    lifeYearsCredit: "+0.3 years from reduced chronic stress"
  },
  {
    id: "3",
    icon: "🧸",
    taskTitle: "Handle Bedtime Routine Tonight",
    xpPoints: 180,
    avgCompletionMin: 45,
    categoryColor: "bg-blue-500",
    category: "sleep",
    whatsappMessage: "Bedtime hero activated! 🦸‍♂️ Tonight, YOU'RE doing the bedtime routine. Baths, stories, teeth brushing, the works. Let her relax downstairs with tea or whatever makes her happy. Quality sleep for kids = peace of mind for mama! 🧸💤",
    goal: "Ensure children's sleep needs are met while giving mother a break",
    whyItMatters: "When kids sleep well consistently, it reduces maternal stress and improves family dynamics.",
    lifeYearsCredit: "+0.2 years from improved sleep quality for the whole family"
  },
  {
    id: "4",
    icon: "🧹",
    taskTitle: "Tackle One Cleaning Task",
    xpPoints: 120,
    avgCompletionMin: 30,
    categoryColor: "bg-indigo-500",
    category: "household",
    whatsappMessage: "Cleaning fairy duties! 🧚‍♀️ Pick ONE task she's been putting off - maybe it's the bathroom, kitchen deep clean, or laundry mountain. Don't announce it, just do it. She'll notice, and that mental load will lift a little. Small acts, big impact! 🧹✨",
    goal: "Reduce household management burden",
    whyItMatters: "Taking care of household tasks reduces the invisible mental load mothers carry.",
    lifeYearsCredit: "+0.1 years from reduced domestic stress"
  },
  {
    id: "5",
    icon: "👂",
    taskTitle: "Have a Real Listening Session",
    xpPoints: 100,
    avgCompletionMin: 20,
    categoryColor: "bg-pink-500",
    category: "emotional",
    whatsappMessage: "Time to be her emotional support human! 💕 Ask 'How are you REALLY doing?' and then just listen. No solutions, no advice unless asked. Sometimes she just needs someone to hear her thoughts without judgment. Your ears are the gift! 👂❤️",
    goal: "Provide emotional support and validation",
    whyItMatters: "Feeling heard and understood is crucial for mental health and relationship strength.",
    lifeYearsCredit: "+0.2 years from improved emotional well-being"
  },
  {
    id: "6",
    icon: "🎁",
    taskTitle: "Surprise Her with Small Gesture",
    xpPoints: 80,
    avgCompletionMin: 15,
    categoryColor: "bg-orange-500",
    category: "appreciation",
    whatsappMessage: "Surprise mission! 🕵️‍♂️ It doesn't have to be big - her favorite coffee, flowers from the grocery store, or even just a heartfelt note. The point is showing you see her and appreciate all she does. Small gestures, huge heart impact! 🎁💝",
    goal: "Show appreciation and recognition",
    whyItMatters: "Regular appreciation helps mothers feel valued and boosts their emotional well-being.",
    lifeYearsCredit: "+0.1 years from improved self-worth and relationship satisfaction"
  },
  {
    id: "7",
    icon: "🚗",
    taskTitle: "Handle the Errands Run",
    xpPoints: 140,
    avgCompletionMin: 60,
    categoryColor: "bg-blue-500",
    category: "practical",
    whatsappMessage: "Errand angel reporting for duty! 😇 Grocery shopping, pharmacy, dry cleaning, whatever's on her list. Take it ALL off her plate today. Bonus points if you remember the specific brand of everything! One less trip = more time for what matters. 🚗✅",
    goal: "Reduce logistical burden and save time",
    whyItMatters: "Managing errands takes significant time and mental energy away from family connection.",
    lifeYearsCredit: "+0.1 years from reduced daily stress"
  },
  {
    id: "8",
    icon: "📱",
    taskTitle: "Send an Encouraging Text",
    xpPoints: 40,
    avgCompletionMin: 2,
    categoryColor: "bg-green-500",
    category: "emotional",
    whatsappMessage: "Text magic time! ✨ Send her something uplifting right now. 'You're doing an amazing job' or 'The kids are lucky to have you' or 'I see how hard you're working.' Sometimes she needs to hear it from someone who sees her daily efforts. 📱💕",
    goal: "Provide daily affirmation and emotional boost",
    whyItMatters: "Regular positive reinforcement helps combat the isolation and self-doubt many mothers experience.",
    lifeYearsCredit: "+0.1 years from improved mental health support"
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
      icon: "☕",
      taskTitle: "Bring Her Morning Coffee in Bed",
      xpPoints: 60,
      avgCompletionMin: 10,
      categoryColor: "bg-orange-500",
      category: "appreciation",
      whatsappMessage: "Morning magic time! ☕ Surprise her with coffee in bed before she's even fully awake. No agenda, no requests - just 'I thought you might like this.' Sometimes the smallest gestures create the biggest smiles. Start her day feeling seen! ✨",
      goal: "Create a positive start to her day and show thoughtfulness",
      whyItMatters: "Small acts of service demonstrate care and help mothers feel valued from the moment they wake up.",
      lifeYearsCredit: "+0.1 years from improved relationship satisfaction and reduced morning stress"
    };
    
    setTasks(prev => [newTask, ...prev]);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy mb-2">Family & Friends Support Playbook</h2>
        <p className="text-gray-600">Guided tasks to help you support the mothers in your life</p>
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