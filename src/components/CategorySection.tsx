
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const CategorySection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="pod-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Browse Categories</h2>
          <Button variant="ghost" className="text-pod-purple gap-2" asChild>
            <Link to="/categories">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/category/${category.name.toLowerCase()}`}
              className="pod-card overflow-hidden group h-32 flex items-center justify-center relative"
            >
              <div className={`absolute inset-0 ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <div className="z-10 text-center">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} podcasts</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
