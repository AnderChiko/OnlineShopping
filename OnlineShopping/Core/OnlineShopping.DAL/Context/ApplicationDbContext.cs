using Microsoft.EntityFrameworkCore;
using OnlineShopping.Models.Data;
using OnlineShopping.Models.Data.Products;
using OnlineShopping.Models.Data.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.DAL
{
    public class ApplicationDbContext : DbContext
    { 
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasData(
                new Product()
                {
                    Id = 1,
                    Name = "Test product 1",
                    Description = "Test product 1",
                    DateTimeCreated = DateTime.Now,
                    IsActive = true,
                    IsDeleted = true,
                    ImageUrl = ""
                },
                 new Product()
                 {
                     Id = 2,
                     Name = "Test product 2",
                     Description = "Test product 2",
                     DateTimeCreated = DateTime.Now,
                     IsActive = true,
                     IsDeleted = true,
                     ImageUrl = ""
                 },
                  new Product()
                  {
                      Id = 3,
                      Name = "Test product 3",
                      Description = "Test product 3",
                      DateTimeCreated = DateTime.Now,
                      IsActive = true,
                      IsDeleted = true,
                      ImageUrl = ""
                  });

            modelBuilder.Entity<User>()
                .HasData(
                new User()
                {
                    Id = 1,
                    EmailAddress = "test@gmail.com",
                    Name = "Test"
                });

            base.OnModelCreating(modelBuilder);
        }
                     

        //TO DO : 

        public DbSet<User> User { get; set; } 
        
        public DbSet<Product> Product { get; set; }     

        public DbSet<Order> Order { get; set; }
        public DbSet<OrderItems> OrdersItem { get; set; }

        //public DbSet<ProductPrice> ProductPrice { get; set; }
        //public DbSet<UserToken> UserToken { get; set; }

    }
}
