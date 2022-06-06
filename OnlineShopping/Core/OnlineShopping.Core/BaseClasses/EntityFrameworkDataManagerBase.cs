using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using OnlineShopping.Interfaces.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.BaseClasses
{
    public abstract class EntityFrameworkDataManagerBase<TModel, TKey,TDbContext>
       : ICrudManager<TModel, TKey>
       where TDbContext : DbContext
       where TModel : class, new()
    {
       
        protected readonly IServiceProvider _serviceProvider;

        protected virtual TDbContext GetDbContext()
        {
            return _serviceProvider.GetRequiredService<TDbContext>();
        }

        protected EntityFrameworkDataManagerBase(IServiceProvider serviceProvider)
        {        
            _serviceProvider = serviceProvider;
        }

        /// <summary>
        /// Create an entry.
        /// </summary>
        /// <param name="entry"></param>
        /// <returns></returns>
        public virtual async Task<TModel> Create(TModel entry)
        {
            using (var dbContext = GetDbContext())
            {
                dbContext.Entry(entry).State = EntityState.Added;

                await dbContext.SaveChangesAsync();

                return  entry;
            }
        }

        /// <summary>
        /// Create range: caters for creating a list of entries.
        /// </summary>
        /// <param name="entry">Entry to update which is a List of TModel</param>
        /// <returns>Returns a data result of the entry</returns>
        public async Task<List<TModel>> Create(List<TModel> entry)
        {
            using (var dbContext = GetDbContext())
            {
                var dbSet = dbContext.Set<TModel>();
                dbSet.AddRange(entry);

                await dbContext.SaveChangesAsync();                

                return entry;
            }
        }

        /// <summary>
        /// Update range: caters for updating a list of entries.
        /// </summary>
        /// <param name="entry"></param>
        /// <returns></returns>
        public virtual async Task<TModel> Update(TModel entry)
        {
            using (var dbContext = GetDbContext())
            {
                dbContext.Entry(entry).State = EntityState.Modified;

                await dbContext.SaveChangesAsync();

                return entry;
            }
        }

        /// <summary>
        /// Update an entry.
        /// </summary>
        /// <param name="entry"></param>
        /// <returns></returns>
        public virtual async Task<List<TModel>> Update(List<TModel> entry)
        {
            using (var dbContext = GetDbContext())
            {
                var dbSet = dbContext.Set<TModel>();
                dbSet.UpdateRange(entry);

                await dbContext.SaveChangesAsync();

                return entry;
            }
        }

        /// <summary>
        /// Get by Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual async Task<List<TModel>> Get()
        {
            using (var dbContext = GetDbContext())
            {
                var dbSet = dbContext.Set<TModel>();

                return await dbSet.ToListAsync();
            }
        }


        /// <summary>
        /// Get by Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual async Task<TModel> Get(TKey id)
        {
            using (var dbContext = GetDbContext())
            {
                var dbSet = dbContext.Set<TModel>();

                return  await dbSet.FindAsync(id);
            }
        }

        public Task<int> Delete(TKey id)
        {
            throw new NotImplementedException();
        }
    }
}

