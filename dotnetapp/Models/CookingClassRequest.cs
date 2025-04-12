using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class CookingClassRequest
    {
        public int CookingClassRequestId{get; set;}
        public int UserId{get; set;}
        public User? User {get; set;}
        public int CookingClassId {get;set;}
    }
}