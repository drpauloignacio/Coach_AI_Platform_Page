import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

interface TaskData {
  week: string;
  created: number;
  completed: number;
}

interface RewardData {
  name: string;
  effectiveness: number;
  thumbnail: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const taskData: TaskData[] = [
  { week: 'Week 1', created: 45, completed: 38 },
  { week: 'Week 2', created: 52, completed: 47 },
  { week: 'Week 3', created: 48, completed: 45 },
  { week: 'Week 4', created: 61, completed: 58 },
  { week: 'Week 5', created: 55, completed: 52 },
  { week: 'Week 6', created: 67, completed: 63 },
  { week: 'Week 7', created: 73, completed: 69 },
  { week: 'Week 8', created: 68, completed: 65 }
];

const rewardData: RewardData[] = [
  { name: 'Team Jersey', effectiveness: 92, thumbnail: '👕' },
  { name: 'Match Tickets', effectiveness: 88, thumbnail: '🎫' },
  { name: 'Player Meet & Greet', effectiveness: 95, thumbnail: '⭐' },
  { name: 'Stadium Tour', effectiveness: 79, thumbnail: '🏟️' },
  { name: 'Signed Soccer Ball', effectiveness: 84, thumbnail: '⚽' },
  { name: 'VIP Game Experience', effectiveness: 91, thumbnail: '👑' }
];

const testimonials: Testimonial[] = [
  {
    quote: "This platform helped my family rally around me during my toughest days. The coordinated support was incredible.",
    author: "Sarah M.",
    role: "Mother of 3"
  },
  {
    quote: "Finally, a way for all of us to actually help instead of just asking 'what can I do?' The tasks are so specific and helpful.",
    author: "David K.", 
    role: "Supportive Partner"
  },
  {
    quote: "The rewards system motivated our whole family. We earned 'life years' together while supporting mom - it felt meaningful.",
    author: "Jennifer L.",
    role: "Sister & Supporter"
  }
];

// Gauge component for Active Supporters
const GaugeMeter = ({ value, max, label }: { value: number; max: number; label: string }) => {
  const percentage = (value / max) * 100;
  // Calculate angle: -90 degrees is leftmost, +90 degrees is rightmost
  const angle = -90 + (percentage / 100) * 180;
  
  return (
    <div className="relative w-48 h-28 mx-auto">
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Background arc */}
        <path
          d="M 30 80 A 70 70 0 0 1 170 80"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <motion.path
          d="M 30 80 A 70 70 0 0 1 170 80"
          fill="none"
          stroke="#C9A34E"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="219.9"
          initial={{ strokeDashoffset: 219.9 }}
          animate={{ strokeDashoffset: 219.9 - (219.9 * percentage) / 100 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Needle */}
        <motion.line
          x1="100"
          y1="80"
          x2="100"
          y2="30"
          stroke="#0B0E2C"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transformOrigin: '100px 80px' }}
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Center dot */}
        <circle cx="100" cy="80" r="4" fill="#0B0E2C" />
      </svg>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-2xl font-bold text-navy">{value}</div>
        <div className="text-xs text-gray-600">{label}</div>
      </div>
    </div>
  );
};

// NPS Dial component
const NPSDial = ({ score }: { score: number }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 144 144">
        {/* Background circle */}
        <circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <motion.circle
          cx="72"
          cy="72"
          r={radius}
          fill="none"
          stroke="#C9A34E"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-navy">{score}</div>
          <div className="text-xs text-gray-600">NPS</div>
        </div>
      </div>
    </div>
  );
};

// Count-up animation component for percentages
const CountUpPercentage = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = 0;
    let animationFrame = 0;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <span>{count}%</span>;
};

// Testimonial Carousel
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-32 overflow-hidden">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
        >
          <blockquote className="text-sm text-gray-700 italic mb-3 leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
          <cite className="text-xs text-gray-500">
            — {testimonial.author}, {testimonial.role}
          </cite>
        </motion.div>
      ))}
    </div>
  );
};

export default function ImpactTab() {
  return (
    <div className="space-y-8">
      {/* Jumbo Stat */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <div className="text-6xl font-bold text-navy mb-2">
            <CountUpPercentage end={87} />
          </div>
          <div className="text-xl text-gray-600">Tasks Completed</div>
        </motion.div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Line Chart - Tasks Created vs Completed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-navy mb-4">Tasks Created vs Completed</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={taskData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="created" 
                    stroke="#0B0E2C" 
                    strokeWidth={3}
                    dot={{ fill: '#0B0E2C', strokeWidth: 2, r: 4 }}
                    name="Created"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#C9A34E" 
                    strokeWidth={3}
                    dot={{ fill: '#C9A34E', strokeWidth: 2, r: 4 }}
                    name="Completed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Gauge Meter - Active Supporters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-96 flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold text-navy mb-4 text-center">Active Supporters per Mother</h3>
            <GaugeMeter value={7.3} max={10} label="per mother" />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Horizontal Bar Chart - Rewards That Work */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-navy mb-4">Rewards That Work</h3>
            <div className="space-y-3">
              {rewardData.map((reward, index) => (
                <motion.div
                  key={reward.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    {reward.thumbnail}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{reward.name}</span>
                      <span className="text-sm text-gray-500">{reward.effectiveness}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gold rounded-full h-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${reward.effectiveness}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NPS Score with Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-96 flex flex-col"
          >
            <div className="flex items-start space-x-6 h-full">
              <div className="flex-shrink-0">
                <NPSDial score={92} />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-navy mb-2">User Satisfaction</h3>
                <div className="flex-1">
                  <TestimonialCarousel />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}