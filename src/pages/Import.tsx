import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Link as LinkIcon, 
  Rss, 
  Send, 
  FileText, 
  AlertTriangle,
  Check,
  X,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function Import() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      ["application/epub+zip", "application/pdf", "audio/mpeg", "audio/mp4"].includes(file.type) ||
      file.name.endsWith(".epub") ||
      file.name.endsWith(".pdf") ||
      file.name.endsWith(".mp3") ||
      file.name.endsWith(".m4b")
    );
    
    if (droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles]);
      toast.success(`${droppedFiles.length} file(s) added`);
    } else {
      toast.error("Please upload EPUB, PDF, MP3, or M4B files only");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      toast.success(`${newFiles.length} file(s) added`);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast.error("Please add files to upload");
      return;
    }
    toast.success("Files uploaded successfully!");
    setFiles([]);
    navigate("/library");
  };

  const handleUrlImport = () => {
    if (!urlInput) {
      toast.error("Please enter a URL");
      return;
    }
    if (!rightsConfirmed) {
      toast.error("Please confirm you own the rights to this file");
      return;
    }
    toast.success("File imported from URL!");
    setUrlInput("");
    setRightsConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={signOut} />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Import Content</h1>
          <p className="text-muted-foreground">
            Add DRM-free books and audiobooks to your library
          </p>
        </div>

        {/* Rights Notice */}
        <div className="mb-8 p-4 rounded-xl glass-card border border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning mb-1">Rights & Usage Notice</h3>
              <p className="text-sm text-muted-foreground">
                ShelfFlix only supports DRM-free content that you legally own or have rights to access. 
                This includes personal purchases, public domain works, and authorized OPDS catalogs. 
                We do not support or integrate with any unauthorized content sources.
              </p>
            </div>
          </div>
        </div>

        {/* Import Tabs */}
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1 bg-secondary">
            <TabsTrigger value="upload" className="py-3 gap-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="url" className="py-3 gap-2">
              <LinkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">From URL</span>
            </TabsTrigger>
            <TabsTrigger value="opds" className="py-3 gap-2">
              <Rss className="w-4 h-4" />
              <span className="hidden sm:inline">OPDS</span>
            </TabsTrigger>
            <TabsTrigger value="telegram" className="py-3 gap-2">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Telegram</span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center transition-colors",
                dragOver ? "border-primary bg-primary/5" : "border-border"
              )}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                Drag & drop files here
              </h3>
              <p className="text-muted-foreground mb-4">
                Supports EPUB, PDF, MP3, and M4B files
              </p>
              <label>
                <Button variant="secondary">
                  Browse Files
                </Button>
                <input
                  type="file"
                  className="hidden"
                  accept=".epub,.pdf,.mp3,.m4b"
                  multiple
                  onChange={handleFileInput}
                />
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Selected Files ({files.length})</h3>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card"
                  >
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleUpload} className="w-full golden-glow">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {files.length} File(s)
                </Button>
              </div>
            )}
          </TabsContent>

          {/* URL Tab */}
          <TabsContent value="url" className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Direct File URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/my-book.epub"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="input-glow"
                />
                <p className="text-xs text-muted-foreground">
                  Enter a direct link to an EPUB, PDF, MP3, or M4B file that you own
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="rights"
                  checked={rightsConfirmed}
                  onCheckedChange={(checked) => setRightsConfirmed(checked as boolean)}
                />
                <Label htmlFor="rights" className="text-sm text-muted-foreground">
                  I confirm that I own the rights to download and use this file
                </Label>
              </div>

              <Button
                onClick={handleUrlImport}
                disabled={!urlInput || !rightsConfirmed}
                className="w-full"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Import from URL
              </Button>
            </div>
          </TabsContent>

          {/* OPDS Tab */}
          <TabsContent value="opds" className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <Label>Add OPDS Feed</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Feed name"
                    className="flex-1 input-glow"
                  />
                  <Input
                    placeholder="https://example.com/opds"
                    className="flex-[2] input-glow"
                  />
                  <Button>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add OPDS feeds from public domain catalogs like Standard Ebooks, Project Gutenberg, etc.
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-3">Your Feeds</h4>
                <p className="text-sm text-muted-foreground">
                  No OPDS feeds configured yet. Add a feed above to browse public domain catalogs.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Telegram Tab */}
          <TabsContent value="telegram" className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="space-y-2">
                <Label>Telegram Bot Token</Label>
                <Input
                  type="password"
                  placeholder="Your bot token"
                  className="input-glow"
                />
                <p className="text-xs text-muted-foreground">
                  Create a bot via @BotFather on Telegram and paste the token here.
                  Forward files to your bot to import them into ShelfFlix.
                </p>
              </div>

              <Button variant="secondary" className="w-full">
                <Check className="w-4 h-4 mr-2" />
                Test Connection
              </Button>

              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-3">Recent Imports</h4>
                <p className="text-sm text-muted-foreground">
                  Configure your bot token above to start importing files via Telegram.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
