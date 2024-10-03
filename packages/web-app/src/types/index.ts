export interface Vehicle {
  id: number;
  name: string;
  battery: number;
  plate_number: string;
  lat: number;
  lng: number;
  status: "AVAILABLE" | "BOOKED" | "MAINTENANCE" | "DISABLED";
}