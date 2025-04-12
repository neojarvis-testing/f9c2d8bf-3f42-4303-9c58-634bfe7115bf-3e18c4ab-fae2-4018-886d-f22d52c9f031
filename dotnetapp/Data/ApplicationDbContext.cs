using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;



namespace dotnetapp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base(){}

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options): base(options) {}

        public DbSet<CookingClass>CookingClasses {get;set;}

        public DbSet<CookingClassRequest>CookingClassRequests {get;set;}

        public DbSet<Feedback>Feedbacks {get;set;}

        public DbSet<User>Users {get;set;}

        




    }
}