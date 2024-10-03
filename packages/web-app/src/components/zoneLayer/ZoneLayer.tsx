import React from 'react';
import { Source, Layer } from 'react-map-gl';

interface ZoneLayerProps {
  zoneData: GeoJSON.FeatureCollection;
}

const ZoneLayer: React.FC<ZoneLayerProps> = ({ zoneData }) => {
  return (
    <>
      {/* Grey background for the entire map */}
      <Source id="background" type="geojson" data={{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-180, -90],
              [180, -90],
              [180, 90],
              [-180, 90],
              [-180, -90]
            ]
          ]
        }
      }}>
        <Layer
          id="background-layer"
          type="fill"
          paint={{
            'fill-color': '#CCCCCC',
            'fill-opacity': 0.4,
          }}
        />
      </Source>

      {/* Zones layer */}
      <Source id="barcelona-zones" type="geojson" data={zoneData}>
        <Layer
          id="zone-fills"
          type="fill"
          source="barcelona-zones"
          paint={{
            'fill-color': '#FFFFFF',
            'fill-opacity': 0.1,
          }}
        />
        <Layer
          id="zone-borders"
          type="line"
          source="barcelona-zones"
          paint={{
            'line-color': 'transparent',
            'line-width': 2,
          }}
        />
      </Source>
    </>
  );
};

export default ZoneLayer;