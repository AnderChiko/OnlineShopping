using Microsoft.Extensions.DependencyInjection;
using OnlineShopping.Core.Exceptions;
using OnlineShopping.Interfaces.Data;
using OnlineShopping.Models.Data;
using OnlineShopping.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace OnlineShopping.Core.Tests.Functional.Data
{
    public class UserManagerTests : TestHarnessBase
    {

        private User testUser = new User()
        {
            EmailAddress = "chikoanderson@gmail.com",
            Password = "ander",// wrong password
            Id = 0
        };

        public UserManagerTests()
        {
            _services.AddCore();
            _services.AddDALServices();

            ReBuildServices();
        }



        [Fact]
        public void RegisterUser()
        {
            var result = RunInScope<IUserManager, User>(
                    (IUserManager instance, IServiceScope scope) =>
                    {
                        var results = instance.Create(testUser).Result;
                        return results;
                    });
            Assert.NotEqual(0,result.Id);

            Assert.Equal(testUser.EmailAddress, result.EmailAddress);
        }

        [Fact]
        public void ThrowExeptionWhenRegisterUserWhichAlreadyExists()
        {
            var result = RunInScope<IUserManager, CoreException>(
                     (IUserManager instance, IServiceScope scope) =>
                    {
                        var ex = Assert.Throws<CoreException>(() =>  instance.Create(testUser).Result);
                        
                        return ex;
                    });

            Assert.IsType<CoreException>(result);
            Assert.Equal("E-mail already registered.", result.Message);
        }

    }
}
