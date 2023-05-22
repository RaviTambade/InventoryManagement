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
        public IActionResult Authenticate(User user)
        {
            var response = _lgsvr.Authenticate(user);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });
               return Ok(response);
        }
   
        [HttpPost]
        [Route("Login")]
        public bool Login([FromBody] Credential credential)
        {
            bool status = _lgsvr.Login(credential);
            return status;
        }

    }
}