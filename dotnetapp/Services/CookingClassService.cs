using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class CookingClassService
    {
        private readonly ApplicationDbContext _context;

        public CookingClassService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<CookingClass>> GetAllCookingClasses()
        {
            return await _context.CookingClasses.ToListAsync();
        }

        public async Task<CookingClass> GetCookingClassById(int id)
        {
            return await _context.CookingClasses.FindAsync(id);
        }

        public async Task<bool> AddCookingClass(CookingClass newSession)
        {
            if (await _context.CookingClasses.AnyAsync(c => c.ClassName == newSession.ClassName))
            {
                return false;
            }
            _context.CookingClasses.Add(newSession);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateCookingClass(int cookingId, CookingClass updatedSession)
        {
            var existingClass = await _context.CookingClasses.FindAsync(cookingId);
            if (existingClass == null)
            {
                return false;
            }
            if (await _context.CookingClasses.AnyAsync(c => c.ClassName == updatedSession.ClassName && c.CookingClassId != cookingId))
            {
                return false;
            }
            existingClass.ClassName = updatedSession.ClassName;
            existingClass.CuisineType = updatedSession.CuisineType;
            existingClass.ChefName = updatedSession.ChefName;
            existingClass.Location = updatedSession.Location;
            existingClass.DurationInHours = updatedSession.DurationInHours;
            existingClass.Fee = updatedSession.Fee;
            existingClass.SpecialRequirements = updatedSession.IngredientsProvided;
            existingClass.SkillLevel = updatedSession.SkillLevel;
            existingClass.SpecialRequirements = updatedSession.IngredientsProvided;
            
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteCookingClass(int cookingId)
        {
            var cookingClass = await _context.CookingClasses.FindAsync(cookingId);
            if (cookingClass == null)
            {
                return false;
            }
            _context.CookingClasses.Remove(cookingClass);
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
