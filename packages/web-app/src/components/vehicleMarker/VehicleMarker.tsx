import React from 'react';
import { Vehicle } from '../../hooks/useVehicleSocket';

interface VehicleMarkerProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onClick: () => void;
}

const VehicleMarker: React.FC<VehicleMarkerProps> = ({ vehicle, isSelected, onClick }) => {
  const getMarkerColor = () => {
    switch (vehicle.status) {
      case 'AVAILABLE':
        return 'bg-orange-500';
      case 'BOOKED':
        return 'bg-black';
      case 'MAINTENANCE':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div 
      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${getMarkerColor()} ${isSelected ? 'ring-4 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="w-4 h-4 rounded-full bg-white" />
    </div>
  );
};

export default React.memo(VehicleMarker);