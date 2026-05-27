FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["InventoryManagementApi/InventoryManagementApi.csproj", "InventoryManagementApi/"]
RUN dotnet restore "InventoryManagementApi/InventoryManagementApi.csproj"
COPY . .
WORKDIR "/src/InventoryManagementApi"
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "InventoryManagementApi.dll"]