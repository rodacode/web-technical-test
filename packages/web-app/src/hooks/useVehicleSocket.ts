import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Vehicle } from "../types";
interface ServerToClientEvents {
  vehicle: (vehicle: Vehicle) => void;
  vehicles: (vehicles: Vehicle[]) => void;
}

export function useVehicleSocket() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const socketRef = useRef<Socket<ServerToClientEvents>>();

  useEffect(() => {
    socketRef.current = io('http://localhost:3000', {
      autoConnect: false,
    });

    const socket = socketRef.current;

    socket.on('vehicle', (vehicle) => {
      setVehicles((prevVehicles) => {
        const vehicleIndex = prevVehicles.findIndex((v) => v.id === vehicle.id);

        if (vehicleIndex !== -1) {
          return [
            ...prevVehicles.slice(0, vehicleIndex),
            vehicle,
            ...prevVehicles.slice(vehicleIndex + 1),
          ];
        }

        return [
          ...prevVehicles,
          vehicle,
        ];
      });
    });

    socket.on('vehicles', (newVehicles) => {
      setVehicles(newVehicles);
    });

    socket.connect();

    return () => {
      socket.off('vehicle');
      socket.off('vehicles');
      socket.disconnect();
    };
  }, []);

  return { vehicles };
}