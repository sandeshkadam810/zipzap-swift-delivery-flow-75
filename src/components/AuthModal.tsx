import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
  onAuthSuccess: (user: any) => void;
}

const AuthModal = ({ isOpen, onClose, mode, onModeChange, onAuthSuccess }: AuthModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  if (mode === "signup") {
    const { email, password, name, phone } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup error", error);
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const user = data.user;

      // ✅ Update profiles table (inserted by trigger)
      if (user) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            full_name: name,
            phone: phone,
            user_type: "customer", // or 'store' based on your UI logic
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id); // 🔑 link to the auth.users UUID

        if (updateError) {
          console.error("Profile update error", updateError);
          toast({
            title: "Profile Update Failed",
            description: updateError.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Successful",
            description: "Your account has been created!",
          });
          onAuthSuccess(user);
          onClose();
        }
      }
    }
  } else {
    // login
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome Back",
        description: "You're logged in!",
      });
      onAuthSuccess(data.user);
      onClose();
    }
  }

  setIsLoading(false);
};


  const handleGoogleAuth = () => { 
    toast({
      title: "Google Auth",
      description: "Google authentication will be implemented with backend integration.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {mode === "login" ? "Welcome Back" : "Join ZipZap"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <Button type="button" variant="outline" className="w-full" onClick={handleGoogleAuth}>
            Continue with Google
          </Button>

          <Separator className="bg-purple-100" />

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
                className="ml-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
