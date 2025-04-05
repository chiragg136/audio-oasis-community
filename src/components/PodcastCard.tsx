
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PodcastCardProps {
  id: string;
  title: string;
  creator: string;
  coverImage: string;
  category: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

const PodcastCard = ({ id, title, creator, coverImage, category, isFeatured, isNew }: PodcastCardProps) => {
  return (
    <div className={cn(
      "pod-card overflow-hidden group",
      isFeatured && "md:col-span-2 md:row-span-2"
    )}>
      <div className="relative">
        <img 
          src={coverImage} 
          alt={title} 
          className={cn(
            "w-full object-cover transition-transform group-hover:scale-105 duration-300",
            isFeatured ? "h-64 md:h-80" : "h-48"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Play className="h-6 w-6 text-white" fill="white" />
          </Button>
        </div>
        {isNew && (
          <div className="absolute top-3 left-3 bg-pod-purple text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
        {category && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {category}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/podcast/${id}`}>
              <h3 className={cn(
                "font-bold hover:text-pod-purple transition-colors line-clamp-1",
                isFeatured ? "text-xl" : "text-base"
              )}>
                {title}
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">{creator}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-pod-purple">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
