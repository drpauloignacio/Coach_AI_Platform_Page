import { useState, useEffect } from 'react';
import { Star, Trophy, Award, ChevronRight, Play, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';



interface Reward {
  id: string;
  title: string;
  image: string;
  pointsNeeded: number;
  claimedPercentage: number;
  category: string;
}

interface VideoTestimonial {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}



const rewards: Reward[] = [
  {
    id: '1',
    title: 'Brazil Home Jersey #10',
    image: '🇧🇷',
    pointsNeeded: 250,
    claimedPercentage: 89,
    category: 'Apparel'
  },
  {
    id: '2',
    title: 'Maracanã Stadium VIP Tickets',
    image: '🎫',
    pointsNeeded: 800,
    claimedPercentage: 67,
    category: 'Experience'
  },
  {
    id: '3',
    title: 'Pelé Signed Soccer Ball',
    image: '⚽',
    pointsNeeded: 1200,
    claimedPercentage: 45,
    category: 'Collectible'
  },
  {
    id: '4',
    title: 'Canarinho Training Camp Access',
    image: '🏟️',
    pointsNeeded: 600,
    claimedPercentage: 73,
    category: 'Experience'
  },
  {
    id: '5',
    title: 'Meet Ronaldinho & Kaká',
    image: '⭐',
    pointsNeeded: 1500,
    claimedPercentage: 34,
    category: 'Exclusive'
  },
  {
    id: '6',
    title: 'World Cup Trophy Replica',
    image: '🏆',
    pointsNeeded: 900,
    claimedPercentage: 52,
    category: 'Collectible'
  },
  {
    id: '7',
    title: 'Brazil Away Jersey - Vintage',
    image: '💙',
    pointsNeeded: 350,
    claimedPercentage: 78,
    category: 'Apparel'
  },
  {
    id: '8',
    title: 'Rio Beach Football Experience',
    image: '🏖️',
    pointsNeeded: 450,
    claimedPercentage: 61,
    category: 'Experience'
  }
];

const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    title: 'Sarah\'s Journey',
    thumbnail: '👩‍💼',
    duration: '2:30',
    author: 'Sarah M.'
  },
  {
    id: '2',
    title: 'Family Support Story',
    thumbnail: '👨‍👩‍👧‍👦',
    duration: '1:45',
    author: 'The Johnson Family'
  },
  {
    id: '3',
    title: 'Rewards Motivation',
    thumbnail: '🏆',
    duration: '2:15',
    author: 'Mike K.'
  },
  {
    id: '4',
    title: 'Community Impact',
    thumbnail: '🤝',
    duration: '3:00',
    author: 'Jennifer L.'
  }
];



// Reward Carousel Component
const RewardCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % rewards.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);
  
  const visibleRewards = [
    rewards[currentIndex],
    rewards[(currentIndex + 1) % rewards.length],
    rewards[(currentIndex + 2) % rewards.length]
  ];
  
  return (
    <div 
      className="mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h3 className="text-xl font-bold text-navy mb-4">Available Rewards</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleRewards.map((reward, index) => (
          <motion.div
            key={`${reward.id}-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full"
          >
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {/* Claimed Percentage Ribbon */}
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-gold text-navy">
                  {reward.claimedPercentage}% claimed
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">{reward.image}</div>
                  <h4 className="font-semibold text-lg mb-2">{reward.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{reward.category}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="font-bold text-navy">{reward.pointsNeeded} pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Carousel Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {rewards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-navy' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// How to Earn Points Panel
const EarnPointsPanel = ({ onFindTasks }: { onFindTasks: () => void }) => {
  const pointsGuide = [
    { action: 'Complete a support task', points: 50 },
    { action: 'Help with meal preparation', points: 75 },
    { action: 'Take over bedtime routine', points: 60 },
    { action: 'Give mom an hour of free time', points: 100 },
    { action: 'Handle household chores', points: 40 },
    { action: 'Provide emotional support', points: 80 }
  ];
  
  return (
    <Card className="h-fit">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-navy mb-4">How to Earn Points</h3>
        
        <div className="space-y-3 mb-6">
          {pointsGuide.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">{item.action}</span>
              <Badge variant="outline" className="text-gold border-gold">
                +{item.points}
              </Badge>
            </motion.div>
          ))}
        </div>
        
        <Button 
          onClick={onFindTasks}
          className="w-full bg-navy hover:bg-navy-light text-white"
        >
          <Users className="w-4 h-4 mr-2" />
          Find Tasks
        </Button>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Start earning points by supporting the mothers in your life
        </p>
      </CardContent>
    </Card>
  );
};

// Video Testimonials Grid
const VideoTestimonialsGrid = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  useEffect(() => {
    // Auto-cycle through video previews
    const interval = setInterval(() => {
      const randomVideo = videoTestimonials[Math.floor(Math.random() * videoTestimonials.length)];
      setPlayingVideo(randomVideo.id);
      
      setTimeout(() => {
        setPlayingVideo(null);
      }, 3000);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <h3 className="text-xl font-bold text-navy mb-4">Success Stories</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {videoTestimonials.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Card className="overflow-hidden cursor-pointer group">
              <div className="relative aspect-video bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                <div className="text-6xl">{video.thumbnail}</div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-8 h-8 text-white" />
                </div>
                
                {/* Duration Badge */}
                <Badge className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white">
                  {video.duration}
                </Badge>
                
                {/* Playing Indicator */}
                {playingVideo === video.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 border-4 border-gold rounded-lg"
                  />
                )}
              </div>
              
              <CardContent className="p-3">
                <h4 className="font-medium text-sm mb-1">{video.title}</h4>
                <p className="text-xs text-gray-600">{video.author}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function RewardsTab() {
  const handleFindTasks = () => {
    // This would navigate to the Playbook tab with pre-filtered tasks
    // For now, we'll just show an alert
    alert('Redirecting to Playbook with filtered support tasks...');
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Brazil National Team Rewards</h1>
        <p className="text-lg text-gray-600">Earn points by supporting mothers and unlock exclusive Brazil-themed rewards</p>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reward Carousel */}
        <div className="lg:col-span-2">
          <RewardCarousel />
        </div>
        
        {/* Earn Points Panel */}
        <div>
          <EarnPointsPanel onFindTasks={handleFindTasks} />
        </div>
      </div>
      
      {/* Video Testimonials */}
      <VideoTestimonialsGrid />
    </div>
  );
}