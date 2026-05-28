using AutoMapper;
using FluentAssertions;
using InventoryManagementApi.Data.Interfaces;
using InventoryManagementApi.Models;
using InventoryManagementApi.Models.DTOs;
using InventoryManagementApi.Services.Implementations;
using Moq;
using Xunit;

namespace InventoryManagementApi.Tests.Services;

public class ProductServiceTests
{
    private readonly Mock<IProductRepository> _repositoryMock;
    private readonly IMapper _mapper;
    private readonly ProductService _service;

    public ProductServiceTests()
    {
        _repositoryMock = new Mock<IProductRepository>();

        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfile>();
        });
        _mapper = config.CreateMapper();

        _service = new ProductService(_repositoryMock.Object, _mapper);
    }

    // --- GetAllAsync ---
    [Fact]
    public async Task GetAllAsync_ShouldReturnPagedResponse()
    {
        var products = new List<Product>
        {
            new()
            {
                Id = 1,
                Name = "Test",
                Price = 10,
                Quantity = 5,
            },
            new()
            {
                Id = 2,
                Name = "Test 2",
                Price = 20,
                Quantity = 10,
            },
        };
        var pagedResponse = new PagedResponse<ProductDto>
        {
            Items = _mapper.Map<List<ProductDto>>(products),
            TotalItems = 2,
            PageNumber = 1,
            PageSize = 5,
            SortBy = "name",
            SortDirection = "asc",
        };

        _repositoryMock.Setup(r => r.GetAllAsync(1, 5, "name", "asc")).ReturnsAsync(pagedResponse);

        var result = await _service.GetAllAsync(1, 5, "name", "asc");

        result.Should().NotBeNull();
        result.Items.Should().HaveCount(2);
        result.TotalItems.Should().Be(2);
    }

    // --- GetByIdAsync ---
    [Fact]
    public async Task GetByIdAsync_ShouldReturnProductDto_WhenProductExists()
    {
        var product = new Product
        {
            Id = 1,
            Name = "Test",
            Price = 10,
            Quantity = 5,
        };
        _repositoryMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(product);

        var result = await _service.GetByIdAsync(1);

        result.Should().NotBeNull();
        result!.Id.Should().Be(1);
        result.Name.Should().Be("Test");
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnNull_WhenProductNotFound()
    {
        _repositoryMock.Setup(r => r.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((Product?)null);

        var result = await _service.GetByIdAsync(999);

        result.Should().BeNull();
    }

    // --- CreateAsync ---
    [Fact]
    public async Task CreateAsync_ShouldReturnProductDto_WhenProductIsCreated()
    {
        // Arrange
        var newProduct = new Product
        {
            Id = 0,
            Name = "New Product",
            Description = "Desc",
            Price = 15.5m,
            Quantity = 10,
        };

        _repositoryMock
            .Setup(r => r.AddAsync(It.IsAny<Product>()))
            .Callback<Product>(p => p.Id = 100); // simula ID gerado

        _repositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

        // Act
        var result = await _service.CreateAsync(newProduct);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(100);
        result.Name.Should().Be("New Product");
        result.Price.Should().Be(15.5m);
        result.Quantity.Should().Be(10);

        _repositoryMock.Verify(r => r.AddAsync(It.IsAny<Product>()), Times.Once);
        _repositoryMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }

    // --- UpdateAsync ---
    [Fact]
    public async Task UpdateAsync_ShouldUpdateProduct_WhenValid()
    {
        // Arrange
        var existingProduct = new Product
        {
            Id = 1,
            Name = "Old Name",
            Price = 10m,
            Quantity = 5,
        };

        var updatedProduct = new Product
        {
            Id = 1,
            Name = "New Name",
            Price = 20m,
            Quantity = 15,
            Description = "Updated",
        };

        _repositoryMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existingProduct);

        _repositoryMock
            .Setup(r => r.UpdateAsync(It.IsAny<Product>()))
            .Callback<Product>(p =>
            {
                // simula a atualização do repositório (na vida real, o EF faria isso)
                existingProduct.Name = p.Name;
                existingProduct.Price = p.Price;
                existingProduct.Quantity = p.Quantity;
            });

        // Act
        await _service.UpdateAsync(1, updatedProduct);

        // Assert
        existingProduct.Name.Should().Be("New Name");
        existingProduct.Price.Should().Be(20m);
        existingProduct.Quantity.Should().Be(15);
        _repositoryMock.Verify(r => r.UpdateAsync(It.IsAny<Product>()), Times.Once);
    }

    [Fact]
    public async Task UpdateAsync_ShouldThrowArgumentException_WhenIdsDoNotMatch()
    {
        var product = new Product { Id = 2 };

        Func<Task> act = async () => await _service.UpdateAsync(1, product);

        await act.Should().ThrowAsync<ArgumentException>().WithMessage("IDs do not match.");
    }

    [Fact]
    public async Task UpdateAsync_ShouldThrowKeyNotFoundException_WhenProductDoesNotExist()
    {
        _repositoryMock.Setup(r => r.GetByIdAsync(It.IsAny<int>())).ReturnsAsync((Product?)null);

        var product = new Product { Id = 999 };

        Func<Task> act = async () => await _service.UpdateAsync(999, product);

        await act.Should().ThrowAsync<KeyNotFoundException>().WithMessage("Product 999 not found.");
    }

    // --- DeleteAsync ---
    [Fact]
    public async Task DeleteAsync_ShouldCallDeleteAndSaveChanges()
    {
        // Arrange
        _repositoryMock.Setup(r => r.DeleteAsync(It.IsAny<int>()));
        _repositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

        // Act
        await _service.DeleteAsync(1);

        // Assert
        _repositoryMock.Verify(r => r.DeleteAsync(1), Times.Once);
        _repositoryMock.Verify(r => r.SaveChangesAsync(), Times.Once);
    }
}
