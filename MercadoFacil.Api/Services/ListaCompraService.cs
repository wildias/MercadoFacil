using MercadoFacil.Api.Data;
using MercadoFacil.Api.Model;
using MercadoFacil.Api.Model.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace MercadoFacil.Api.Services
{
    public class ListaCompraService
    {
        private readonly MercadoFacilContext _context;

        public ListaCompraService(MercadoFacilContext context)
        {
            _context = context;
        }

        internal async Task<bool> CriarListaCompra(ListaCompraViewModel request)
        {
            try
            {
                var novaLista = new ListaCompra
                {
                    Lista = request.Lista,
                };

                _context.ListaCompra.Add(novaLista);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        internal async Task<bool> AtualizarListaCompra(int idLista, ListaCompraViewModel request)
        {
            try
            {
                var lista = await _context.ListaCompra.FirstOrDefaultAsync(l => l.ListaCompraId == idLista);
                if (lista == null) return false;

                lista.Lista = request.Lista;

                _context.ListaCompra.Add(lista);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        internal async Task<bool> DeletarListaCompra(int idLista, ListaCompraViewModel request)
        {
            try
            {
                var lista = await _context.ListaCompra.FirstOrDefaultAsync(l => l.ListaCompraId == idLista);
                if (lista == null) return false;

                _context.ListaCompra.Remove(lista);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }
    }
}
