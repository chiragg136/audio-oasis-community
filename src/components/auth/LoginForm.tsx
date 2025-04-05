
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login (replace with actual authentication)
    try {
      // Mock successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Login successful",
        description: "Welcome back to PodVilla!",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMetamaskLogin = () => {
    toast({
      title: "Wallet Connection",
      description: "Metamask connection coming soon!",
    });
  };

  const handleDojimaLogin = () => {
    toast({
      title: "Wallet Connection",
      description: "Dojima wallet connection coming soon!",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-pod-purple hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-pod-purple hover:bg-pod-purple-dark" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button variant="outline" onClick={handleMetamaskLogin} className="gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="Metamask" className="h-5 w-5" />
            Metamask
          </Button>
          <Button variant="outline" onClick={handleDojimaLogin} className="gap-2">
            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>
            Dojima
          </Button>
        </div>
      </div>
      
      <p className="text-center mt-6 text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/register" className="text-pod-purple hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
