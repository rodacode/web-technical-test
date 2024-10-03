import React, { createContext, useContext, useState, useMemo } from 'react';
import { Vehicle, useVehicleSocket } from '../hooks/useVehicleSocket';

interface VehicleContextType {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { vehicles } = useVehicleSocket();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const sortedVehicles = useMemo(() => 
    [...vehicles].sort((a, b) => a.name.localeCompare(b.name)),
    [vehicles]
  );

  const value = useMemo(() => ({
    vehicles: sortedVehicles,
    selectedVehicle,
    setSelectedVehicle
  }), [sortedVehicles, selectedVehicle]);

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicleContext must be used within a VehicleProvider');
  }
  return context;
};
