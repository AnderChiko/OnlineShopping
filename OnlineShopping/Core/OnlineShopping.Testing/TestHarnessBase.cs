using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OnlineShopping.Core;
using System;
using System.IO;
using Xunit;

namespace OnlineShopping.Testing
{
    public abstract class TestHarnessBase
    {
        protected IConfiguration _configuration;
        protected IServiceCollection _services;
        protected IServiceProvider _serviceProvider;
        protected IServiceScopeFactory _servicescopeFactory;

        public TestHarnessBase()
        {            
            var configBuilder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            _configuration = configBuilder.Build();

            this._services = new ServiceCollection();
            _services.AddSingleton<IConfiguration>((serviceProvider) => _configuration); 
            
            _services.AddCoreConfigurationOptions(_configuration);
            _services.AddDALConfigurationOptions(_configuration);
            ReBuildServices();
        }

        protected void ReBuildServices()
        {
            this._serviceProvider = this._services.BuildServiceProvider();
            this._servicescopeFactory = _serviceProvider.GetService<IServiceScopeFactory>();
        }

        protected TResult RunInScope<TInterface, TResult>(Func<TInterface, IServiceScope, TResult> func)
        {
            using (var scope = _servicescopeFactory.CreateScope())
            {
                var executionClass = scope.ServiceProvider.GetRequiredService<TInterface>();

                return func(executionClass, scope);
            }
        }
    }
}
