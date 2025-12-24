// InventoryManagementApi/Controllers/ProductsController.cs

using InventoryManagementApi.Models;
using InventoryManagementApi.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductRepository repository, ILogger<ProductsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResponse<Product>>> GetProducts(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 5
        )
        {
            _logger.LogInformation("Fetching page {Page} with {Size} items.", pageNumber, pageSize);

            if (pageNumber < 1)
            {
                pageNumber = 1;
            }

            if (pageSize < 1)
            {
                pageSize = 5;
            }

            var pagedData = await _repository.GetAllAsync(pageNumber, pageSize);
            return Ok(pagedData);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _repository.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {id} not found." });
            }

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            product.Id = 0;
            product.CreatedDate = DateTime.Now;

            await _repository.AddAsync(product);
            var success = await _repository.SaveChangesAsync();

            if (!success)
            {
                return BadRequest(new { message = "Error saving product." });
            }

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest("IDs do not match.");
            }

            try
            {
                await _repository.UpdateAsync(product);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            _logger.LogInformation("Trying to delete product ID: {Id}", id);

            var product = await _repository.GetByIdAsync(id);
            if (product == null)
            {
                _logger.LogWarning("Failed to delete: Product {Id} not found.", id);
                return NotFound();
            }

            await _repository.DeleteAsync(id);
            await _repository.SaveChangesAsync();

            _logger.LogInformation("Product {Id} successfully deleted.", id);
            return NoContent();
        }
    }
}
