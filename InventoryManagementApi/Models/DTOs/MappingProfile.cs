using AutoMapper;
using InventoryManagementApi.Models;
using InventoryManagementApi.Models.DTOs;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>();
    }
}
