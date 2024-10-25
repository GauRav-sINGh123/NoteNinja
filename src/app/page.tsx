import Navbar from "@/components/Navbar";
 
import Testimonials from "@/components/Testimonials";
 
import { Bot, Sparkles} from "lucide-react";
import { Button } from "@/components/ui/button";
import Brands from "@/components/Brands";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center space-y-8">
            <div className="relative inline-block animate-bounce-slow">
              <div className="absolute inset-0 blur-2xl bg-white/20 rounded-full" />
              <div className="relative bg-black p-4 rounded-2xl border border-white/10">
                <Bot className="w-8 h-8" />
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Transform Your Notes with
              <span className="bg-gradient-to-r from-white via-white/50 to-transparent bg-clip-text text-transparent block mt-2">
                AI Intelligence
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-gray-400">
              Elevate your note-taking experience with our AI-powered platform. Generate, organize, and enhance your notes with the power of artificial intelligence.
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Try Demo <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </div>


             <Features/>
          </div>
        </div>
      </div>

      <Brands/>
      <Pricing/>
      <Testimonials/>
      <Footer/>
    </main>
  );
}
