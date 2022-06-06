using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineShopping.Core.Extensions;
using OnlineShopping.Interfaces.Security;
using OnlineShopping.Models.Options;
using OnlineShopping.Models.Security;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Security
{
    public class TokenManager : ITokenManager
    {
        private readonly IOptions<TokenProviderOptions> _tokenProviderOptions;

        public TokenManager(IOptions<TokenProviderOptions> tokenProviderOptions)
        {
            _tokenProviderOptions = tokenProviderOptions;
        }

        public string GetClaimValueFromJwt(string token, string type)
        {
            throw new NotImplementedException();
        }

        public async Task<TokenInfo> GetToken(string tokenProvider, string userName)
        {
            var options = _tokenProviderOptions.ToTokenProviderOptions();
            var now = DateTime.Now;
            var refreshToken = Guid.NewGuid().ToString();

            var claims = new[]
           {
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Jti, await NonceGenerator()),
                new Claim(JwtRegisteredClaimNames.Iat, (new DateTimeOffset(now)).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim("UserName", userName),
                new Claim("RefreshToken", refreshToken),
                new Claim("RefreshTokenExpiration", now.AddHours(options.Expiration.TotalHours*3).ToString())
                // TODO: Implement Refresh capability.
            };



            // Create the JWT and write it to a string Pass in other items to payload portion of token
            var jwt = new JwtSecurityToken(
                issuer: options.Issuer,
                audience: options.Audience,
                claims: claims,
                notBefore: now,
                expires: now.AddHours(options.Expiration.TotalHours),
                signingCredentials: options.SigningCredentials);

            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new TokenInfo()
            {
                Provider = tokenProvider,
                Token = token,
                RefreshToken = refreshToken
            };
        }

        public TokenValidationParameters GetTokenValidationParameters()
        {
            var tokenProviderOptions = _tokenProviderOptions.ToTokenProviderOptions();
            var issuesSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_tokenProviderOptions.Value.SecretPassword));
            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = issuesSigningKey,

                ValidateIssuer = true,
                ValidIssuer = tokenProviderOptions.Issuer,

                ValidateAudience = true,
                ValidAudience = tokenProviderOptions.Audience,

                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero  // TODO: Practical might be seconds to minutes

                // RequireSignedTokens = false;
            };

            return tokenValidationParameters;
        }

        private Func<Task<string>> NonceGenerator { get; set; }
         = () => Task.FromResult(Guid.NewGuid().ToString());

        public void ValidateToken(string token)
        {
            throw new NotImplementedException();
        }
    }
}
