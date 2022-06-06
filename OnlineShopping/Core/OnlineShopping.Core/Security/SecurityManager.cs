using OnlineShopping.Interfaces.Data;
using OnlineShopping.Interfaces.Security;
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

        public Task<ApiResponse<LoginResult>> Login(Login login)
        {
            //encrypt incoming password
            var encryptedPassword = _encryptionManager.EncryptPassword(login.Password);

            // update the model password 
            login.Password = encryptedPassword;

            // call data access with encrypted password
            //var user = this._userManager.Get()

            throw new NotImplementedException();
        }
    }
}
