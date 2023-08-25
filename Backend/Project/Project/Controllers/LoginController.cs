using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project.Helper.Authorize;
using Project.Models;
using Project.Models.Authorize;
using Project.Models.Response;
using Project.Repository;

namespace Project.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        
    }
}
