// InventoryManagementApi/Program.cs

using InventoryManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Security.Authentication.ExtendedProtection;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

long.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/inventory_logs.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(FileOptions =>
{
    FileOptions.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
        }
    );
});

builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

app.UseMiddleware<InventoryManagementApi.Middleware.ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
