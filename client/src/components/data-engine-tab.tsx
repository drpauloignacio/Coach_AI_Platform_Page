import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, TrendingUp, TrendingDown } from "lucide-react";

interface WishData {
  id: string;
  label: string;
  count: number;
  sampleSentence: string;
  stories: string[];
  momChange: number; // percentage change month over month
}

const mockWishData: WishData[] = [
  {
    id: "1",
    label: "Better Sleep",
    count: 156,
    sampleSentence: "I wish I could sleep through the night without interruptions.",
    stories: [
      "I wake up 3-4 times every night and feel exhausted during the day. It's affecting my mood and energy levels.",
      "My baby's sleep schedule is unpredictable, and I find myself lying awake even when she's sleeping peacefully.",
      "I used to be a great sleeper, but since becoming a mother, I feel like I've forgotten how to rest properly."
    ],
    momChange: 12.5
  },
  {
    id: "2",
    label: "More Energy",
    count: 134,
    sampleSentence: "I wish I had more energy to play with my children.",
    stories: [
      "By 3 PM, I'm completely drained and still have hours of parenting ahead of me.",
      "I feel guilty that I'm too tired to engage fully with my kids when they want to play.",
      "Coffee used to help, but now I need something more sustainable to keep up with my family's needs."
    ],
    momChange: 8.3
  },
  {
    id: "3",
    label: "Self-Care Time",
    count: 123,
    sampleSentence: "I wish I could take 30 minutes for myself without feeling guilty.",
    stories: [
      "I haven't had a proper bath or skincare routine in months. Everything feels rushed.",
      "Even going to the bathroom alone feels like a luxury I can't afford.",
      "I know self-care is important, but finding the time feels impossible with everything else on my plate."
    ],
    momChange: 15.7
  },
  {
    id: "4",
    label: "Patience",
    count: 89,
    sampleSentence: "I wish I had more patience during difficult moments.",
    stories: [
      "I lose my temper too quickly when my toddler has meltdowns, and then I feel terrible about it.",
      "Some days I feel like I'm constantly counting to ten and taking deep breaths.",
      "I want to be the calm, understanding mother I envisioned, but reality is so much harder."
    ],
    momChange: -3.2
  },
  {
    id: "5",
    label: "Support Network",
    count: 78,
    sampleSentence: "I wish I had more people who understood what I'm going through.",
    stories: [
      "My friends without kids don't really get why I can't just 'leave the baby with someone' for a night out.",
      "I feel isolated and like I'm the only one struggling with these challenges.",
      "Having other moms to talk to who really understand would make such a difference."
    ],
    momChange: 22.1
  },
  // Additional wishes for a fuller bubble chart
  {
    id: "6",
    label: "Healthy Meals",
    count: 67,
    sampleSentence: "I wish I could prepare nutritious meals without the stress.",
    stories: ["", "", ""],
    momChange: 5.4
  },
  {
    id: "7",
    label: "Financial Security",
    count: 56,
    sampleSentence: "I wish I didn't worry about money so much.",
    stories: ["", "", ""],
    momChange: -1.8
  },
  {
    id: "8",
    label: "Quality Time",
    count: 45,
    sampleSentence: "I wish for more meaningful moments with my family.",
    stories: ["", "", ""],
    momChange: 9.2
  },
  {
    id: "9",
    label: "Exercise Routine",
    count: 43,
    sampleSentence: "I wish I could maintain a regular workout schedule.",
    stories: ["", "", ""],
    momChange: 18.3
  },
  {
    id: "10",
    label: "Work Balance",
    count: 39,
    sampleSentence: "I wish I could balance work and family better.",
    stories: ["", "", ""],
    momChange: -7.5
  },
  {
    id: "11",
    label: "Mental Clarity",
    count: 34,
    sampleSentence: "I wish my brain fog would clear up.",
    stories: ["", "", ""],
    momChange: 11.2
  },
  {
    id: "12",
    label: "Date Nights",
    count: 32,
    sampleSentence: "I wish my partner and I could reconnect regularly.",
    stories: ["", "", ""],
    momChange: -12.4
  },
  {
    id: "13",
    label: "Confidence",
    count: 29,
    sampleSentence: "I wish I felt more confident in my parenting decisions.",
    stories: ["", "", ""],
    momChange: 6.8
  },
  {
    id: "14",
    label: "Organization",
    count: 27,
    sampleSentence: "I wish our home was more organized and peaceful.",
    stories: ["", "", ""],
    momChange: 14.6
  },
  {
    id: "15",
    label: "Hobbies",
    count: 24,
    sampleSentence: "I wish I could pursue my interests again.",
    stories: ["", "", ""],
    momChange: -4.1
  },
  {
    id: "16",
    label: "Body Image",
    count: 22,
    sampleSentence: "I wish I felt comfortable in my own skin.",
    stories: ["", "", ""],
    momChange: 8.9
  },
  {
    id: "17",
    label: "Childcare Help",
    count: 19,
    sampleSentence: "I wish I had reliable help with the kids.",
    stories: ["", "", ""],
    momChange: 25.3
  },
  {
    id: "18",
    label: "Stress Relief",
    count: 17,
    sampleSentence: "I wish I had better ways to manage stress.",
    stories: ["", "", ""],
    momChange: 3.7
  },
  {
    id: "19",
    label: "Learning Time",
    count: 15,
    sampleSentence: "I wish I could learn new things and grow personally.",
    stories: ["", "", ""],
    momChange: -8.9
  },
  {
    id: "20",
    label: "Health Check-ups",
    count: 13,
    sampleSentence: "I wish I could prioritize my own health appointments.",
    stories: ["", "", ""],
    momChange: 16.2
  },
  {
    id: "21",
    label: "Creativity",
    count: 12,
    sampleSentence: "I wish I had outlets for creative expression.",
    stories: ["", "", ""],
    momChange: -2.3
  },
  {
    id: "22",
    label: "Travel",
    count: 10,
    sampleSentence: "I wish we could take family trips without stress.",
    stories: ["", "", ""],
    momChange: -15.6
  },
  {
    id: "23",
    label: "Mindfulness",
    count: 8,
    sampleSentence: "I wish I could be more present in each moment.",
    stories: ["", "", ""],
    momChange: 21.4
  },
  {
    id: "24",
    label: "Future Planning",
    count: 7,
    sampleSentence: "I wish I felt more prepared for what's ahead.",
    stories: ["", "", ""],
    momChange: 4.5
  },
  {
    id: "25",
    label: "Peace",
    count: 5,
    sampleSentence: "I wish for moments of true inner peace.",
    stories: ["", "", ""],
    momChange: 33.3
  }
];

