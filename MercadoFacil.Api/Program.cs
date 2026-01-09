using MercadoFacil.Api.Data;
using MercadoFacil.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://*:{port}");

var connectionString = builder.Configuration.GetConnectionString("MercadoFacilDB");

builder.Services.AddDbContext<MercadoFacilContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ListaCompraService>();
builder.Services.AddScoped<ProdutoService>();
builder.Services.AddScoped<UsuarioService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

const string CorsPolicy = "AllowFrontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed(_ => true)
    );
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler =
        System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition =
        System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MercadoFacilContext>();
    dbContext.Database.Migrate();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(CorsPolicy);

app.UseAuthentication();
app.UseAuthorization();

app.MapMethods("{*path}", new[] { "OPTIONS" }, () => Results.Ok());

app.MapControllers();

app.Run();
