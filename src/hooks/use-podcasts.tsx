
import { useState, useEffect } from 'react';

export const LOCAL_STORAGE_KEY = "podvilla_uploaded_podcasts";

export interface Podcast {
  id: string;
  title: string;
  description: string;
  category: string;
  creator: string;
  coverImage: string;
  mediaType: 'audio' | 'video' | null;
  uploadDate: string;
  fileName: string;
  filePath: string;
  fileUrl: string;
}

export function usePodcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPodcasts = () => {
      try {
        const storedPodcasts = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsedPodcasts = storedPodcasts ? JSON.parse(storedPodcasts) : [];
        setPodcasts(parsedPodcasts);
      } catch (error) {
        console.error("Error loading podcasts from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPodcasts();
  }, []);
  
  const getPodcastById = (id: string) => {
    return podcasts.find(podcast => podcast.id === id) || null;
  };
  
  const getPodcastsByCategory = (category: string) => {
    return podcasts.filter(podcast => podcast.category === category);
  };
  
  return {
    podcasts,
    isLoading,
    getPodcastById,
    getPodcastsByCategory
  };
}

export function useCreatePodcast() {
  const savePodcast = (podcast: Omit<Podcast, 'id' | 'uploadDate'>) => {
    try {
      // Generate a unique ID for the podcast
      const podcastId = `podcast_${Date.now()}`;
      
      // Create the complete podcast object
      const newPodcast: Podcast = {
        ...podcast,
        id: podcastId,
        uploadDate: new Date().toISOString(),
      };
      
      // Get existing podcasts or initialize empty array
      const storedPodcasts = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existingPodcasts: Podcast[] = storedPodcasts ? JSON.parse(storedPodcasts) : [];
      
      // Add new podcast and save back to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newPodcast, ...existingPodcasts]));
      
      return podcastId;
    } catch (error) {
      console.error("Error saving podcast to localStorage:", error);
      return null;
    }
  };
  
  return { savePodcast };
}
