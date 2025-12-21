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

        public ProductsController(IProductRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _repository.GetAllAsync();
            return Ok(products);
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
                return BadRequest(new { message = "The ID provided does not match the product ID." });
            }

            var existingProduct = await _repository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound();
            }

            await _repository.UpdateAsync(product);

            try
            {
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal error updating the data.");
            }

            return NoContent();
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