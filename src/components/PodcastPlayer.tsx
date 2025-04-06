
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface PodcastPlayerProps {
  mediaUrl: string;
  mediaType: 'audio' | 'video';
  title: string;
}

const PodcastPlayer = ({ mediaUrl, mediaType, title }: PodcastPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);

  // Format time to display as mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    // Update time as media plays
    const updateTime = () => {
      if (mediaRef.current) {
        setCurrentTime(mediaRef.current.currentTime);
      }
    };

    // Load metadata to get duration
    const loadMetadata = () => {
      if (mediaRef.current) {
        setDuration(mediaRef.current.duration);
      }
    };

    // Add event listeners when component mounts
    const mediaElement = mediaRef.current;
    if (mediaElement) {
      mediaElement.addEventListener('timeupdate', updateTime);
      mediaElement.addEventListener('loadedmetadata', loadMetadata);
      
      // Set volume
      mediaElement.volume = volume;
    }

    return () => {
      // Clean up event listeners when component unmounts
      if (mediaElement) {
        mediaElement.removeEventListener('timeupdate', updateTime);
        mediaElement.removeEventListener('loadedmetadata', loadMetadata);
      }
    };
  }, [mediaRef.current, volume]);

  // Handle play/pause
  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (mediaRef.current) {
      const newTime = (value[0] / 100) * duration;
      mediaRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow border border-border">
      {mediaType === 'video' ? (
        <video 
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={mediaUrl}
          className="w-full rounded-md mb-4"
          poster="/placeholder.svg"
        />
      ) : (
        <div className="flex justify-center items-center py-6 bg-muted rounded-md mb-4">
          <audio 
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            src={mediaUrl}
            className="hidden"
          />
          <div className="text-center">
            <h3 className="font-medium mb-2">Now Playing</h3>
            <p className="text-muted-foreground">{title}</p>
          </div>
        </div>
      )}
      
      {/* Controls */}
      <div className="space-y-2">
        {/* Time and progress */}
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <Slider 
          value={[duration ? (currentTime / duration) * 100 : 0]} 
          max={100} 
          step={0.1}
          onValueChange={handleSeek}
          className="mb-4"
        />
        
        {/* Playback controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMute}
              className="text-pod-purple hover:text-pod-purple-dark"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
            
            <Slider 
              value={[isMuted ? 0 : volume * 100]} 
              max={100} 
              step={1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                if (mediaRef.current) {
                  mediaRef.current.currentTime = Math.max(0, currentTime - 10);
                }
              }}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="default"
              size="icon"
              className="bg-pod-purple hover:bg-pod-purple-dark"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                if (mediaRef.current) {
                  mediaRef.current.currentTime = Math.min(duration, currentTime + 10);
                }
              }}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="w-28"> {/* Empty div for layout balance */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastPlayer;
