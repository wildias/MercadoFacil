using MercadoFacil.Api.Data;
using MercadoFacil.Api.Model;
using MercadoFacil.Api.Model.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace MercadoFacil.Api.Services
{
    public class UsuarioService
    {
        private readonly MercadoFacilContext _context;

        public UsuarioService(MercadoFacilContext context)
        {
            _context = context;
        }

        internal async Task<Usuario> CadastrarUsuario(UsuarioViewModel request)
        {
            try
            {
                var usuario = await _context.Usuario.FirstOrDefaultAsync(u => u.Username == request.Username);

                if (usuario != null) return null;

                var novoUsuario = new Usuario
                {
                    Username = request.Username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                    Registro = DateTime.UtcNow
                };

                _context.Usuario.Add(novoUsuario);

                await _context.SaveChangesAsync();

                return novoUsuario;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
