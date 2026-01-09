using MercadoFacil.Api.Model.Response;
using MercadoFacil.Api.Model.ViewModel;
using MercadoFacil.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MercadoFacil.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoService _produtoService;

        public ProdutoController(ProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> PostProduto([FromBody] ICollection<ProdutoViewModel> produtoRequest)
        {
            var sucesso = await _produtoService.CadastrarProdutos(produtoRequest);
            if (sucesso)
                return Ok(new { success = true, message = "Produtos salvos com sucesso." });
            else
                return BadRequest(new { success = false, message = "Não foi possível salvar os produtos." });
        }

        [HttpGet("buscar")]
        public async Task<ActionResult<IEnumerable<ProdutoResponse>>> GetProdutos()
        {
            var produtos = await _produtoService.BuscarProdutos();
            return Ok(produtos);
        }
    }
}
