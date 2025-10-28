import { getCurrentSession } from "@/lib/server/session";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { FileText, Upload, History, Settings } from "lucide-react";

export default async function Dashboard() {
  const { session, user } = await getCurrentSession();

  // Redirect to home if not authenticated
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your files and conversions from your dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Upload Files Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Upload Files</h3>
                <p className="text-sm text-muted-foreground">
                  Start a new conversion
                </p>
              </div>
            </div>
            <Button className="w-full">
              Upload New File
            </Button>
          </div>

          {/* Recent Files Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-blue-500/10 p-3">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Recent Files</h3>
                <p className="text-sm text-muted-foreground">
                  View your latest conversions
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Recent Files
            </Button>
          </div>

          {/* Conversion History Card */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <History className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">History</h3>
                <p className="text-sm text-muted-foreground">
                  Browse all conversions
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View History
            </Button>
          </div>
        </div>

        {/* User Info Section */}
        <div className="mt-8 rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="flex items-start gap-4">
            {user.picture && (
              <img 
                src={user.picture} 
                alt={user.name}
                className="h-16 w-16 rounded-full"
              />
            )}
            <div className="space-y-2">
              <div>
                <span className="font-medium">Name:</span> {user.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-medium">User ID:</span> {user.id}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}