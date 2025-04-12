using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using dotnetapp.Exceptions;
using Microsoft.EntityFrameworkCore;


namespace dotnetapp.Services
{
public class CookingClassRequestService
{
    private readonly ApplicationDbContext _context;

    public CookingClassRequestService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CookingClassRequest>> GetAllCookingClassRequests()
    {
        return await _context.CookingClassRequests.Include(a => a.User).ToListAsync();
    }

    public async Task<IEnumerable<CookingClassRequest>> GetCookingClassRequestsByUserId(int userId)
    {
        return await _context.CookingClassRequests.Where(b => b.UserId == userId).ToListAsync();
    }

    public async Task<bool> AddCookingClassRequest(CookingClassRequest request)
    {
        var res = await _context.CookingClassRequests.FirstOrDefaultAsync(c => c.CookingClassId == request.CookingClassId && c.UserId == request.UserId);

        if (res != null)
        {
            throw new InvalidOperationException("User has already requested this cooking class.");
        }

        _context.CookingClassRequests.Add(request);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateCookingClassRequest(int requestId, CookingClassRequest updatedRequest)
    {
        var res = await _context.CookingClassRequests.FindAsync(requestId);

        if (res == null)
        {
            return false;
        }

        res.CookingClassId = updatedRequest.CookingClassId;
        res.UserId = updatedRequest.UserId;
        res.User = updatedRequest.User;
        res.CookingClassId=updatedRequest.CookingClassId;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteCookingClassRequest(int requestId)
    {
        var res = await _context.CookingClassRequests.FindAsync(requestId);

        if (res == null)
        {
            return false;
        }

        _context.CookingClassRequests.Remove(res);
        await _context.SaveChangesAsync();
        return true;
    }
}

}
//xy