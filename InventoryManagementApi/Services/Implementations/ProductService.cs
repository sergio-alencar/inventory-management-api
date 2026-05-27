using AutoMapper;
using InventoryManagementApi.Data.Interfaces;
using InventoryManagementApi.Models;
using InventoryManagementApi.Models.DTOs;
using InventoryManagementApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementApi.Services.Implementations;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<PagedResponse<ProductDto>> GetAllAsync(
        int pageNumber,
        int pageSize,
        string sortBy,
        string sortDirection
    )
    {
        return await _repository.GetAllAsync(pageNumber, pageSize, sortBy, sortDirection);
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product is null ? null : _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto> CreateAsync(Product product)
    {
        product.Id = 0;
        product.CreatedDate = DateTime.UtcNow;
        await _repository.AddAsync(product);
        await _repository.SaveChangesAsync();
        return _mapper.Map<ProductDto>(product);
    }

    public async Task UpdateAsync(int id, Product product)
    {
        if (id != product.Id)
        {
            throw new ArgumentException("IDs do not match.");
        }

        var existing = await _repository.GetByIdAsync(id);
        if (existing is null)
        {
            throw new KeyNotFoundException($"Product {id} not found.");
        }

        existing.Name = product.Name;
        existing.Description = product.Description;
        existing.Price = product.Price;
        existing.Quantity = product.Quantity;
        await _repository.UpdateAsync(existing);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
        await _repository.SaveChangesAsync();
    }
}
