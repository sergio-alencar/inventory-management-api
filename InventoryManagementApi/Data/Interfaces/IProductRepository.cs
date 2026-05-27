using InventoryManagementApi.Models;
using InventoryManagementApi.Models.DTOs;

namespace InventoryManagementApi.Data.Interfaces;

public interface IProductRepository
{
    Task<PagedResponse<ProductDto>> GetAllAsync(
        int pageNumber,
        int pageSize,
        string sortBy = "name",
        string sortDirection = "asc"
    );
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> SaveChangesAsync();
}
