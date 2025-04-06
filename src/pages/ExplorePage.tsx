
import React, { useState, useEffect } from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import PodcastCard, { PodcastCardProps } from '@/components/PodcastCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useLocation, Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';

// Sample data for explore page
const samplePodcasts: PodcastCardProps[] = [
  {
    id: "6",
    title: "Marketing Mastery",
    creator: "Jennifer Lee",
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
  },
  {
    id: "7",
    title: "Science Today",
    creator: "Dr. Michael Chen",
    coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Science",
    isNew: true,
  },
  {
    id: "8",
    title: "Daily Fitness",
    creator: "Samantha Wright",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Fitness",
  },
  {
    id: "9",
    title: "World Politics",
    creator: "Robert Evans",
    coverImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
  },
  {
    id: "10",
    title: "Art & Culture",
    creator: "Isabella Martinez",
    coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Art",
    isNew: true,
  },
  {
    id: "11",
    title: "Financial Freedom",
    creator: "Thomas Johnson",
    coverImage: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Finance",
  },
  {
    id: "12",
    title: "Travel Stories",
    creator: "Emma Rodriguez",
    coverImage: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Travel",
  },
  {
    id: "13",
    title: "Tech Innovations",
    creator: "Daniel Kim",
    coverImage: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
  }
];

// Local storage key for uploaded podcasts
const LOCAL_STORAGE_KEY = "podvilla_uploaded_podcasts";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [userPodcasts, setUserPodcasts] = useState<any[]>([]);
  const location = useLocation();
  
  // Parse the category from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [location.search]);
  
  // Load user-uploaded podcasts from localStorage and update URLs from Supabase
  useEffect(() => {
    const loadUserPodcasts = async () => {
      const storedPodcasts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPodcasts) {
        const parsedPodcasts = JSON.parse(storedPodcasts);
        
        // Update any URLs that need refreshing from Supabase
        const updatedPodcasts = await Promise.all(
          parsedPodcasts.map(async (podcast: any) => {
            // If the podcast has stored paths but URLs might be expired
            if (podcast.filePath) {
              try {
                // Get fresh URL for media file
                const { data: mediaData } = await supabase.storage
                  .from('podcasts')
                  .createSignedUrl(podcast.filePath, 3600);
                
                if (mediaData?.signedUrl) {
                  podcast.fileUrl = mediaData.signedUrl;
                }
              } catch (error) {
                console.error("Error refreshing media URL:", error);
              }
            }
            
            return podcast;
          })
        );
        
        setUserPodcasts(updatedPodcasts);
      }
    };
    
    loadUserPodcasts();
    
    // Listen for storage events to update when podcasts are added in other tabs
    window.addEventListener('storage', () => loadUserPodcasts());
    
    return () => {
      window.removeEventListener('storage', () => loadUserPodcasts());
    };
  }, []);
  
  // Enhanced PodcastCard with link to podcast page
  const EnhancedPodcastCard = (props: PodcastCardProps) => {
    return (
      <Link to={`/podcast/${props.id}`} className="block">
        <PodcastCard {...props} />
      </Link>
    );
  };
  
  // Combine sample podcasts with user-uploaded podcasts
  const allPodcasts = [...userPodcasts.map(podcast => ({
    id: podcast.id,
    title: podcast.title,
    creator: podcast.creator || "Anonymous",
    coverImage: podcast.coverImage || "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: podcast.category,
    isNew: true,
  })), ...samplePodcasts];
  
  // Filter podcasts based on search term and category
  const filteredPodcasts = allPodcasts.filter(podcast => {
    const matchesSearch = searchTerm === '' || 
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = !activeCategory || 
      podcast.category.toLowerCase() === activeCategory.toLowerCase();
      
    return matchesSearch && matchesCategory;
  });
  
  const getTabPodcasts = (tab: string) => {
    switch(tab) {
      case 'new':
        return filteredPodcasts.filter(p => p.isNew);
      case 'popular':
        return filteredPodcasts.slice(0, 4);
      case 'recommended':
        return filteredPodcasts.slice(2, 6);
      case 'trending':
      default:
        return filteredPodcasts;
    }
  };
  
  const clearCategory = () => {
    setActiveCategory(null);
    // Update URL to remove category parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container">
          <h1 className="text-3xl font-bold mb-8">Explore Podcasts</h1>
          
          <div className="relative mb-8 max-w-lg mx-auto">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search podcasts, creators, or topics..."
              className="pl-10 py-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {activeCategory && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Filtered by category:</span>
              <Badge className="capitalize bg-pod-purple">{activeCategory}</Badge>
              <Button variant="outline" size="sm" onClick={clearCategory}>
                Clear filter
              </Button>
            </div>
          )}

          {userPodcasts.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Your Uploads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userPodcasts.map((podcast) => (
                  <EnhancedPodcastCard 
                    key={podcast.id}
                    id={podcast.id}
                    title={podcast.title}
                    creator={podcast.creator || "Anonymous"}
                    coverImage={podcast.coverImage || "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                    category={podcast.category}
                    isNew={true}
                  />
                ))}
              </div>
            </div>
          )}
          
          <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recommended">For You</TabsTrigger>
            </TabsList>
            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {getTabPodcasts('trending').map((podcast) => (
                  <EnhancedPodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {getTabPodcasts('new').map((podcast) => (
                  <EnhancedPodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {getTabPodcasts('popular').map((podcast) => (
                  <EnhancedPodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recommended">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {getTabPodcasts('recommended').map((podcast) => (
                  <EnhancedPodcastCard key={podcast.id} {...podcast} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default ExplorePage;
