import { cn } from "@/lib/utils";
import { Play, BookOpen, Headphones, FileText, Heart, MoreVertical } from "lucide-react";
import { Button } from "./button";

export type MediaType = "book" | "audiobook" | "pdf" | "external";

interface MediaCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  type: MediaType;
  progress?: number;
  isFavorite?: boolean;
  onClick?: () => void;
  onPlay?: () => void;
  onFavorite?: () => void;
  className?: string;
}

const typeConfig = {
  book: { icon: BookOpen, label: "Book", className: "type-badge-book" },
  audiobook: { icon: Headphones, label: "Audiobook", className: "type-badge-audiobook" },
  pdf: { icon: FileText, label: "PDF", className: "type-badge-pdf" },
  external: { icon: BookOpen, label: "External", className: "type-badge-book" },
};

export function MediaCard({
  id,
  title,
  author,
  coverUrl,
  type,
  progress,
  isFavorite,
  onClick,
  onPlay,
  onFavorite,
  className,
}: MediaCardProps) {
  const config = typeConfig[type];
  const TypeIcon = config.icon;

  return (
    <div
      className={cn(
        "media-card group cursor-pointer flex-shrink-0 w-[160px] sm:w-[180px]",
        className
      )}
      onClick={onClick}
    >
      {/* Cover Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent to-muted flex items-center justify-center">
            <TypeIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
            <Button
              size="icon"
              className="w-10 h-10 rounded-full golden-glow"
              onClick={(e) => {
                e.stopPropagation();
                onPlay?.();
              }}
            >
              <Play className="w-5 h-5 fill-current" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={(e) => {
                e.stopPropagation();
                onFavorite?.();
              }}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  isFavorite ? "fill-primary text-primary" : "text-foreground"
                )}
              />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        {progress !== undefined && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* Type badge */}
        <div className={cn("absolute top-2 right-2 type-badge", config.className)}>
          {config.label}
        </div>
      </div>

      {/* Info */}
      <div className="p-2">
        <h3 className="font-medium text-sm line-clamp-2 text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{author}</p>
      </div>
    </div>
  );
}

// Skeleton loader
export function MediaCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[160px] sm:w-[180px]">
      <div className="aspect-[2/3] rounded-lg skeleton-shimmer" />
      <div className="p-2 space-y-2">
        <div className="h-4 rounded skeleton-shimmer" />
        <div className="h-3 w-2/3 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}
