export interface Restaurant {
  id: number;
  name: string;
  description: string;
  capacity: number;
  images: string[]; //url slike enterijera ili specijaliteta
  latitude: number;
  longitude: number;
  status?: string; //u pripremi ili otvoren
  ownerId: number;
}
