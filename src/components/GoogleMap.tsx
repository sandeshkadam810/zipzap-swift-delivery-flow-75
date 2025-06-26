
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState('');
  const [map, setMap] = useState<any>(null);

  const initializeMap = () => {
    if (!window.google || !mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 28.6139, lng: 77.2090 }, // Delhi coordinates
      zoom: 13,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry.fill',
          stylers: [{ color: '#f5f5f5' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{ color: '#a2d2ff' }]
        }
      ]
    });

    // Add click listener to get coordinates
    mapInstance.addListener('click', (event: any) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log('Clicked location:', lat, lng);
      
      // Add marker at clicked location
      new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstance,
        title: 'Selected Location'
      });
    });

    setMap(mapInstance);
  };

  const loadGoogleMapsScript = () => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (apiKey) {
      loadGoogleMapsScript();
    }
  }, [apiKey]);

  if (!apiKey) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-white/20">
        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Google Maps Integration
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter your Google Maps API key to enable location services
          </p>
          <Input
            type="text"
            placeholder="Enter Google Maps API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mb-3 border-purple-200 focus:border-purple-400"
          />
          <p className="text-xs text-gray-500">
            Get your API key from{' '}
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline font-medium"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-2xl shadow-lg" />;
};

export default GoogleMap;
