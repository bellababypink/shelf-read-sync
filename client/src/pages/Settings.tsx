import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Shield, 
  Rss, 
  Send, 
  Palette, 
  LogOut,
  Save,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const { user, signOut } = useAuth();

  const handleSave = () => {
    toast.success("Settings saved!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={signOut} />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="w-full grid grid-cols-4 h-auto p-1 bg-secondary">
            <TabsTrigger value="account" className="py-3 gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="feeds" className="py-3 gap-2">
              <Rss className="w-4 h-4" />
              <span className="hidden sm:inline">OPDS</span>
            </TabsTrigger>
            <TabsTrigger value="telegram" className="py-3 gap-2">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Telegram</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="py-3 gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Display</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold">Profile</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ""} disabled className="bg-muted" />
                </div>
                
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" defaultValue={user?.user_metadata?.full_name || ""} />
                </div>
              </div>

              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            <div className="glass-card rounded-xl p-6 space-y-4 border border-destructive/30">
              <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
              <p className="text-sm text-muted-foreground">
                Once you delete your account, all your data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <Button variant="destructive" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* OPDS Feeds Tab */}
          <TabsContent value="feeds" className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">OPDS Feeds</h2>
              <p className="text-sm text-muted-foreground">
                Manage your connected OPDS catalogs for public domain content.
              </p>
              
              <div className="py-8 text-center text-muted-foreground">
                No OPDS feeds configured. Add feeds from the Import page.
              </div>
            </div>
          </TabsContent>

          {/* Telegram Tab */}
          <TabsContent value="telegram" className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold">Telegram Integration</h2>
              <p className="text-sm text-muted-foreground">
                Connect a Telegram bot to import files directly from Telegram.
              </p>
              
              <div className="space-y-2">
                <Label>Bot Token</Label>
                <Input type="password" placeholder="Your bot token" />
              </div>

              <Button variant="secondary">
                Save Token
              </Button>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold">Reading Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sync reading position</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync your reading progress across devices
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-play next chapter</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically continue to the next chapter for audiobooks
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show reading time estimates</p>
                    <p className="text-sm text-muted-foreground">
                      Display estimated time to finish based on reading speed
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
