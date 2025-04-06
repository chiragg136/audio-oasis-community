
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PodNavbar from '@/components/PodNavbar';
import PodFooter from '@/components/PodFooter';
import PodcastPlayer from '@/components/PodcastPlayer';
import { usePodcasts } from '@/hooks/use-podcasts';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Share2, Heart, BookmarkPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const PodcastDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getPodcastById, isLoading } = usePodcasts();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const podcast = id ? getPodcastById(id) : null;
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <PodNavbar />
        <main className="flex-grow py-8">
          <div className="pod-container">
            <div className="max-w-4xl mx-auto px-4">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-96 mb-8" />
              <Skeleton className="h-[400px] w-full mb-4 rounded-lg" />
              <div className="space-y-4 mt-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <PodFooter />
      </div>
    );
  }
  
  if (!podcast) {
    return (
      <div className="min-h-screen flex flex-col">
        <PodNavbar />
        <main className="flex-grow py-8">
          <div className="pod-container">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-2xl font-bold mb-4">Podcast Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The podcast you're looking for doesn't exist or has been removed.
              </p>
              <Button
                onClick={() => navigate('/explore')}
                className="bg-pod-purple hover:bg-pod-purple-dark"
              >
                Explore Podcasts
              </Button>
            </div>
          </div>
        </main>
        <PodFooter />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }).format(date);
  };
  
  const handleInteraction = (action: string) => {
    toast({
      title: action,
      description: `You ${action.toLowerCase()} this podcast`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PodNavbar />
      <main className="flex-grow py-8">
        <div className="pod-container">
          <div className="max-w-4xl mx-auto px-4">
            <Button
              variant="ghost"
              className="mb-6 pl-0 flex items-center text-muted-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                  {podcast.coverImage ? (
                    <img 
                      src={podcast.coverImage} 
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-muted-foreground">No Cover</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleInteraction('Liked')}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleInteraction('Saved')}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleInteraction('Commented')}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast({
                        title: "Link Copied",
                        description: "Podcast link copied to clipboard",
                      });
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <h1 className="text-2xl font-bold mb-2">{podcast.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                    {podcast.mediaType?.toUpperCase()}
                  </span>
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded capitalize">
                    {podcast.category}
                  </span>
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                    {formatDate(podcast.uploadDate)}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">About this episode</h2>
                  <p className="text-muted-foreground">
                    {podcast.description || "No description provided for this podcast."}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">Creator</h2>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <span className="text-muted-foreground font-medium">
                        {podcast.creator.substring(0, 1).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{podcast.creator}</p>
                      <p className="text-sm text-muted-foreground">Podcast Creator</p>
                    </div>
                  </div>
                </div>
                
                <PodcastPlayer 
                  mediaUrl={podcast.fileUrl} 
                  mediaType={podcast.mediaType || 'audio'}
                  title={podcast.title}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <PodFooter />
    </div>
  );
};

export default PodcastDetailPage;
