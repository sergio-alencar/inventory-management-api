using InventoryManagementApi.Data;
using InventoryManagementApi.Data.Interfaces;
using InventoryManagementApi.Data.Repositories;
using InventoryManagementApi.Services.Implementations;
using InventoryManagementApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("logs/inventory_logs.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var rawConnectionString =
    Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (
        !string.IsNullOrEmpty(rawConnectionString)
        && (
            rawConnectionString.StartsWith("postgres://")
            || rawConnectionString.StartsWith("postgresql://")
        )
    )
    {
        var databaseUri = new Uri(rawConnectionString);
        var userInfo = databaseUri.UserInfo.Split(':');

        var convertedConnectionString =
            $"Host={databaseUri.Host};Port={databaseUri.Port};Database={databaseUri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";

        options.UseNpgsql(convertedConnectionString);
    }
    else
    {
        options.UseNpgsql(rawConnectionString);
    }
});

builder.Services.AddScoped<IProductRepository, ProductRepository>();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173",
                    "https://inventory-management-api-vercel.vercel.app",
                    "https://inventory-management-api-vercel-824xkx6k7.vercel.app",
                    "https://inv-mgmt-api.vercel.app",
                    "https://gestaodeinventario.vercel.app"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowedToAllowWildcardSubdomains();
        }
    );
});

var app = builder.Build();

app.UseMiddleware<InventoryManagementApi.Middleware.ExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(MyAllowSpecificOrigins);

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();
app.MapControllers();
app.Run();
