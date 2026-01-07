using MercadoFacil.Api.Data;

namespace MercadoFacil.Api.Services
{
    public class ProdutoService
    {
        private readonly MercadoFacilContext _context;

        public ProdutoService(MercadoFacilContext context)
        {
            _context = context;
        }
    }
}
