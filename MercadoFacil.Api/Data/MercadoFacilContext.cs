using MercadoFacil.Api.Model;
using Microsoft.EntityFrameworkCore;

namespace MercadoFacil.Api.Data
{
    public class MercadoFacilContext : DbContext
    {
        public MercadoFacilContext(DbContextOptions<MercadoFacilContext> options)
            : base(options)
        {
        }

        public DbSet<ListaCompra> ListaCompra { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
