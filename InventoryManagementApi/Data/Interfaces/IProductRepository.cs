// InventoryManagementApi/Data/Interfaces/IProductRepository.cs

using InventoryManagementApi.Models;

namespace InventoryManagementApi.Data.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(ProductHeaderValue product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> SaveChangesAsync();
}
