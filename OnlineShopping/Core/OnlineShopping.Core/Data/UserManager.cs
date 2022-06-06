
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
            //user.Salt = _encryptionManager.GetRandomSalt();
            //var encryptedPassword = _encryptionManager.HashPassword(user.Salt, user.Password);
            //user.Password = encryptedPassword;

            // encrypt db password field
            user.Password = _encryptionManager.EncryptPassword(user.Password);

            using (var dbContext = GetDbContext())
            {
                dbContext.Entry(user).State = EntityState.Added;
                await dbContext.SaveChangesAsync();
                return user;
            }
        }
    }
}
