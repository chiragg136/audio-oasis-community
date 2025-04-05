
import React from 'react';
import { Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, description, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="md:w-1/2 bg-gradient-to-br from-pod-purple to-pod-blue p-8 flex items-center justify-center">
        <div className="max-w-md text-white text-center md:text-left">
          <Link to="/" className="flex items-center justify-center md:justify-start mb-8">
            <Headphones className="h-10 w-10 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">
              PodVilla
            </span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to the PodVilla Community</h1>
          <p className="text-lg opacity-90">
            Join thousands of creators and listeners in a revolutionary podcast experience.
          </p>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="md:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
