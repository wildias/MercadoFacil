using MercadoFacil.Api.Data;
using MercadoFacil.Api.Model;
using MercadoFacil.Api.Model.Enum;
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
                        Tipo = Enum.Parse<UnidadeEnum>(item.Tipo),
                        Secao = Enum.Parse<SecaoEnum>(item.Secao),
                        Imagem = ImagemUtil.ComprimirImagemBase64ParaBytes(item.Imagem)
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
    }
}
