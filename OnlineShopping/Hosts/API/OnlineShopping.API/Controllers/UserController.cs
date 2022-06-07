using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineShopping.Core.Interfaces.Logging;
using OnlineShopping.Interfaces.Data;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Data.Users;
using OnlineShopping.Models.Http;
using System;
using System.Net;
using System.Threading.Tasks;

namespace OnlineShopping.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserManager _userManager;
        private readonly ILoggingManager<UserController> _logger;

        public UserController(IUserManager userManager, ILoggingManager<UserController> logger)
        {
            this._userManager = userManager;
            this._logger = logger;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<ApiResponse<User>>> Register([FromBody] User user)
        {
            try
            {
                var result = await _userManager.Create(user);
                return new ApiResponse<User>(HttpStatusCode.Created, result); ;
            }
            catch (Exception ex)
            {
                // application error  
                return new ApiResponse<User>(HttpStatusCode.InternalServerError,ex.Message );
            }
        }



    }
}