interface CountUpCardProps {
  title: string;
  value: number;
  suffix?: string;
  delay?: number;
}

function CountUpCard({ title, value, suffix = "", delay = 0 }: CountUpCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay / 1000, duration: 0.5 }}
            className="text-3xl font-bold text-navy mb-2"
          >
            {count.toLocaleString()}{suffix}
          </motion.div>
          <div className="text-sm text-gray-600 font-medium">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface WishCloudProps {
  data: WishData[];
  onBubbleClick: (wish: WishData) => void;
}

function WishCloud({ data, onBubbleClick }: WishCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 500;
    const margin = 20;

    svg.attr("width", width).attr("height", height);

    // Create color scale
    const colorScale = d3.scaleSequential(d3.interpolateRgb("#D1F7C4", "#1E9E63"))
      .domain(d3.extent(data, d => d.count) as [number, number]);

    // Create pack layout
    const pack = d3.pack<WishData>()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

    const root = d3.hierarchy<WishData>({ children: data } as any)
      .sum(d => d.count);

    const nodes = pack(root).leaves();

    const container = svg.append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    // Create bubbles
    const bubbles = container.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 0)
      .attr("fill", d => colorScale(d.data.count))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("opacity", 0.8);

    // Animate bubbles in
    bubbles.transition()
      .duration(1000)
      .delay((d, i) => i * 50)
      .attr("r", d => d.r);

    // Add labels
    const labels = container.selectAll("text")
      .data(nodes.filter(d => d.r > 15)) // Only show labels for larger bubbles
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("fill", "#fff")
      .style("font-size", d => Math.min(d.r / 3, 12) + "px")
      .style("font-weight", "600")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Simple single-line text labels for now
    labels.text(d => {
      const words = d.data.label.split(" ");
      return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : d.data.label;
    });

    labels.transition()
      .duration(500)
      .delay(1000)
      .style("opacity", 1);

    // Add hover effects
    bubbles
      .on("mouseenter", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr("stroke-width", 3);

        if (tooltipRef.current) {
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style("opacity", 1)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px")
            .html(`
              <div class="font-semibold text-navy">${d.data.label}</div>
              <div class="text-sm text-gray-600 mt-1">Count: ${d.data.count}</div>
              <div class="text-sm text-gray-700 mt-2 italic">"${d.data.sampleSentence}"</div>
            `);
        }
      })
      .on("mouseleave", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 0.8)
          .attr("stroke-width", 2);

        if (tooltipRef.current) {
          d3.select(tooltipRef.current).style("opacity", 0);
        }
      })
      .on("click", (event, d) => {
        onBubbleClick(d.data);
      });

  }, [data, onBubbleClick]);

  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full h-auto max-w-full"></svg>
      <div
        ref={tooltipRef}
        className="absolute bg-white p-3 rounded-lg shadow-lg border border-gray-200 pointer-events-none opacity-0 transition-opacity z-10 max-w-xs"
        style={{ position: "absolute" }}
      />
    </div>
  );
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wish: WishData | null;
}

function Drawer({ isOpen, onClose, wish }: DrawerProps) {
  if (!wish) return null;

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-navy">{wish.label}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-navy">{wish.count}</div>
              <Badge 
                variant={wish.momChange >= 0 ? "default" : "destructive"}
                className={`${wish.momChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              >
                {wish.momChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {Math.abs(wish.momChange)}% MoM
              </Badge>
            </div>
            <div className="text-sm text-gray-600 mt-2">stories collected</div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Recent Stories</h4>
            {wish.stories.filter(story => story.trim() !== "").map((story, index) => (
              <blockquote key={index} className="border-l-4 border-gold pl-4 py-2 bg-gray-50 rounded-r">
                <p className="text-sm text-gray-700 italic">"{story}"</p>
                <footer className="text-xs text-gray-500 mt-2">— Anonymous Mother</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DataEngineTab() {
  const [selectedWish, setSelectedWish] = useState<WishData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBubbleClick = (wish: WishData) => {
    setSelectedWish(wish);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedWish(null);
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CountUpCard 
          title="Stories Collected" 
          value={267} 
          delay={0}
        />
        <CountUpCard 
          title="Chat Messages (90 days)" 
          value={4600} 
          delay={500}
        />
        <CountUpCard 
          title="Active Mothers" 
          value={79} 
          delay={1000}
        />
      </div>

      {/* Wish Cloud */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-navy mb-2">Wish Cloud</h3>
            <p className="text-gray-600 text-sm">
              Interactive visualization of mothers' wishes and hopes. Click on any bubble to explore detailed stories.
            </p>
          </div>
          <div className="flex justify-center">
            <WishCloud data={mockWishData} onBubbleClick={handleBubbleClick} />
          </div>
        </CardContent>
      </Card>

      {/* Drawer */}
      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={handleDrawerClose} 
        wish={selectedWish} 
      />
    </div>
  );
}