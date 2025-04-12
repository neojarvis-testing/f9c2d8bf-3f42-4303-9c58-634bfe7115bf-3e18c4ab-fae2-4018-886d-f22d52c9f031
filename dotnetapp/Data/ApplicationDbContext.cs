using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
using dotnetapp.Models;
=======
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;

>>>>>>> f962a94e521b602a36ec2b1298a7b66d4ab6aee2


namespace dotnetapp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

<<<<<<< HEAD
        public DbSet<CookingClass> CookingClasses { get; set; }
        public DbSet<CookingClassRequest> CookingClassRequests { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<User> Users { get; set; }
=======


>>>>>>> f962a94e521b602a36ec2b1298a7b66d4ab6aee2
    }
}