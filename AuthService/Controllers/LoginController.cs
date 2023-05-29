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
    [Route("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest request)
    {
        var user = await _lgsvr.Authenticate(request);
        if (user == null)
            return BadRequest(new { message = "Username or password is incorrect" });
        return Ok(user);
    }
    
    }
}
