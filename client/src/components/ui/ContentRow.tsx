import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ContentRowProps {
  title: string;
  children: React.ReactNode;
  showViewAll?: boolean;
  onViewAll?: () => void;
  className?: string;
}

export function ContentRow({
  title,
  children,
  showViewAll,
  onViewAll,
  className,
}: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={cn("py-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{title}</h2>
        {showViewAll && (
          <Button
            variant="ghost"
            onClick={onViewAll}
            className="text-muted-foreground hover:text-primary"
          >
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      <div className="relative group">
        {/* Left scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-20 rounded-r-lg bg-background/80 backdrop-blur-sm transition-opacity",
            canScrollLeft ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Content */}
        <div ref={scrollRef} className="content-row px-1">
          {children}
        </div>

        {/* Right scroll button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-20 rounded-l-lg bg-background/80 backdrop-blur-sm transition-opacity",
            canScrollRight ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => scroll("right")}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
}
