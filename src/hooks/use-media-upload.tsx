
import { useState } from 'react';
import supabase from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function useMediaUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadMedia = async (file: File, type: 'audio' | 'video' | 'image') => {
    if (!file) return null;
    
    setIsUploading(true);
    setProgress(0);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      
      // Determine the storage bucket based on the file type
      let bucket = 'podcasts';
      if (type === 'image') {
        bucket = 'covers';
      }
      
      const filePath = `${type === 'image' ? 'covers' : type}/${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = progress.percent ? Math.round(progress.percent) : 0;
            setProgress(percent);
          }
        });

      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL
      const { data: urlData } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, 3600);
      
      setIsUploading(false);
      
      return {
        filePath: filePath,
        url: urlData?.signedUrl || null
      };
    } catch (error: any) {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your file",
        variant: "destructive",
      });
      return null;
    }
  };

  return {
    uploadMedia,
    isUploading,
    progress
  };
}
