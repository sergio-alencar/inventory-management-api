// InventoryManagementApi/Data/Interfaces/IProductRepository.cs

using InventoryManagementApi.Models;

namespace InventoryManagementApi.Data.Interfaces;

public interface IProductRepository
{
    Task<PagedResponse<Product>> GetAllAsync(int pageNumber, int pageSize);
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> SaveChangesAsync();
}
