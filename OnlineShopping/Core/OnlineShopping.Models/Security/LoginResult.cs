﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Models.Security
{
    public class LoginResult
    {
        public string Token { get; set; }

        public DateTime? ExpireDateTime { get; set; }
    }
}
