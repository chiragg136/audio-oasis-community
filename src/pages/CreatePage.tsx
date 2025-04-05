
import React, { useState } from 'react';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Mic, Video, FileAudio, PlusCircle, MessageSquare, HeartHandshake, Users, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreatePage = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'audio' | 'video' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      toast({
        title: "File selected",
        description: `${event.target.files[0].name} is ready to upload`,
      });
    }
  };
  
  const handleUploadClick = (type: 'audio' | 'video') => {
    setUploadType(type);
    // Create a file input and trigger it
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = type === 'audio' ? 'audio/*' : 'video/*';
    fileInput.onchange = handleFileChange as any;
    fileInput.click();
  };
  
  const handleSubmit = (values: { title: string; description: string; category: string }) => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio or video file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload Successful!",
        description: `Your podcast "${values.title}" has been uploaded.`,
      });
      
      // Reset form
      form.reset();
      setSelectedFile(null);
      setUploadType(null);
    }, 2000);
  };
  
  const handleLiveStream = (type: 'audio' | 'video') => {
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Live Stream`,
      description: "Your live stream will begin shortly. Preparing broadcast...",
    });
    
    // Simulate starting a live stream
    setTimeout(() => {
      toast({
        title: "You're Live!",
        description: "Your audience can now join your broadcast.",
      });
    }, 1500);
  };
  
  const handleCreateRoom = () => {
    toast({
      title: "Creating New Room",
      description: "Setting up your podcast room...",
    });
    
    setTimeout(() => {
      toast({
        title: "Room Created!",
        description: "Your podcast room is now available. Share the link to invite others.",
      });
    }, 1500);
  };

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
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-pod-purple transition-colors"
                      onClick={() => handleUploadClick('audio')}
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        {selectedFile && uploadType === 'audio' 
                          ? `Selected: ${selectedFile.name}` 
                          : 'Drag and drop your audio files here, or click to browse'}
                      </p>
                      <Button 
                        className="bg-pod-purple hover:bg-pod-purple-dark" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUploadClick('audio');
                        }}
                      >
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
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-pod-purple transition-colors"
                      onClick={() => handleUploadClick('video')}
                    >
                      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        {selectedFile && uploadType === 'video' 
                          ? `Selected: ${selectedFile.name}` 
                          : 'Drag and drop your video files here, or click to browse'}
                      </p>
                      <Button 
                        className="bg-pod-purple hover:bg-pod-purple-dark"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUploadClick('video');
                        }}
                      >
                        Choose Video File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {selectedFile && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Podcast Details</CardTitle>
                    <CardDescription>Tell us more about your podcast</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter podcast title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter podcast description" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="technology">Technology</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="entertainment">Entertainment</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="health">Health</SelectItem>
                                  <SelectItem value="science">Science</SelectItem>
                                  <SelectItem value="society">Society</SelectItem>
                                  <SelectItem value="sports">Sports</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="bg-pod-purple hover:bg-pod-purple-dark w-full"
                          disabled={isUploading}
                        >
                          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isUploading ? "Uploading..." : "Upload Podcast"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
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
                    <Button 
                      className="bg-red-500 hover:bg-red-600 flex-1"
                      onClick={() => handleLiveStream('audio')}
                    >
                      Start Audio Live Stream
                    </Button>
                    <Button 
                      className="bg-red-500 hover:bg-red-600 flex-1"
                      onClick={() => handleLiveStream('video')}
                    >
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
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        title: "Comments Loaded",
                        description: "Now showing your latest podcast comments",
                      });
                    }}>
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
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        title: "Rewards Dashboard",
                        description: "Loading your creator rewards information",
                      });
                    }}>
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
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleCreateRoom}
                    >
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
