using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Security
{
    public class TokenInfo
    {
        public string Provider { get; set; } = String.Empty;

        public string Token { get; set; } = String.Empty;

        public DateTime? TokenExpiration { get; set; }

        public string RefreshToken { get; set; } = String.Empty;

        public DateTime? RefreshTokenExpiration { get; set; }
    }
}
