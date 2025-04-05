
import React from 'react';
import {
  Headphones,
  Lock,
  Mic,
  Search,
  Heart,
  Users,
  MessageCircle,
  Upload,
  BookOpen
} from 'lucide-react';

const features = [
  {
    title: "Secure Authentication",
    description: "Login securely with email or connect your crypto wallet for decentralized access.",
    icon: <Lock className="h-10 w-10 text-pod-purple p-2 bg-pod-purple/10 rounded-lg" />
  },
  {
    title: "Content Creation",
    description: "Upload MP3 audio or MP4 video with an easy, streamlined process.",
    icon: <Upload className="h-10 w-10 text-pod-purple p-2 bg-pod-purple/10 rounded-lg" />
  },
  {
    title: "Personal Library",
    description: "Build your custom library based on your listening history and preferences.",
    icon: <BookOpen className="h-10 w-10 text-pod-purple p-2 bg-pod-purple/10 rounded-lg" />
  },
  {
    title: "Discover Content",
    description: "Find podcasts by genre, topic, or creator with advanced search capabilities.",
    icon: <Search className="h-10 w-10 text-pod-purple p-2 bg-pod-purple/10 rounded-lg" />
  },
  {
    title: "Community Interaction",
    description: "Comment on episodes and join podcast rooms for live discussions.",
    icon: <MessageCircle className="h-10 w-10 text-pod-purple p-2 bg-pod-purple/10 rounded-lg" />
  },
  {
    title: "Live Podcasting",
    description: "Experience live shows with real-time comments, Q&A, and donation options.",
    icon: <Mic className="h-10 w-10 text-pod-purple p-2 bg-pod-purple/10 rounded-lg" />
  },
];

const PodFeatures = () => {
  return (
    <section className="py-16 bg-background">
      <div className="pod-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Power of PodVilla</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From secure authentication to vibrant community interactions, explore what makes PodVilla special.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="pod-card p-6 flex flex-col hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodFeatures;
