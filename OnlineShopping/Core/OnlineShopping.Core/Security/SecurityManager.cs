using OnlineShopping.Interfaces.Data;
using OnlineShopping.Interfaces.Security;
using OnlineShopping.Models.Enums;
using OnlineShopping.Models.Http;
using OnlineShopping.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Security
{
    public class SecurityManager : ISecurityManager
    {
        private readonly IEncryptionManager _encryptionManager;
        private readonly IUserManager _userManager;
        public SecurityManager(IEncryptionManager encryptionManager, IUserManager userManager) { 
        
            this._encryptionManager = encryptionManager;
            this._userManager = userManager;
        }

        public async Task<LoginResult> Login(Login login)
        {
            var response = new LoginResult();
            var user = await _userManager.Login(login.EmailAddress, login.Password);

            // to do : add more detailed response with tokens 
            if (user != null)
            {
                response.Token = Guid.NewGuid().ToString("N");
                response.ExpireDateTime = DateTime.Now.AddMinutes(5);
            }
            return response;
        }
    }
}
