export interface CookingClassRequest
{
    CookingClassRequestId?:number
    UserId:number
    CookingClassId:number
    RequestDate:string
    Status:string
    DietaryPreferences:string
    CookingGoals:string
    Comments?:string
}