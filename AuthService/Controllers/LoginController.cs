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

            [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest request)
        {
            var response = _lgsvr.Authenticate(request);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });
               return Ok(response);
        }
   

    }
}