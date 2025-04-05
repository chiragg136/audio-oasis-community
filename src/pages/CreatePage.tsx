
import React from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Mic, Video, FileAudio, PlusCircle, MessageSquare, HeartHandshake, Users } from "lucide-react";

const CreatePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Creator Studio</h1>
            <p className="text-muted-foreground mb-8">Create, manage, and grow your podcast with PodVilla</p>
            
            {/* Upload Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Upload Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileAudio className="mr-2 h-5 w-5 text-pod-purple" />
                      Upload Audio Podcast
                    </CardTitle>
                    <CardDescription>
                      Upload MP3 files with your podcast episodes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        Drag and drop your audio files here, or click to browse
                      </p>
                      <Button className="bg-pod-purple hover:bg-pod-purple-dark">
                        Choose Audio File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Video className="mr-2 h-5 w-5 text-pod-purple" />
                      Upload Video Podcast
                    </CardTitle>
                    <CardDescription>
                      Upload MP4 files with your video episodes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        Drag and drop your video files here, or click to browse
                      </p>
                      <Button className="bg-pod-purple hover:bg-pod-purple-dark">
                        Choose Video File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            
            {/* Record Live Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Go Live</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mic className="mr-2 h-5 w-5 text-pod-purple" />
                    Start Live Podcast Session
                  </CardTitle>
                  <CardDescription>
                    Broadcast live to your audience and interact in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-red-500 hover:bg-red-600 flex-1">
                      Start Audio Live Stream
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 flex-1">
                      Start Video Live Stream
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            {/* Community Features */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">Engage with Your Community</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      <MessageSquare className="mr-2 h-5 w-5 text-pod-purple" />
                      Comments & Discussions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Respond to listener comments and host discussions
                    </p>
                    <Button variant="outline" className="w-full">
                      View Comments
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      <HeartHandshake className="mr-2 h-5 w-5 text-pod-purple" />
                      Creator Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Track earnings and manage token rewards
                    </p>
                    <Button variant="outline" className="w-full">
                      View Rewards
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-base">
                      <Users className="mr-2 h-5 w-5 text-pod-purple" />
                      Host a Podcast Room
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create rooms for listeners to join and discuss
                    </p>
                    <Button variant="outline" className="w-full">
                      Create Room
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default CreatePage;
