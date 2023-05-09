using System.Collections;
using System.Threading.Tasks;
using AuthService.Models;
using AuthService.Repositories.Interfaces;
using AuthService.Services.Interfaces;
namespace AuthService.Services;
public class LoginService : ILoginService
{
    private readonly ILoginRepository _repo;
    public LoginService(ILoginRepository repo)
    {
       _repo = repo;
    }

    public bool Login(Credential credential)=> _repo.Login(credential);

}