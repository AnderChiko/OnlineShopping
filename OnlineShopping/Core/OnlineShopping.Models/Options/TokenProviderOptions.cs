using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Options
{
    public class TokenProviderOptions
    {
        public bool UseIdentity { get; set; }
        public string Audience { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public TimeSpan Expiration { get; set; } = TimeSpan.FromMinutes(600); // TODO: Make this pull from AppSettings
        public string SecretPassword { get; set; } = string.Empty;
        public SigningCredentials SigningCredentials { get; set; }
    }
}

