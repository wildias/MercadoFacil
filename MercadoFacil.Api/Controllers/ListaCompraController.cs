using MercadoFacil.Api.Model.ViewModel;
using MercadoFacil.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace MercadoFacil.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class ListaCompraController : ControllerBase
    {
        private readonly ListaCompraService _listaCompraService;

        public ListaCompraController(ListaCompraService listaCompraService)
        {
            _listaCompraService = listaCompraService;
        }

        [HttpPost("cadastrar")]
        public async Task<IActionResult> GravarLista([FromBody] ListaCompraViewModel request)
        {
            var listaNova = await _listaCompraService.CriarListaCompra(request);

            if (listaNova)
            {
                return Ok("Lista criada com sucesso");
            }

            return BadRequest("Erro ao criar lista");
        }

        [HttpPut("{id}/atualizar")]
        public async Task<IActionResult> AtualizarLista(int id, [FromBody] ListaCompraViewModel request)
        {
            var atulizarLista = await _listaCompraService.AtualizarListaCompra(id, request);

            if (atulizarLista)
            {
                return Ok("Lista atualizada com sucesso");
            }

            return BadRequest("Erro ao atualizar lista");
        }

        [HttpDelete("{id}/deletar")]
        public async Task<IActionResult> DeletarLista(int id, [FromBody] ListaCompraViewModel request)
        {
            var deletarLista = await _listaCompraService.DeletarListaCompra(id, request);

            if (deletarLista)
            {
                return Ok("Lista deletada com sucesso");
            }

            return BadRequest("Erro ao deletar lista");
        }
    }
}
