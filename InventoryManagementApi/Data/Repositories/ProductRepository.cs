// InventoryManagementApi/Data/Repositories/ProductRepository.cs

using InventoryManagementApi.Models;
using InventoryManagementApi.Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementApi.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllAsync() => await _context.Products.ToListAsync();

    public async Task<Product?> GetByIdAsync(int id) => await _context.Products.FindAsync(id);

    public async Task AddAsync(Product product) => await _context.Products.AddAsync(product);

    public async Task UpdateAsync(Product product) => _context.Entry(product).State = EntityState.Modified;

    public async Task DeleteAsync(int id)
    {
        var product = await _context.Product.FindAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
        }
    }

    public async Task<bool> SaveChangesAsync() => (await _context.SaveChangesAsync()) > 0;
}
