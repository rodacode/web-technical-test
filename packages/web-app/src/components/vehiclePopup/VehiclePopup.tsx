import React, { useState, useEffect } from 'react';
import { Popup } from 'react-map-gl';
import { Vehicle } from '../../hooks/useVehicleSocket';
import StatusLabel from '../statusLabel/StatusLabel';

interface VehiclePopupProps {
    vehicle: Vehicle;
    onClose: () => void;
}

const VehiclePopup: React.FC<VehiclePopupProps> = ({ vehicle, onClose }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const popupContent = (
        <div className="flex flex-col justify-start rounded-xl border border-gray-200 overflow-hidden bg-white">
            <div className="flex flex-row justify-start items-center border-b border-gray-200 p-2.5">
                <img 
                    src="/scooter_illustration.png" 
                    alt="scooter image" 
                    className="h-13 w-18 mr-2.5"
                />
                <div className="flex flex-col justify-start items-start">
                    <h3 className="text-lg leading-5 font-inter font-semibold mb-1">
                        {vehicle.name}
                    </h3>
                    <StatusLabel status={vehicle.status} />
                </div>
            </div>
            <div className={`flex ${isMobile ? 'flex-row justify-between' : 'flex-col'} p-2.5 px-3`}>
                <p className="text-base font-inter">
                    Plate: <strong>{vehicle.plate_number?.toUpperCase()}</strong>
                </p>
                <p className="text-base font-inter">
                    Battery: <strong>{vehicle.battery?.toFixed(2)}%</strong>
                </p>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-50">
                {popupContent}
            </div>
        );
    }

    return (
        <Popup
            latitude={vehicle.lat}
            longitude={vehicle.lng}
            onClose={onClose}
            closeOnClick={false}
            anchor="top"
            className="z-10"
        >
            {popupContent}
        </Popup>
    );
};

export default React.memo(VehiclePopup);