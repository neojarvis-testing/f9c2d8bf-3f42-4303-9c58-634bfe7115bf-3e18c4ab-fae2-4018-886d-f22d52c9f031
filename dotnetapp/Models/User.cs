using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class User
    {
        [Key]
        public int UserId{get;set;}
        [EmailAddress]
        [Required]
        public string Email{get;set;}
        public string Password{get;set;}
        public string Username{get;set;}
        public string MobileNumber{get;set;}
        public string UserRole{get;set;}
    }
}
 