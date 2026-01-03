import { Button } from "./button";
import { Play, Plus, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
  title: string;
  author: string;
  description?: string;
  coverUrl?: string;
  type?: string;
  onPlay?: () => void;
  onAddToList?: () => void;
  onMoreInfo?: () => void;
  className?: string;
}

export function HeroBanner({
  title,
  author,
  description,
  coverUrl,
  type = "Book",
  onPlay,
  onAddToList,
  onMoreInfo,
  className,
}: HeroBannerProps) {
  return (
    <div className={cn("relative w-full h-[60vh] min-h-[400px] overflow-hidden", className)}>
      {/* Background image */}
      {coverUrl && (
        <img
          src={coverUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
        <div className="container mx-auto">
          <div className="max-w-2xl slide-up">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-4">
              {type}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-2">{author}</p>
            {description && (
              <p className="text-muted-foreground line-clamp-3 mb-6 max-w-lg">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={onPlay} className="golden-glow">
                <Play className="w-5 h-5 mr-2 fill-current" />
                Start Reading
              </Button>
              <Button size="lg" variant="secondary" onClick={onAddToList}>
                <Plus className="w-5 h-5 mr-2" />
                My List
              </Button>
              <Button size="lg" variant="ghost" onClick={onMoreInfo}>
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] hero-gradient">
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
        <div className="container mx-auto">
          <div className="max-w-2xl space-y-4">
            <div className="w-20 h-6 rounded-full skeleton-shimmer" />
            <div className="w-80 h-12 rounded skeleton-shimmer" />
            <div className="w-48 h-6 rounded skeleton-shimmer" />
            <div className="w-full max-w-lg h-16 rounded skeleton-shimmer" />
            <div className="flex gap-3">
              <div className="w-36 h-12 rounded-lg skeleton-shimmer" />
              <div className="w-28 h-12 rounded-lg skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
