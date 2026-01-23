using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MercadoFacil.Api.Data
{
    public class MercadoFacilContextFactory : IDesignTimeDbContextFactory<MercadoFacilContext>
    {
        public MercadoFacilContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MercadoFacilContext>();

            var connectionString =
                Environment.GetEnvironmentVariable("DATABASE_URL")
                ?? "Host=localhost;Port=5432;Database=mercadofacil;Username=postgres;Password=postgres";
            //var connectionString =
            //    "Server=localhost;Database=mercadofacil;User=root;Password=ab12c3;";

            optionsBuilder.UseNpgsql(connectionString);

            return new MercadoFacilContext(optionsBuilder.Options);
        }
    }
}
