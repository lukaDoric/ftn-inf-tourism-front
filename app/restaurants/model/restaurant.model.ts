import { User } from "../../users/model/user.model";
import { Meal } from "./meal.model";

export interface Restaurant {
  id?: number;
  name: string;
  description: string;
  capacity: number;
  imgURL: string;
  latitude: number;
  longitude: number;
  status: string;
  owner: User;
  ownerId: number;
  meals: Meal[];
}
