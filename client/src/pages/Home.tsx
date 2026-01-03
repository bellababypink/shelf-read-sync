import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HeroBanner, HeroBannerSkeleton } from "@/components/ui/HeroBanner";
import { ContentRow } from "@/components/ui/ContentRow";
import { MediaCard, MediaCardSkeleton, MediaType } from "@/components/ui/MediaCard";
import { useAuth } from "@/hooks/useAuth";

// Demo data - public domain books
const demoItems = [
  {
    id: "1",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    progress: 45,
  },
  {
    id: "2",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    progress: 0,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    type: "audiobook" as MediaType,
    progress: 72,
  },
  {
    id: "4",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    progress: 0,
  },
  {
    id: "5",
    title: "The Odyssey",
    author: "Homer",
    coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
    type: "audiobook" as MediaType,
    progress: 15,
  },
  {
    id: "6",
    title: "Moby Dick",
    author: "Herman Melville",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    type: "pdf" as MediaType,
    progress: 0,
  },
  {
    id: "7",
    title: "War and Peace",
    author: "Leo Tolstoy",
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    type: "book" as MediaType,
    isFavorite: true,
  },
  {
    id: "8",
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    type: "book" as MediaType,
  },
];

const continueItems = demoItems.filter(item => item.progress && item.progress > 0);
const favorites = demoItems.filter(item => item.isFavorite);
const recentlyAdded = [...demoItems].reverse().slice(0, 6);
const audiobooks = demoItems.filter(item => item.type === "audiobook");

export default function Home() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const featuredItem = demoItems[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={signOut} />
      
      {/* Hero Banner */}
      <HeroBanner
        title={featuredItem.title}
        author={featuredItem.author}
        description="It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood..."
        coverUrl={featuredItem.coverUrl}
        type="Classic Novel"
        onPlay={() => navigate(`/read/${featuredItem.id}`)}
        onAddToList={() => {}}
        onMoreInfo={() => navigate(`/item/${featuredItem.id}`)}
      />

      {/* Content Rows */}
      <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
        {/* Continue Reading/Listening */}
        {continueItems.length > 0 && (
          <ContentRow title="Continue" showViewAll onViewAll={() => navigate("/library?filter=in-progress")}>
            {continueItems.map((item) => (
              <MediaCard
                key={item.id}
                {...item}
                onClick={() => navigate(`/item/${item.id}`)}
                onPlay={() => navigate(`/read/${item.id}`)}
              />
            ))}
          </ContentRow>
        )}

        {/* Favorites */}
        <ContentRow title="My Favorites" showViewAll onViewAll={() => navigate("/favorites")}>
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <MediaCard
                key={item.id}
                {...item}
                onClick={() => navigate(`/item/${item.id}`)}
                onPlay={() => navigate(`/read/${item.id}`)}
              />
            ))
          ) : (
            demoItems.slice(0, 4).map((item) => (
              <MediaCard
                key={item.id}
                {...item}
                onClick={() => navigate(`/item/${item.id}`)}
                onPlay={() => navigate(`/read/${item.id}`)}
              />
            ))
          )}
        </ContentRow>

        {/* Recently Added */}
        <ContentRow title="Recently Added" showViewAll onViewAll={() => navigate("/library?sort=recent")}>
          {recentlyAdded.map((item) => (
            <MediaCard
              key={item.id}
              {...item}
              onClick={() => navigate(`/item/${item.id}`)}
              onPlay={() => navigate(`/read/${item.id}`)}
            />
          ))}
        </ContentRow>

        {/* Audiobooks */}
        <ContentRow title="Audiobooks" showViewAll onViewAll={() => navigate("/library?type=audiobook")}>
          {audiobooks.length > 0 ? (
            audiobooks.map((item) => (
              <MediaCard
                key={item.id}
                {...item}
                onClick={() => navigate(`/item/${item.id}`)}
                onPlay={() => navigate(`/read/${item.id}`)}
              />
            ))
          ) : (
            demoItems.slice(0, 4).map((item) => (
              <MediaCard
                key={item.id}
                {...item}
                type="audiobook"
                onClick={() => navigate(`/item/${item.id}`)}
                onPlay={() => navigate(`/read/${item.id}`)}
              />
            ))
          )}
        </ContentRow>

        {/* All Books */}
        <ContentRow title="All Books" showViewAll onViewAll={() => navigate("/library")}>
          {demoItems.map((item) => (
            <MediaCard
              key={item.id}
              {...item}
              onClick={() => navigate(`/item/${item.id}`)}
              onPlay={() => navigate(`/read/${item.id}`)}
            />
          ))}
        </ContentRow>
      </div>
    </div>
  );
}
