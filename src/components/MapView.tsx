// MapView component – no hooks required
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icons broken by bundlers (Vite / Webpack)
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

// Guntur, Andhra Pradesh coordinates — hardcoded, no permission needed
const GUNTUR: [number, number] = [16.3067, 80.4365];

export default function MapView() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden" style={{ height: '200px' }}>
      <MapContainer
        center={GUNTUR}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        style={{ height: '100%', width: '100%', background: '#0a0a0f' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CARTO"
        />
        <Marker position={GUNTUR}>
          <Popup className="leaflet-popup-dark">
            <strong>Patan Salar Khan</strong><br />Guntur, Andhra Pradesh, India
          </Popup>
        </Marker>
      </MapContainer>
      {/* Overlay gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
