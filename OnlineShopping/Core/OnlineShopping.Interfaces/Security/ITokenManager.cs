using Microsoft.IdentityModel.Tokens;
using OnlineShopping.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Security
{
    public interface ITokenManager
    {
        void ValidateToken(string token);

        Task<TokenInfo> GetToken(string tokenProvider, string userName);

        TokenValidationParameters GetTokenValidationParameters();

        string GetClaimValueFromJwt(string token, string type);
    }
}
