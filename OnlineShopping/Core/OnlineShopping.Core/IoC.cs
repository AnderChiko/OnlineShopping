using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineShopping.Core.Communication;
using OnlineShopping.Core.Data;
using OnlineShopping.Core.Security;
using OnlineShopping.DAL;
using OnlineShopping.Interfaces.Communication;
using OnlineShopping.Interfaces.Data;
using OnlineShopping.Interfaces.Security;
using OnlineShopping.Interfaces.Services;
using OnlineShopping.Models.Configuration;
using OnlineShopping.Models.Constants;
using System;

namespace OnlineShopping.Core
{
    public static class IoC
    {
        /// <summary>
        /// Method to register the Core dependencies.
        /// 
        /// Transient: A new instance of the type is used every time the type is requested.
        /// 
        /// Scoped: A new instance of the type is created the first time it’s requested within
        ///			a given HTTP request, and then re - used for all subsequent types resolved
        ///			during that HTTP request.
        ///			
        /// Singleton: A single instance of the type is created once, and used by all subsequent
        ///			requests for that type.
        ///			
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddCore(this IServiceCollection services)
        {
            services.AddScoped<ISecurityManager, SecurityManager>();
            services.AddScoped<IUserManager, UserManager>();
            services.AddScoped<IOrderManager, OrderManager>();
            services.AddScoped<IProductManager, ProductManager>();
            services.AddScoped<IEncryptionManager, EncryptionManager>();
            services.AddScoped<IEmailSender, EmailSender>();
            return services;
        }

        public static IServiceCollection AddCoreConfigurationOptions(this IServiceCollection services, IConfiguration configuration)
        {
           // services.Configure<EmailServerOptionsList>(configuration.GetSection(ConfigSections.EmailServerOptionsList));
            services.AddDbContext<ApplicationDbContext>(o =>
            {
                o.UseSqlServer(configuration.GetConnectionString("OnlineShopping"));
            });
            return services;
        }
    }
}
