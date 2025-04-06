
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Share2, MessageSquare, ArrowLeft, Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import supabase from '@/lib/supabase';

// Local storage key for uploaded podcasts
const LOCAL_STORAGE_KEY = "podvilla_uploaded_podcasts";

const PodcastDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [podcast, setPodcast] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      // First, check local storage for the podcast
      const storedPodcasts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
      const foundPodcast = storedPodcasts.find((p: any) => p.id === id);
      
      if (foundPodcast) {
        setPodcast(foundPodcast);
        
        // If the podcast has a file path on Supabase, fetch the URL
        if (foundPodcast.filePath) {
          try {
            const { data } = await supabase.storage
              .from('podcasts')
              .createSignedUrl(foundPodcast.filePath, 3600);
            
            if (data?.signedUrl) {
              setMediaUrl(data.signedUrl);
            }
          } catch (error) {
            console.error('Error fetching media URL:', error);
            toast({
              title: "Error loading media",
              description: "Could not fetch the media file. Please try again later.",
              variant: "destructive",
            });
          }
        }
      } else {
        // If not found in localStorage, show error
        toast({
          title: "Podcast not found",
          description: "The requested podcast could not be found.",
          variant: "destructive",
        });
        navigate('/explore');
      }
    };
    
    fetchPodcast();
  }, [id, navigate, toast]);

  useEffect(() => {
    // Setup audio/video event listeners when media URL is available
    if (mediaUrl && podcast) {
      if (podcast.mediaType === 'audio') {
        audioRef.current = new Audio(mediaUrl);
        audioRef.current.volume = volume;
        
        audioRef.current.addEventListener('loadedmetadata', () => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        });
        
        audioRef.current.addEventListener('timeupdate', () => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        });
        
        audioRef.current.addEventListener('ended', () => {
          setIsPlaying(false);
        });
      }
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('ended', () => {});
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [mediaUrl, podcast, volume]);

  if (!podcast) {
    return (
      <div className="min-h-screen flex flex-col">
        <PodNavbar />
        <main className="flex-grow py-8 flex items-center justify-center">
          <div className="animate-pulse text-2xl">Loading podcast...</div>
        </main>
        <PodFooter />
      </div>
    );
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (podcast.mediaType === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (podcast.mediaType === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: podcast.title,
        text: `Check out this podcast: ${podcast.title}`,
        url: window.location.href,
      }).then(() => {
        toast({
          title: "Shared successfully",
          description: "The podcast has been shared.",
        });
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Podcast link copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container max-w-5xl">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Podcast Cover and Controls */}
            <div className="md:col-span-1">
              <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
                {podcast.coverImage ? (
                  <img 
                    src={podcast.coverImage} 
                    alt={podcast.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-2xl font-bold text-muted-foreground">{podcast.title[0]}</span>
                  </div>
                )}
              </div>
              
              {/* Audio Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full mr-2"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <span className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="rounded-full"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : volume > 0.5 ? (
                        <Volume2 className="h-4 w-4" />
                      ) : (
                        <Volume1 className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="w-20">
                      <Slider 
                        value={[isMuted ? 0 : volume]} 
                        max={1} 
                        step={0.01} 
                        onValueChange={handleVolumeChange} 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Slider 
                    value={[currentTime]} 
                    max={duration} 
                    step={0.1} 
                    onValueChange={handleTimeChange} 
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" /> Like
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Podcast Details */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="capitalize bg-pod-purple">{podcast.category}</Badge>
                  <Badge variant="outline">
                    {podcast.mediaType === 'audio' ? 'Audio Podcast' : 'Video Podcast'}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
                <p className="text-muted-foreground mb-4">
                  By {podcast.creator || 'Anonymous'} • {new Date(podcast.uploadDate).toLocaleDateString()}
                </p>
                <p className="mb-6">{podcast.description || 'No description provided.'}</p>
                
                {podcast.mediaType === 'video' && mediaUrl && (
                  <div className="aspect-video bg-black rounded-lg mb-6">
                    <video 
                      ref={videoRef}
                      src={mediaUrl} 
                      className="w-full h-full"
                      controls
                      controlsList="nodownload"
                      poster={podcast.coverImage}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                )}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Comments</CardTitle>
                  <CardDescription>Join the conversation about this podcast</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea 
                        className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pod-purple focus:border-transparent"
                        placeholder="Add a comment..."
                        rows={3}
                      ></textarea>
                      <Button className="mt-2 bg-pod-purple hover:bg-pod-purple-dark">
                        Comment
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-6">
                    <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default PodcastDetailPage;
