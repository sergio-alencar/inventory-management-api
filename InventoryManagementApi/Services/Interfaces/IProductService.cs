using InventoryManagementApi.Models;
using InventoryManagementApi.Models.DTOs;

namespace InventoryManagementApi.Services.Interfaces;

public interface IProductService
{
    Task<PagedResponse<ProductDto>> GetAllAsync(
        int pageNumber,
        int pageSize,
        string sortBy,
        string sortDirection
    );
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto> CreateAsync(Product product);
    Task UpdateAsync(int id, Product product);
    Task DeleteAsync(int id);
}
