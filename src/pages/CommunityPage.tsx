
import React from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Heart } from 'lucide-react';

// Sample data for community discussions
const discussions = [
  {
    id: 1,
    title: "What's your favorite tech podcast?",
    author: "Sarah Miller",
    avatar: "SM",
    content: "Looking for recommendations on tech podcasts that discuss emerging technologies and startups. Any suggestions?",
    comments: 24,
    likes: 18,
    time: "2 hours ago",
    category: "Technology"
  },
  {
    id: 2,
    title: "Best podcasts for morning commutes",
    author: "James Wilson",
    avatar: "JW",
    content: "I have a 30-minute commute each morning and would love to find engaging podcasts that are perfect for that timeframe. What do you listen to on your way to work?",
    comments: 36,
    likes: 42,
    time: "5 hours ago",
    category: "Recommendations"
  },
  {
    id: 3,
    title: "Podcast creators - what equipment do you use?",
    author: "Alex Johnson",
    avatar: "AJ",
    content: "I'm thinking of starting my own podcast and would love to hear what equipment other creators are using. Microphones, software, etc.",
    comments: 19,
    likes: 15,
    time: "1 day ago",
    category: "Creation"
  },
  {
    id: 4,
    title: "Looking for history podcast recommendations",
    author: "Emma Thompson",
    avatar: "ET",
    content: "I'm a big history buff and looking for podcasts that cover ancient civilizations in detail. Any recommendations?",
    comments: 12,
    likes: 9,
    time: "2 days ago",
    category: "History"
  }
];

// Sample data for podcast rooms
const podcastRooms = [
  {
    id: 1,
    title: "Tech Today: AI Revolution Discussion",
    host: "Sarah Miller",
    participants: 48,
    status: "Live",
    category: "Technology"
  },
  {
    id: 2,
    title: "Creative Minds: Weekly Inspiration Session",
    host: "Alex Johnson",
    participants: 23,
    status: "Scheduled",
    time: "Tomorrow at 7 PM",
    category: "Creativity"
  },
  {
    id: 3,
    title: "Business Insights: Startup Funding Q&A",
    host: "James Wilson",
    participants: 12,
    status: "Scheduled",
    time: "Today at 8 PM",
    category: "Business"
  }
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container">
          <h1 className="text-3xl font-bold mb-8">Community</h1>
          
          <Tabs defaultValue="discussions" className="mb-8">
            <TabsList>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="rooms">Podcast Rooms</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${discussion.avatar}`} />
                            <AvatarFallback>{discussion.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{discussion.title}</CardTitle>
                            <CardDescription>
                              Posted by {discussion.author} • {discussion.time}
                            </CardDescription>
                          </div>
                        </div>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {discussion.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{discussion.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {discussion.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Heart className="h-4 w-4 mr-1" />
                          {discussion.likes}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-pod-purple">
                        View Discussion
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rooms">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {podcastRooms.map((room) => (
                  <Card key={room.id} className="overflow-hidden">
                    <div className={`px-4 py-2 text-white ${room.status === 'Live' ? 'bg-red-500' : 'bg-pod-purple'}`}>
                      {room.status === 'Live' ? (
                        <div className="flex items-center">
                          <span className="relative flex h-3 w-3 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                          </span>
                          Live Now
                        </div>
                      ) : (
                        room.time
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{room.title}</CardTitle>
                      <CardDescription>Hosted by {room.host}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {room.participants} participants
                      </div>
                      <Button size="sm" className={room.status === 'Live' ? 'bg-red-500 hover:bg-red-600' : 'bg-pod-purple hover:bg-pod-purple-dark'}>
                        {room.status === 'Live' ? 'Join Room' : 'Set Reminder'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="mt-6 flex flex-col items-center justify-center p-12">
                <p className="text-xl text-muted-foreground mb-4">Coming soon!</p>
                <p className="text-center max-w-md">
                  We're working on a calendar of virtual events, meetups, and podcast listening parties. 
                  Stay tuned for updates!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default CommunityPage;
