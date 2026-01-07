namespace MercadoFacil.Api.Model
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public DateTime Registro { get; set; }
    }
}
