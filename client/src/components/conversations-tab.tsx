import { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  type: 'ai' | 'admin' | 'user';
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  badge: 'AI' | 'Admin';
  lastMessage: string;
  timestamp: string;
  unread: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  messages: Message[];
}



const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah M.',
    avatar: '👩‍💼',
    badge: 'AI',
    lastMessage: 'That bedtime routine tip was a game changer!',
    timestamp: '2 min ago',
    unread: 3,
    sentiment: 'positive',
    messages: [
      {
        id: '1',
        text: 'Hi Sarah! I noticed your family has been crushing the bedtime support tasks. How are things going with the new routine?',
        timestamp: '10:30 AM',
        type: 'ai',
        sentiment: 'positive'
      },
      {
        id: '2',
        text: 'Oh my gosh, it\'s been amazing! My husband took over story time and I actually got to have a cup of tea in peace.',
        timestamp: '10:32 AM',
        type: 'user',
        sentiment: 'positive'
      },
      {
        id: '3',
        text: 'That\'s fantastic! 🎉 Your stress levels must be through the roof... in a good way! Want to try the "Mom\'s Hour Off" challenge next?',
        timestamp: '10:33 AM',
        type: 'ai',
        sentiment: 'positive'
      },
      {
        id: '4',
        text: 'Yes! What does that involve?',
        timestamp: '10:35 AM',
        type: 'user',
        sentiment: 'positive'
      },
      {
        id: '5',
        text: 'Simple! Your support team (aka family) gives you one uninterrupted hour daily. No questions, no "where\'s the..." - just pure mom time. Think of it as your personal timeout from being everyone\'s GPS! 😄',
        timestamp: '10:36 AM',
        type: 'ai',
        sentiment: 'positive'
      }
    ]
  },
  {
    id: '2',
    name: 'Mike K.',
    avatar: '👨‍💻',
    badge: 'AI',
    lastMessage: 'Not sure if this meal prep thing is working...',
    timestamp: '15 min ago',
    unread: 1,
    sentiment: 'neutral',
    messages: [
      {
        id: '1',
        text: 'Hey Mike! I see you\'ve been working on the meal prep tasks. How\'s it going?',
        timestamp: '9:45 AM',
        type: 'ai'
      },
      {
        id: '2',
        text: 'Honestly? I burned the chicken twice and my wife just laughed at my "gourmet" mac and cheese.',
        timestamp: '9:47 AM',
        type: 'user',
        sentiment: 'neutral'
      },
      {
        id: '3',
        text: 'Haha! Welcome to the "Cooking Adventures of Well-Meaning Partners" club! 😂 Here\'s a secret: she\'s not laughing AT you, she\'s laughing because someone else is finally dealing with the "what\'s for dinner" panic!',
        timestamp: '9:48 AM',
        type: 'ai',
        sentiment: 'positive'
      },
      {
        id: '4',
        text: 'That... actually makes me feel better!',
        timestamp: '9:50 AM',
        type: 'user',
        sentiment: 'positive'
      },
      {
        id: '5',
        text: 'Want me to send you my "Husband-Proof Recipes" collection? Step 1: Order pizza. Step 2: Put it on a nice plate. Step 3: Take all the credit! 🍕',
        timestamp: '9:51 AM',
        type: 'ai',
        sentiment: 'positive'
      }
    ]
  },
  {
    id: '3',
    name: 'Admin',
    avatar: '⚡',
    badge: 'Admin',
    lastMessage: 'New reward system update deployed',
    timestamp: '1 hr ago',
    unread: 0,
    sentiment: 'positive',
    messages: [
      {
        id: '1',
        text: 'Hey team! Just pushed the new soccer-themed rewards. Users are going crazy for the signed ball rewards!',
        timestamp: '8:30 AM',
        type: 'admin',
        sentiment: 'positive'
      },
      {
        id: '2',
        text: 'That\'s awesome! What\'s the most popular reward so far?',
        timestamp: '8:32 AM',
        type: 'ai'
      },
      {
        id: '3',
        text: 'Player meet & greet is at 95% effectiveness. Turns out promising dad a selfie with Messi is pretty motivating! 😄',
        timestamp: '8:33 AM',
        type: 'admin',
        sentiment: 'positive'
      }
    ]
  },
  {
    id: '4',
    name: 'Jennifer L.',
    avatar: '👩‍🎓',
    badge: 'AI',
    lastMessage: 'This is harder than I thought...',
    timestamp: '2 hrs ago',
    unread: 0,
    sentiment: 'negative',
    messages: [
      {
        id: '1',
        text: 'Hi Jennifer! I noticed you\'ve been struggling with some of the household tasks. Want to talk about it?',
        timestamp: '7:15 AM',
        type: 'ai'
      },
      {
        id: '2',
        text: 'I feel like I\'m failing at this whole "supporting my sister" thing. I can barely manage my own life.',
        timestamp: '7:18 AM',
        type: 'user',
        sentiment: 'negative'
      },
      {
        id: '3',
        text: 'Oh honey, let me stop you right there! You know what failing looks like? It\'s NOT asking for help and NOT trying to support someone you love. You\'re literally here, trying to help. That\'s already winning! 🏆',
        timestamp: '7:19 AM',
        type: 'ai',
        sentiment: 'positive'
      },
      {
        id: '4',
        text: 'But I messed up the laundry and bought the wrong groceries...',
        timestamp: '7:21 AM',
        type: 'user',
        sentiment: 'negative'
      },
      {
        id: '5',
        text: 'Plot twist: even messing up helps! Your sister now knows she\'s not the only one who shrinks sweaters. Welcome to the "Domestic Disasters" support group! 😂',
        timestamp: '7:22 AM',
        type: 'ai',
        sentiment: 'positive'
      }
    ]
  }
];

