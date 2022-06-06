using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Security
{
    public interface IEncryptionManager
    {
            /// <summary>
            /// Encrypt a password for internal use.
            /// </summary>
            /// <param name="password"></param>
            /// <returns></returns>
            string EncryptPassword(string password);

            public string HashPassword(string salt, string password);

            public string GetRandomSalt();
        }
    }
