using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineShopping.Models.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Extensions
{
    public static class SecurityExtensions
    {
        public static TokenProviderOptions ToTokenProviderOptions(this IOptions<TokenProviderOptions> options)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(options.Value.SecretPassword));

            var tokenProviderOptions = new TokenProviderOptions
            {
                Audience = options.Value.Audience,
                Expiration = options.Value.Expiration,
                Issuer = options.Value.Issuer,
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            };

            return tokenProviderOptions;
        }

    }
}
