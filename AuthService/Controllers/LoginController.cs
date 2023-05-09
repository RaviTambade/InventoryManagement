using AuthService.Models;
using AuthService.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _lgsvr;
        
        public LoginController(ILoginService lgsvr)
        {
            _lgsvr = lgsvr;
        }

   
        [HttpPost]
        [Route("Login")]
        public bool Login([FromBody] Credential credential)
        {
            bool status =  false;
            return status;
        }

    }
}