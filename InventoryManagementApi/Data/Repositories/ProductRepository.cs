using InventoryManagementApi.Data.Interfaces;
using InventoryManagementApi.Models;
using InventoryManagementApi.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementApi.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResponse<ProductDto>> GetAllAsync(
        int pageNumber,
        int pageSize,
        string sortBy = "name",
        string sortDirection = "asc"
    )
    {
        var query = _context.Products.AsNoTracking();

        query = (sortBy?.ToLower(), sortDirection?.ToLower()) switch
        {
            ("name", "asc") => query.OrderBy(p => p.Name),
            ("name", "desc") => query.OrderByDescending(p => p.Name),
            ("price", "asc") => query.OrderBy(p => p.Price),
            ("price", "desc") => query.OrderByDescending(p => p.Price),
            ("quantity", "asc") => query.OrderBy(p => p.Quantity),
            ("quantity", "desc") => query.OrderByDescending(p => p.Quantity),
            _ => query.OrderBy(p => p.Name),
        };

        var totalItems = await query.CountAsync();

        var productEntities = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var items = productEntities
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Quantity = p.Quantity,
                CreatedDate = p.CreatedDate,
            })
            .ToList();

        return new PagedResponse<ProductDto>
        {
            Items = items,
            TotalItems = totalItems,
            PageNumber = pageNumber,
            PageSize = pageSize,
            SortBy = sortBy,
            SortDirection = sortDirection,
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
        {
            _context.Products.Remove(product);
        }
    }

    public async Task<bool> SaveChangesAsync() => (await _context.SaveChangesAsync()) > 0;
}
