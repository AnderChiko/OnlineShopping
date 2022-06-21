using OnlineShopping.Models.Http;
using OnlineShopping.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Security
{
    public interface ISecurityManager
    {
        Task<LoginResult> Login(Login login);
    }
}
