// InventoryManagementApi/Data/Repositories/ProductRepository.cs

using InventoryManagementApi.Models;
using InventoryManagementApi.Data.Interfaces;
using InventoryManagementApi.Data;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementApi.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResponse<Product>> GetAllAsync(int pageNumber, int pageSize)
    {
        var totalItems = await _context.Products.CountAsync();
        var items = await _context
            .Products.OrderBy(p => p.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PagedResponse<Product>
        {
            Items = items,
            TotalItems = totalItems,
            PageNumber = pageNumber,
            PageSize = pageSize,
        };
    }

    public async Task<Product?> GetByIdAsync(int id) => await _context.Products.FindAsync(id);

    public async Task AddAsync(Product product) => await _context.Products.AddAsync(product);

    public async Task UpdateAsync(Product product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product != null)
            _context.Products.Remove(product);
    }

    public async Task<bool> SaveChangesAsync() => (await _context.SaveChangesAsync()) > 0;
}
