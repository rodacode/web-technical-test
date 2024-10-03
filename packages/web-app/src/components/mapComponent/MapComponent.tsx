import React, { useMemo } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point} from '@turf/helpers';
import VehicleMarker from '../vehicleMarker/VehicleMarker';
import VehiclePopup from '../vehiclePopup/VehiclePopup';
import ZoneLayer from '../zoneLayer/ZoneLayer';
import barcelonaZones from '../../assets/zones/barcelona.json';
import { useVehicleContext } from '../../contexts/VechicleContext';
import { Feature, Polygon, MultiPolygon,FeatureCollection, Geometry, GeoJsonProperties  } from 'geojson';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ3VpZ3VpbGxlIiwiYSI6ImNtMHdrcjV4ZTAzMG8yaXF2ZnVjbGtpbWkifQ.JOqHUo__6O4vi7K_L8kajQ';

function MapComponent() {
  const { vehicles, selectedVehicle, setSelectedVehicle } = useVehicleContext();

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      if (vehicle.status === 'DISABLED') return false;
      const vehiclePoint = point([vehicle.lng, vehicle.lat]);
      return barcelonaZones.features.some(feature => 
        booleanPointInPolygon(vehiclePoint, feature as Feature<Polygon | MultiPolygon>)
      );
    });
  }, [vehicles]);

  const markers = useMemo(() => (
    filteredVehicles.map((vehicle) => (
      <Marker
        key={vehicle.id}
        latitude={vehicle.lat}
        longitude={vehicle.lng}
      >
        <VehicleMarker 
          vehicle={vehicle}
          isSelected={selectedVehicle?.id === vehicle.id}
          onClick={() => setSelectedVehicle(selectedVehicle?.id === vehicle.id ? null : vehicle)}
        />
      </Marker>
    ))
  ), [filteredVehicles, selectedVehicle, setSelectedVehicle]);

  return (
      <div className="w-full h-screen">
        <Map
          initialViewState={{
            latitude: 41.3851,
            longitude: 2.1734,
            zoom: 13
          }}
          style={{ width: '100%', height: '100%', position: 'relative' }}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <ZoneLayer zoneData={barcelonaZones as FeatureCollection<Geometry, GeoJsonProperties>} />
          {markers}
          {selectedVehicle && (
            <VehiclePopup
              vehicle={selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
            />
          )}
        </Map>
      </div>
  );
}

export default React.memo(MapComponent);