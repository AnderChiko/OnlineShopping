using OnlineShopping.Models.Data;
using OnlineShopping.Models.Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Data
{
    public interface IUserManager : ICrudManager<User,  long> 
    {
        Task<User> Login(string emailaddress, string password);
    }
}
