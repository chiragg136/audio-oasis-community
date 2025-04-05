
import React, { useState } from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Mic, MicOff, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data for active rooms
const activeRooms = [
  {
    id: 1,
    title: "Tech Today Discussion",
    host: "Sarah Miller",
    avatar: "SM",
    participants: 24,
    description: "Join us to discuss the latest tech trends and podcast episode!",
    category: "Technology",
    isLive: true
  },
  {
    id: 2,
    title: "Creative Minds Meetup",
    host: "Alex Johnson",
    avatar: "AJ",
    participants: 18,
    description: "A space for creative podcast enthusiasts to share ideas and inspiration.",
    category: "Creativity",
    isLive: true
  },
  {
    id: 3,
    title: "History Buffs Corner",
    host: "Emma Thompson",
    avatar: "ET",
    participants: 12,
    description: "Let's talk about historical podcasts and share our favorites!",
    category: "History",
    isLive: false
  }
];

// Sample data for upcoming rooms
const upcomingRooms = [
  {
    id: 4,
    title: "Business Insights Roundtable",
    host: "James Wilson",
    avatar: "JW",
    scheduledTime: "Tomorrow at 7 PM",
    description: "Weekly discussion about business podcasts and entrepreneurship.",
    category: "Business"
  },
  {
    id: 5,
    title: "True Crime Podcast Discussion",
    host: "Olivia Parker",
    avatar: "OP",
    scheduledTime: "Friday at 8 PM",
    description: "Let's analyze this week's most intriguing true crime podcasts.",
    category: "True Crime"
  }
];

// Room voice chat component
const RoomVoiceChat = ({ room }: { room: typeof activeRooms[0] }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: room.host, avatar: room.avatar, isSpeaking: true, isHost: true },
    { id: 2, name: "John Doe", avatar: "JD", isSpeaking: false, isHost: false },
    { id: 3, name: "Lisa Smith", avatar: "LS", isSpeaking: false, isHost: false },
  ]);
  const { toast } = useToast();

  const handleJoinRoom = () => {
    setIsJoined(true);
    toast({
      title: "Room Joined",
      description: `You've joined ${room.title}`,
    });
  };

  const handleLeaveRoom = () => {
    setIsJoined(false);
    setIsMuted(false);
    toast({
      title: "Room Left",
      description: `You've left ${room.title}`,
      variant: "destructive",
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone Unmuted" : "Microphone Muted",
      description: isMuted ? "Others can hear you now" : "Others can't hear you now",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-pod-purple text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle>{room.title}</CardTitle>
          <span className="text-xs bg-white text-pod-purple px-2 py-1 rounded-full">
            {room.category}
          </span>
        </div>
        <CardDescription className="text-white/90">
          Hosted by {room.host} • {room.participants} participants
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <p className="mb-6">{room.description}</p>
        
        {isJoined ? (
          <div className="space-y-6">
            <div className="flex gap-2 mb-4">
              <Button 
                onClick={toggleMute} 
                variant="outline" 
                className="flex-1"
              >
                {isMuted ? <Mic className="mr-2" /> : <MicOff className="mr-2" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="mr-2" />
                Chat
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLeaveRoom}
                className="flex-1"
              >
                Leave Room
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Participants</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {participants.map((participant) => (
                  <div 
                    key={participant.id} 
                    className="flex items-center p-3 border rounded-lg"
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${participant.avatar}`} />
                        <AvatarFallback>{participant.avatar}</AvatarFallback>
                      </Avatar>
                      {participant.isSpeaking && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{participant.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {participant.isHost && <span className="text-pod-purple">Host</span>}
                        {participant.isSpeaking && !participant.isHost && <span className="text-green-500">Speaking</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Users className="h-16 w-16 text-pod-purple mb-4" />
            <h3 className="text-xl font-medium mb-2">Ready to join the conversation?</h3>
            <p className="text-center text-muted-foreground mb-6">
              Join this room to participate in the voice chat and discussion.
            </p>
            <Button onClick={handleJoinRoom} className="bg-pod-purple hover:bg-pod-purple-dark">
              Join Room
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const RoomCard = ({ room, upcoming = false }: { room: any, upcoming?: boolean }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <Card key={room.id} className="overflow-hidden">
      <div className={`px-4 py-2 text-white ${upcoming ? 'bg-pod-purple' : 'bg-red-500'}`}>
        {upcoming ? (
          room.scheduledTime
        ) : (
          <div className="flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            Live Now
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{room.title}</CardTitle>
        <CardDescription>
          {upcoming ? `Hosted by ${room.host}` : `Hosted by ${room.host} • ${room.participants} participants`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{room.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          {upcoming ? "Join event" : `${room.participants} participants`}
        </div>
        <Button 
          size="sm" 
          className={upcoming ? 'bg-pod-purple hover:bg-pod-purple-dark' : 'bg-red-500 hover:bg-red-600'}
          onClick={() => setShowDetails(!showDetails)}
        >
          {upcoming ? 'Set Reminder' : 'View Room'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const RoomsPage = () => {
  const [activeRoom, setActiveRoom] = useState<typeof activeRooms[0] | null>(null);
  const { toast } = useToast();
  
  const handleCreateRoom = () => {
    toast({
      title: "Create Room Feature",
      description: "Room creation will be available soon!",
    });
  };
  
  const handleJoinRoom = (room: typeof activeRooms[0]) => {
    setActiveRoom(room);
    // Scroll to the room voice chat component
    setTimeout(() => {
      document.getElementById('voice-chat-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container">
          <h1 className="text-3xl font-bold mb-8">Podcast Rooms</h1>

          {activeRoom && (
            <section id="voice-chat-section" className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Currently Joined</h2>
              <RoomVoiceChat room={activeRoom} />
            </section>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Join a Room</h2>
            <Button onClick={handleCreateRoom} className="bg-pod-purple hover:bg-pod-purple-dark">
              Create Room
            </Button>
          </div>
          
          <div className="mb-6">
            <Input
              placeholder="Search for rooms..."
              className="max-w-md"
            />
          </div>
          
          <Tabs defaultValue="live" className="mb-12">
            <TabsList>
              <TabsTrigger value="live">Live Rooms</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="my-rooms">My Rooms</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {activeRooms.map((room) => (
                  <div key={room.id} onClick={() => handleJoinRoom(room)}>
                    <RoomCard room={room} />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {upcomingRooms.map((room) => (
                  <RoomCard key={room.id} room={room} upcoming={true} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="my-rooms">
              <div className="mt-6 flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg">
                <p className="text-xl text-muted-foreground mb-4">You haven't created or joined any rooms yet</p>
                <Button onClick={handleCreateRoom} className="bg-pod-purple hover:bg-pod-purple-dark">
                  Create Your First Room
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default RoomsPage;
