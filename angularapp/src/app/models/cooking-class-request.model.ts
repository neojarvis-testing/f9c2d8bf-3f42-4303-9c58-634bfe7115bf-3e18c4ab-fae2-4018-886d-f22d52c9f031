import { CookingClass } from "./cooking-class.model"
<<<<<<< HEAD
=======

>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
export interface CookingClassRequest
{
    CookingClassRequestId?: number;
    UserId: number;
    CookingClassId: number;
    RequestDate: string;
    Status: string;
    DietaryPreferences: string;
    CookingGoals: string;
    Comments?: string;
    CookingClass?: CookingClass;
}