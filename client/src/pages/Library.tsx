import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { MediaCard, MediaType } from "@/components/ui/MediaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  LayoutList, 
  BookOpen, 
  Headphones,
  FileText,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

// Demo data
const demoItems = [
  {
    id: "1",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    progress: 45,
    tags: ["classic", "romance"],
  },
  {
    id: "2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    tags: ["classic", "fiction"],
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    type: "audiobook" as MediaType,
    progress: 72,
    tags: ["dystopian", "classic"],
  },
  {
    id: "4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    tags: ["classic", "fiction"],
  },
  {
    id: "5",
    title: "The Odyssey",
    author: "Homer",
    coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
    type: "audiobook" as MediaType,
    progress: 15,
    tags: ["classic", "mythology"],
  },
  {
    id: "6",
    title: "Moby Dick",
    author: "Herman Melville",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    type: "pdf" as MediaType,
    tags: ["classic", "adventure"],
  },
  {
    id: "7",
    title: "War and Peace",
    author: "Leo Tolstoy",
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    isFavorite: true,
    tags: ["classic", "historical"],
  },
  {
    id: "8",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    tags: ["classic", "adventure"],
  },
];

type FilterType = "all" | "book" | "audiobook" | "pdf";
type SortType = "recent" | "title" | "author";

const filterOptions: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "All", icon: Grid3X3 },
  { value: "book", label: "Books", icon: BookOpen },
  { value: "audiobook", label: "Audiobooks", icon: Headphones },
  { value: "pdf", label: "PDFs", icon: FileText },
];

export default function Library() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signOut } = useAuth();
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>(
    (searchParams.get("type") as FilterType) || "all"
  );
  const [sort, setSort] = useState<SortType>("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = demoItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || item.type === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "author") return a.author.localeCompare(b.author);
      return 0; // recent - would use created_at in real app
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={signOut} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Library</h1>
          <p className="text-muted-foreground">
            {filteredItems.length} items in your collection
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 input-glow"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type filter */}
          <div className="flex gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "secondary"}
                size="sm"
                onClick={() => setFilter(option.value)}
                className="gap-2"
              >
                <option.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </Button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="w-8 h-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="w-8 h-8"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        {filteredItems.length > 0 ? (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                : "flex flex-col gap-3"
            )}
          >
            {filteredItems.map((item) =>
              viewMode === "grid" ? (
                <MediaCard
                  key={item.id}
                  {...item}
                  className="w-full"
                  onClick={() => navigate(`/item/${item.id}`)}
                  onPlay={() => navigate(`/read/${item.id}`)}
                />
              ) : (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl glass-card hover:bg-accent/10 transition-colors cursor-pointer"
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.author}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={cn(
                          "type-badge",
                          item.type === "book" && "type-badge-book",
                          item.type === "audiobook" && "type-badge-audiobook",
                          item.type === "pdf" && "type-badge-pdf"
                        )}
                      >
                        {item.type}
                      </span>
                      {item.progress !== undefined && item.progress > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {item.progress}% complete
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground mb-4">
              {search
                ? "Try a different search term"
                : "Import some books or audiobooks to get started"}
            </p>
            <Button onClick={() => navigate("/import")}>Import Items</Button>
          </div>
        )}
      </main>
    </div>
  );
}
