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
                    DateCreated = DateTime.Now,
                    IsActive = true,
                    IsDeleted = true,
                    ImageUrl = ""
                },
                 new Product()
                 {
                     Id = 2,
                     Name = "Test product 2",
                     Description = "Test product 2",
                     DateCreated = DateTime.Now,
                     IsActive = true,
                     IsDeleted = true,
                     ImageUrl = ""
                 },
                  new Product()
                  {
                      Id = 3,
                      Name = "Test product 3",
                      Description = "Test product 3",
                      DateCreated = DateTime.Now,
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


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                @"Data Source=HSTCPT-ANDERSON;Initial Catalog=test123;Integrated Security=True");
            }           
        }


        public DbSet<User> Users { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductPrice> ProductPrices { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }

    }
}
