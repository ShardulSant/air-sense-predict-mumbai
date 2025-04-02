
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';

interface LocationSuggestion {
  display_name: string;
  lat: number;
  lon: number;
}

interface LocationSearchProps {
  onLocationSelect: (location: LocationSuggestion) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 3) {
        setSuggestions([]);
        return;
      }
      
      setLoading(true);
      try {
        // Using Nominatim OpenStreetMap search API - would be replaced with a real API
        // This is just for demonstration purposes
        // In a real app, we would use a proper geocoding service
        setSuggestions([
          { 
            display_name: "Andheri, Mumbai, Maharashtra, India",
            lat: 19.1136,
            lon: 72.8697
          },
          { 
            display_name: "Bandra, Mumbai, Maharashtra, India",
            lat: 19.0596,
            lon: 72.8295
          },
          { 
            display_name: "Colaba, Mumbai, Maharashtra, India",
            lat: 18.9067,
            lon: 72.8147
          },
          { 
            display_name: "Dadar, Mumbai, Maharashtra, India",
            lat: 19.0178,
            lon: 72.8478
          },
          { 
            display_name: "Juhu, Mumbai, Maharashtra, India",
            lat: 19.0878,
            lon: 72.8296
          }
        ].filter(item => 
          item.display_name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };
    
    const delaySearch = setTimeout(() => {
      if (searchTerm) {
        fetchSuggestions();
      }
    }, 500);
    
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);
  
  const handleLocationSelect = (location: LocationSuggestion) => {
    onLocationSelect(location);
    setSearchTerm("");
    setSuggestions([]);
    setOpen(false);
  };
  
  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground"
            role="combobox"
            aria-expanded={open}
          >
            <Search className="mr-2 h-4 w-4" />
            {searchTerm ? searchTerm : "Search for a location..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full max-w-[400px]" align="start">
          <Command>
            <CommandInput 
              placeholder="Search Mumbai locations..." 
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <p>Searching locations...</p>
                </div>
              ) : (
                <>
                  <CommandEmpty>No locations found</CommandEmpty>
                  <CommandGroup heading="Locations">
                    {suggestions.map((location, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => handleLocationSelect(location)}
                        className="flex items-center"
                      >
                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                        {location.display_name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSearch;
