﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineShopping.Interfaces.Security;
using OnlineShopping.Models.Enums;
using OnlineShopping.Models.Http;
using OnlineShopping.Models.Security;
using System;
using System.Net;
using System.Threading.Tasks;

namespace OnlineShopping.API.Controllers
{
    [ApiController]

    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ISecurityManager _securityManager;
        private readonly ILogger<LoginController> _logger;
        public LoginController( ISecurityManager securityManager, ILogger<LoginController> logger)
        {           
            this._securityManager = securityManager;
            this._logger = logger;
        }

        [HttpPost()]
        public async Task<ActionResult<ApiResponse<LoginResult>>> Login([FromBody] Login login)
        {
            try
            {
                var result = await _securityManager.Login(login);

                if (result.Status != Status.Success)
                    return Unauthorized(result);
                else
                    return result;
            }
            catch (Exception ex)
            {  
              // application error  
              return new ApiResponse<LoginResult>(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



    }
}
