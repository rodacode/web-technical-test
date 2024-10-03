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
        return 'bg-[#F7B328]';
      case 'BOOKED':
        return 'bg-[#475467]';
      case 'MAINTENANCE':
        return 'bg-[#E1485C]';
      default:
        return 'bg-[#F7B328]';
    }
  };

  return (
    <div 
      className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${getMarkerColor()} ${isSelected ? 'ring-4 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className="w-2 h-2 rounded-full bg-white" />
    </div>
  );
};

export default React.memo(VehicleMarker);