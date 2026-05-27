#!/bin/bash

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Iniciando Inventory Management System...${NC}"

echo -e "${YELLOW}Verificando PostgreSQL...${NC}"
if pg_isready -q; then
    echo -e "${GREEN}PostgreSQL já está rodando${NC}"
else
    echo -e "${YELLOW}Iniciando PostgreSQL...${NC}"
    sudo systemctl start postgresql
    sleep 2
    if pg_isready -q; then
        echo -e "${GREEN}PostgreSQL iniciado${NC}"
    else
        echo -e "${RED}Falha ao iniciar PostgreSQL${NC}"
        exit 1
    fi
fi

echo -e "${YELLOW}Liberando portas...${NC}"
fuser -k 5155/tcp 2>/dev/null
fuser -k 5173/tcp 2>/dev/null

echo -e "${YELLOW}Iniciando backend (.NET)...${NC}"
cd ~/Scripts/inventory-management-api/InventoryManagementApi
/usr/bin/dotnet run &
BACKEND_PID=$!

sleep 3

echo -e "${YELLOW}Iniciando frontend (Vite)...${NC}"
cd ~/Scripts/inventory-management-api/inventory-management-ui
npm run dev &
FRONTEND_PID=$!

echo -e "${GREEN}Sistema iniciado com sucesso!${NC}"
echo -e "${BLUE}Frontend: ${GREEN}http://localhost:5173${NC}"
echo -e "${BLUE}Backend API: ${GREEN}http://localhost:5155/api/products${NC}"
echo -e "${BLUE}Swagger: ${GREEN}http://localhost:5155/swagger${NC}"
echo -e "${YELLOW}Pressione Ctrl+C para parar todos os serviços${NC}"

cleanup() {
    echo -e "${YELLOW}Parando serviços...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT

wait