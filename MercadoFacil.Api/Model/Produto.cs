using MercadoFacil.Api.Model.Enum;

namespace MercadoFacil.Api.Model
{
    public class Produto
    {
        public int ProdutoId { get; set; }
        public string Descricao { get; set; }
        public byte[] Imagem { get; set; }
        public SecaoEnum Secao { get; set; }
        public UnidadeEnum Tipo { get; set; }
    }
}
