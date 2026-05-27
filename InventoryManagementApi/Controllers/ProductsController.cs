using InventoryManagementApi.Models;
using InventoryManagementApi.Models.DTOs;
using InventoryManagementApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductService service, ILogger<ProductsController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResponse<ProductDto>>> GetProducts(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 5,
            [FromQuery] string? sortBy = "name",
            [FromQuery] string? sortDirection = "asc"
        )
        {
            sortBy ??= "name";
            sortDirection ??= "asc";
            _logger.LogInformation(
                "Fetching page {Page} size {Size} sort {SortBy} {Dir}",
                pageNumber,
                pageSize,
                sortBy,
                sortDirection
            );

            if (pageNumber < 1)
            {
                pageNumber = 1;
            }

            if (pageSize < 1)
            {
                pageSize = 5;
            }

            var allowedSort = new[] { "name", "price", "quantity" };
            if (!allowedSort.Contains(sortBy.ToLower()))
            {
                sortBy = "name";
            }

            var allowedDir = new[] { "asc", "desc" };
            if (!allowedDir.Contains(sortDirection.ToLower()))
            {
                sortDirection = "asc";
            }

            return Ok(await _service.GetAllAsync(pageNumber, pageSize, sortBy, sortDirection));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var dto = await _service.GetByIdAsync(id);
            if (dto is null)
            {
                return NotFound(new { message = $"Product {id} not found." });
            }

            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> PostProduct(Product product)
        {
            var dto = await _service.CreateAsync(product);
            return CreatedAtAction(nameof(GetProduct), new { id = dto.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            try
            {
                await _service.UpdateAsync(id, product);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            _logger.LogInformation("Deleting product {Id}", id);
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
