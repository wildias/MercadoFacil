# ==============================
# Build
# ==============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia tudo do diretório configurado no Render (MercadoFacil.Api)
COPY . .

# Restaura e publica
RUN dotnet restore "MercadoFacil.Api.csproj"
RUN dotnet publish "MercadoFacil.Api.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


# ==============================
# Runtime
# ==============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Porta obrigatória no Render
EXPOSE 10000

# Copia os artefatos publicados
COPY --from=build /app/publish .

# Inicia a API
ENTRYPOINT ["dotnet", "MercadoFacil.Api.dll"]
