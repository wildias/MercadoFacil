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
                "Server=mysql.railway.internal;Port=3306;Database=railway;User=root;Password=XTfmFwKkbXWMlXVBnsowqNKvlyREnFai";
            //var connectionString =
            //    "Server=localhost;Database=mercadofacil;User=root;Password=ab12c3;";

            optionsBuilder.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString)
            );

            return new MercadoFacilContext(optionsBuilder.Options);
        }
    }
}
