import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icons in Leaflet with React
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Destination {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

interface Route {
  id: number;
  name: string;
  destinations: Destination[];
}

const InteractiveMap: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [userPins, setUserPins] = useState<Destination[]>([]);

  useEffect(() => {
    // Fetch destinations from your backend
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/destinations/');
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newPin: Destination = {
      id: Date.now(),
      name: 'New Destination',
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
      description: 'Add your description here'
    };
    setUserPins([...userPins, newPin]);
  };

  return (
    <div className="map-container" style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Display destinations */}
        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={[destination.latitude, destination.longitude]}
            icon={icon}
          >
            <Popup>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
            </Popup>
          </Marker>
        ))}

        {/* Display user pins */}
        {userPins.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.latitude, pin.longitude]}
            icon={icon}
          >
            <Popup>
              <h3>{pin.name}</h3>
              <p>{pin.description}</p>
            </Popup>
          </Marker>
        ))}

        {/* Display routes */}
        {selectedRoute && selectedRoute.destinations.length > 1 && (
          <Polyline
            positions={selectedRoute.destinations.map(dest => [dest.latitude, dest.longitude])}
            color="blue"
          />
        )}
      </MapContainer>

      <div className="map-controls" style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
      }}>
        <h3>Map Controls</h3>
        <button onClick={() => setUserPins([])}>Clear My Pins</button>
        <div>
          <h4>Popular Routes</h4>
          {routes.map(route => (
            <button
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              style={{ margin: '5px' }}
            >
              {route.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap; 