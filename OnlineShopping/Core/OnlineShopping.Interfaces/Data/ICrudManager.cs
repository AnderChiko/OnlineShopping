using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Interfaces.Data
{
    public interface ICrudManager<T, TKey>
    {
        /// <summary>
        /// Get by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<T> Get(TKey id);

        /// <summary>
        /// get all
        /// </summary>
        /// <returns></returns>
        Task<List<T>> Get();

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="organization"></param>
        /// <returns></returns>
        Task<T> Update(T entry);

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="organization"></param>
        /// <returns></returns>
        Task<T> Create(T entry);


        /// <summary>
        /// create range
        /// </summary>
        /// <param name="entry"></param>
        /// <returns></returns>
        Task<List<T>> Create(List<T> entry);


    }
}
