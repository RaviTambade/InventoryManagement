using System.Collections;
using System.Net.Http.Headers;
using AuthService.Models;
namespace AuthService.Repositories.Interfaces;
public interface ILoginRepository
{
    public bool Login(Credential credential);
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest request);
}