// Message Volume Stats Component
const MessageVolumeStats = () => {
  const totalMessages = 12847;
  const todayMessages = 342;
  const averageDaily = 156;
  
  return (
    <div className="mb-4 bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Message Volume</h4>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Total Messages</span>
          <span className="font-semibold text-navy">{totalMessages.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Today</span>
          <span className="font-semibold text-green-600">{todayMessages}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Daily Average</span>
          <span className="font-semibold text-gold">{averageDaily}</span>
        </div>
      </div>
    </div>
  );
};

export default function ConversationsTab() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => {
    const matchesFilter = filter === 'all' || conv.sentiment === filter;
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getMessageBubbleStyle = (type: Message['type']) => {
    switch (type) {
      case 'ai':
        return 'bg-green-500 text-white ml-0 mr-auto';
      case 'admin':
        return 'bg-gold text-white ml-0 mr-auto';
      case 'user':
        return 'bg-gray-200 text-gray-800 ml-auto mr-0';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="h-[800px] bg-white rounded-xl shadow-sm border border-gray-200 flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Message Volume Stats */}
        <div className="p-4 border-b border-gray-200">
          <MessageVolumeStats />
        </div>
        
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            {['all', 'positive', 'neutral', 'negative'].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(filterType as any)}
                className={`text-xs ${filter === filterType ? 'bg-navy text-white' : ''}`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 cursor-pointer border-b border-gray-100 ${
                selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{conversation.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900 truncate">{conversation.name}</span>
                    <Badge 
                      variant={conversation.badge === 'AI' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {conversation.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                    <div className="flex items-center space-x-2">
                      {conversation.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                      <div className={`w-2 h-2 rounded-full ${
                        conversation.sentiment === 'positive' ? 'bg-green-400' :
                        conversation.sentiment === 'negative' ? 'bg-red-400' : 'bg-gray-400'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{selectedConversation.avatar}</div>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant={selectedConversation.badge === 'AI' ? 'default' : 'secondary'}>
                  {selectedConversation.badge}
                </Badge>
                <span className={`text-sm ${getSentimentColor(selectedConversation.sentiment)}`}>
                  {selectedConversation.sentiment.charAt(0).toUpperCase() + selectedConversation.sentiment.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation.messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${getMessageBubbleStyle(message.type)}`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-gray-500' : 'text-white opacity-75'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              className="flex-1"
              disabled
            />
            <Button disabled className="bg-navy">
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This is a demo view for investors. Real conversations are happening in the live system.
          </p>
        </div>
      </div>
    </div>
  );
}