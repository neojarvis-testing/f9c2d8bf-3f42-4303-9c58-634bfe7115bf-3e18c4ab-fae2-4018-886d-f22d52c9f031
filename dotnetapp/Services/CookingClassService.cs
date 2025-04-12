using dotnetapp.Data;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Exceptions;
namespace dotnetapp.Services
{
    public class CookingClassService
    {
        private readonly ApplicationDbContext _context;
        public CookingClassService(ApplicationDbContext context)
        {
            _context = context;
        }
        // Retrieves all cooking classes from the database.
        public async Task<IEnumerable<CookingClass>> GetAllCookingClasses()
        {
            return await _context.CookingClasses.ToListAsync();
        }
        // Retrieves a cooking class by its ID.
        public async Task<CookingClass> GetCookingClassById(int cookingId)
        {
            return await _context.CookingClasses.FindAsync(cookingId);
        }
        // Adds a new cooking class if it does not already exist.
        public async Task<bool> AddCookingClass(CookingClass cooking)
        {
            var existingClass = await _context.CookingClasses
                .FirstOrDefaultAsync(c => c.ClassName == cooking.ClassName);
            if (existingClass != null)
            {
                throw new CookingClassException("Cooking class with the same name already exists");
            }
            _context.CookingClasses.Add(cooking);
            await _context.SaveChangesAsync();
            return true;
        }
        // Updates an existing cooking class.
        public async Task<bool> UpdateCookingClass(int cookingId, CookingClass cooking)
        {
            var existingClass = await _context.CookingClasses.FindAsync(cookingId);
            if (existingClass == null) return false;
            var duplicateClass = await _context.CookingClasses
                .FirstOrDefaultAsync(c => c.ClassName == cooking.ClassName && c.CookingClassId != cookingId);
            if (duplicateClass != null)
            {
                throw new CookingClassException("Cooking class with the same name already exists");
            }
            existingClass.ClassName = cooking.ClassName;
            existingClass.CuisineType = cooking.CuisineType;
            existingClass.ChefName = cooking.ChefName;
            existingClass.Location = cooking.Location;
            existingClass.DurationInHours = cooking.DurationInHours;
            existingClass.Fee = cooking.Fee;
            existingClass.IngredientsProvided = cooking.IngredientsProvided;
            existingClass.SkillLevel = cooking.SkillLevel;
            existingClass.SpecialRequirements = cooking.SpecialRequirements;
            await _context.SaveChangesAsync();
            return true;
        }
        // Deletes a cooking class if it is not referenced in any requests.
        public async Task<bool> DeleteCookingClass(int cookingId)
        {
            var cookingClass = await _context.CookingClasses.FindAsync(cookingId);
            if (cookingClass == null) return false;
            var referencedRequests = await _context.CookingClassRequests
                .AnyAsync(r => r.CookingClassId == cookingId);
            if (referencedRequests)
            {
                throw new CookingClassException("Cooking class cannot be deleted as it is referenced in a request.");
            }
            _context.CookingClasses.Remove(cookingClass);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}