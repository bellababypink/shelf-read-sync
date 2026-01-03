import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  BookOpen, 
  Headphones, 
  Upload, 
  Smartphone, 
  Shield, 
  Sparkles,
  Play,
  ChevronRight
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Your Books, Your Way",
    description: "Import EPUBs and PDFs from your personal collection. Read with customizable fonts, themes, and layouts.",
  },
  {
    icon: Headphones,
    title: "Audiobook Player",
    description: "Listen to your MP3 and M4B audiobooks with speed controls, sleep timer, and bookmarks.",
  },
  {
    icon: Upload,
    title: "Easy Import",
    description: "Drag & drop files, import from URLs you own, or connect OPDS feeds for public domain catalogs.",
  },
  {
    icon: Smartphone,
    title: "Sync Everywhere",
    description: "Your progress, bookmarks, and notes sync across all your devices in real-time.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your library is private. We only store metadata—your files stay in secure cloud storage.",
  },
  {
    icon: Sparkles,
    title: "Netflix-Style UI",
    description: "Beautiful, modern interface designed for discovery and easy access to your entire collection.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-8">
              <Shield className="w-4 h-4 text-primary" />
              <span>DRM-free content only • Privacy focused</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Personal
              <span className="text-gradient-gold block mt-2">Streaming Library</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A Netflix-style experience for your books and audiobooks. 
              Import your DRM-free collection and enjoy across all devices.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild className="golden-glow">
                <Link to="/auth?mode=signup">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Get Started Free
                </Link>
              </Button>
              <Button size="xl" variant="secondary" asChild>
                <Link to="/auth">
                  Sign In
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              Free to use • No credit card required
            </p>
          </div>

          {/* Preview mockup */}
          <div className="mt-16 max-w-5xl mx-auto fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
              <div className="aspect-video bg-gradient-to-br from-card to-muted flex items-center justify-center">
                <div className="grid grid-cols-6 gap-3 p-8 w-full max-w-3xl">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[2/3] rounded-lg bg-gradient-to-br from-accent to-muted animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete solution for managing and enjoying your personal book and audiobook collection.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl glass-card hover:bg-accent/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Build Your Library?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of readers who have organized their personal collections with ShelfFlix.
          </p>
          <Button size="xl" asChild className="golden-glow">
            <Link to="/auth?mode=signup">
              <BookOpen className="w-5 h-5 mr-2" />
              Start Your Library
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
