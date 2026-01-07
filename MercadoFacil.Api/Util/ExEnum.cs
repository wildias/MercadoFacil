using MercadoFacil.Api.Model.Enum;

namespace MercadoFacil.Api.Util
{
    public static class ExEnum
    {
        public static string GetDescricao(this SecaoEnum secao)
        {
            return secao switch
            {
                SecaoEnum.Acougue => "Açougue",
                SecaoEnum.Hortifruti => "Hortifruti",
                SecaoEnum.Mercearia => "Mercearia",
                SecaoEnum.FriosELaticinios => "Frios e Laticínios",
                SecaoEnum.Bebidas => "Bebidas",
                SecaoEnum.Limpeza => "Limpeza",
                SecaoEnum.Higiene => "Higiene Pessoal",
                SecaoEnum.PetShop => "Pet Shop",
                SecaoEnum.Infantil => "Infantil",
                _ => secao.ToString()
            };
        }
    }
}
