import React from 'react';
import Navbar from './components/navBar/NavBar';
import MapComponent from './components/mapComponent/MapComponent';
import { VehicleProvider } from './contexts/VechicleContext';

function App() {
  return (
    <VehicleProvider>
      <div className="min-h-screen min-w-screen bg-gray-100">
        <Navbar />
          <MapComponent />
      </div>
    </VehicleProvider>
  );
}

export default App;