import { Sidebar } from "@/app/components/feed/Sidebar";
import { Rightsidebar } from "../components/feed/Rightsidebar";
import { FeedHeader } from "@/app/components/feed/FeedHeader";
import { FeedFilters } from "../components/feed/FeedFilters";
import { FeedList } from "@/app/components/feed/FeedList";
import { BottomNav } from "../components/shared/BottomNav";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
        <Sidebar />
        <Rightsidebar/>
        <BottomNav />
        <main className="min-h-screen ml-0 md:ml-64 mr-0 md:mr-80">
          <div className="max-w-2xl mx-auto p-8">
            {/* Feed de posts */}
            <FeedHeader/>
            <FeedFilters/>
            <FeedList/>
          </div>
        </main>
    </div>
  );
}