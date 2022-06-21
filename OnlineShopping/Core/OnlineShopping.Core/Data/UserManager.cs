
using Microsoft.EntityFrameworkCore;
using OnlineShopping.Core.BaseClasses;
using OnlineShopping.DAL;
using OnlineShopping.Interfaces.Communication;
using OnlineShopping.Interfaces.Data;
using OnlineShopping.Interfaces.Security;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Data
{
    public class UserManager :EntityFrameworkDataManagerBase<User, long, ApplicationDbContext>, IUserManager
    {
        private readonly IEmailSender _emailSender;
        private readonly IEncryptionManager _encryptionManager;
        public UserManager(IEmailSender emailSender, IServiceProvider serviceProvider, IEncryptionManager encryptionManager)
           : base(serviceProvider)
        {            
            this._emailSender = emailSender;
            this._encryptionManager = encryptionManager;
        }
               
        public async override Task<User> Create(User user)
        {           
                // to do: encrypt db password field
                // user.Password = _encryptionManager.EncryptPassword(user.Password);
                return await base.Create(user);            
        }

        public async Task<User> Login(string emailaddress, string password)
        {           
           // to do: decryptencrytedPassword = _encryptionManager.EncryptPassword(password);
            using (var dbcontext =  GetDbContext())
            {
                return await dbcontext.User.FirstOrDefaultAsync(x => x.EmailAddress == emailaddress && x.Password == password);

            }
        }
    }
}
