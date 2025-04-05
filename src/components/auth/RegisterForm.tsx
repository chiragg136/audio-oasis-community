
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const RegisterForm = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'listener';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState(userType);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration (replace with actual registration logic)
    try {
      // Mock successful registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration successful",
        description: "Welcome to PodVilla! Check your email for verification.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMetamaskRegister = () => {
    toast({
      title: "Wallet Connection",
      description: "Metamask registration coming soon!",
    });
  };

  const handleDojimaRegister = () => {
    toast({
      title: "Wallet Connection",
      description: "Dojima wallet registration coming soon!",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <RadioGroup
          value={accountType}
          onValueChange={setAccountType}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div>
            <RadioGroupItem
              value="listener"
              id="listener"
              className="peer sr-only"
            />
            <Label
              htmlFor="listener"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-pod-purple [&:has([data-state=checked])]:border-pod-purple"
            >
              <span>Listener</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="creator"
              id="creator"
              className="peer sr-only"
            />
            <Label
              htmlFor="creator"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-pod-purple [&:has([data-state=checked])]:border-pod-purple"
            >
              <span>Creator</span>
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full bg-pod-purple hover:bg-pod-purple-dark" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"}
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
          <Button variant="outline" onClick={handleMetamaskRegister} className="gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="Metamask" className="h-5 w-5" />
            Metamask
          </Button>
          <Button variant="outline" onClick={handleDojimaRegister} className="gap-2">
            <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>
            Dojima
          </Button>
        </div>
      </div>
      
      <p className="text-center mt-6 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-pod-purple hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
