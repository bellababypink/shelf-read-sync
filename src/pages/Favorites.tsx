import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { MediaCard, MediaType } from "@/components/ui/MediaCard";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Demo favorites
const favorites = [
  {
    id: "7",
    title: "War and Peace",
    author: "Leo Tolstoy",
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    isFavorite: true,
  },
  {
    id: "1",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    progress: 45,
    isFavorite: true,
  },
];

export default function Favorites() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={signOut} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <h1 className="text-3xl font-bold">Favorites</h1>
          </div>
          <p className="text-muted-foreground">
            Your favorite books and audiobooks
          </p>
        </div>

        {/* Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favorites.map((item) => (
              <MediaCard
                key={item.id}
                {...item}
                className="w-full"
                onClick={() => navigate(`/item/${item.id}`)}
                onPlay={() => navigate(`/read/${item.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Click the heart icon on any book to add it to your favorites
            </p>
            <Button onClick={() => navigate("/library")}>
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Library
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
