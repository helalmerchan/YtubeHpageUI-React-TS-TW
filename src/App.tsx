import { useState } from "react";
import { CategoryPills } from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import { Header } from "./layouts/Header";
import { VideosInGrid } from "./components/VideosInGrid";
import { Sidebar } from "./layouts/Sidebar";
import { SidebarProvider } from "./context/SidebarContext";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory} />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map(video => (
                <VideosInGrid key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

