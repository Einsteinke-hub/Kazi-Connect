import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (keyword: string, location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    onSearch?.(keyword, location);
  };

  return (
    <div className="bg-card rounded-xl shadow-card p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Job title, keywords, or company"
            className="pl-10 h-12"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Nairobi, Mombasa, Remote..."
            className="pl-10 h-12"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button 
          className="h-12 px-8 bg-gradient-hero hover:opacity-90 transition-smooth"
          onClick={handleSearch}
        >
          Search Jobs
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
