
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { name: "Technology", color: "bg-blue-500", count: 324 },
  { name: "Business", color: "bg-green-500", count: 218 },
  { name: "Entertainment", color: "bg-purple-500", count: 512 },
  { name: "Education", color: "bg-amber-500", count: 176 },
  { name: "Health", color: "bg-red-500", count: 293 },
  { name: "Science", color: "bg-teal-500", count: 147 },
  { name: "Society", color: "bg-pink-500", count: 185 },
  { name: "Sports", color: "bg-orange-500", count: 261 },
];

const LOCAL_STORAGE_KEY = "podvilla_uploaded_podcasts";

const CategorySection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Update category counts based on uploaded podcasts
  const categoryCounts = () => {
    const storedPodcasts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
    
    // Create a map of category counts from stored podcasts
    const userCategoryCounts = storedPodcasts.reduce((acc: Record<string, number>, podcast: any) => {
      const category = podcast.category?.toLowerCase();
      if (category) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {});
    
    // Return updated categories with new counts
    return categories.map(category => ({
      ...category,
      count: category.count + (userCategoryCounts[category.name.toLowerCase()] || 0)
    }));
  };
  
  const handleCategoryClick = (category: string) => {
    navigate(`/explore?category=${category.toLowerCase()}`);
    toast({
      title: `Browsing ${category}`,
      description: `Showing podcasts in the ${category} category`,
    });
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="pod-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Browse Categories</h2>
          <Button variant="ghost" className="text-pod-purple gap-2" asChild>
            <Link to="/explore">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categoryCounts().map((category, index) => (
            <div 
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="pod-card overflow-hidden group h-32 flex items-center justify-center relative cursor-pointer"
            >
              <div className={`absolute inset-0 ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <div className="z-10 text-center">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} podcasts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
