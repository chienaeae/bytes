'use client';

import '@arcgis/map-components/dist/components/arcgis-zoom';
import '@arcgis/map-components/components/arcgis-track';

import { StrictMode } from 'react';

export default function ArcGISMap() {
  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4">Canada Agriculture Map</h2>
      <StrictMode>
        <arcgis-map
          item-id="cb01c55697d94abca1e8f04ec294f984"
          style={{ height: '600px', width: '100%' }}
          center={[-106.3468, 56.1304]}
          zoom={3}
        >
          <arcgis-zoom position="top-left"></arcgis-zoom>
          <arcgis-track position="top-left"></arcgis-track>
        </arcgis-map>
      </StrictMode>
    </>
  );
}
