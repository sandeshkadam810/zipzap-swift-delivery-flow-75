
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GoogleMap from './GoogleMap';

const LocationSelector = () => {
  const [showMap, setShowMap] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('Select Location');
  const [searchAddress, setSearchAddress] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you'd reverse geocode these coordinates
          setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          console.log('Current location:', latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.trim()) {
      setCurrentLocation(searchAddress);
      setShowMap(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 text-gray-600 cursor-pointer" onClick={() => setShowMap(!showMap)}>
        <MapPin className="h-4 w-4" />
        <span className="text-sm">Deliver to: <strong>{currentLocation}</strong></span>
      </div>

      {showMap && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border p-4 w-96 z-50">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={getCurrentLocation}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>
            </div>

            <form onSubmit={handleAddressSearch} className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your address..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="w-full"
              />
              <Button type="submit" size="sm" className="w-full">
                Set Location
              </Button>
            </form>

            <div className="h-64 rounded-lg overflow-hidden">
              <GoogleMap />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
