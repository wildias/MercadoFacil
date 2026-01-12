using MercadoFacil.Api.Data;
using MercadoFacil.Api.Model;
using MercadoFacil.Api.Model.Enum;
using MercadoFacil.Api.Model.Response;
using MercadoFacil.Api.Model.ViewModel;
using MercadoFacil.Api.Util;
using static System.Net.Mime.MediaTypeNames;

namespace MercadoFacil.Api.Services
{
    public class ProdutoService
    {
        private readonly MercadoFacilContext _context;

        public ProdutoService(MercadoFacilContext context)
        {
            _context = context;
        }

        internal async Task<bool> CadastrarProdutos(ICollection<ProdutoViewModel> request)
        {
            try
            {
                if (request == null || request.Count == 0 || request.Count > 300)
                    return false;

                foreach (var item in request)
                {
                    var novoProduto = new Produto
                    {
                        Descricao = item.Descricao,
                        Secao = Enum.Parse<SecaoEnum>(item.Secao),
                        Imagem = item.Imagem != null ? ImagemUtil.ComprimirImagemBase64ParaBytes(item.Imagem) : null
                    };

                    await _context.Produto.AddAsync(novoProduto);
                }

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }
        }

        internal async Task<ICollection<ProdutoResponse>> BuscarProdutos()
        {
            try
            {
                var prods = _context.Produto
                    .Select(p => new ProdutoResponse
                    {
                        ProdutoId = p.ProdutoId,
                        Descricao = p.Descricao,
                        Imagem = p.Imagem == null ? null : ImagemUtil.DescomprimirImagemParaBase64(p.Imagem),
                        Secao = p.Secao.ToString(),
                    })
                    .ToList();

                return prods;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
    }
}
