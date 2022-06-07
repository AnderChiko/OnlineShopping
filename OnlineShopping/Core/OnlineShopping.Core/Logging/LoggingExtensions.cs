using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShopping.Core.Logging
{
    public static class LoggingExtensions
    {
        public static void LogError(this ILogger logger, TransactionContext transactionContext, Exception exception, string label, string message, params object[] dataObjects)
        {
            // TODO: Implement label and dataObjects logging
            var coreException = new CoreException(exception, label, dataObjects);
            logger.LogError(coreException, message, transactionContext);
        }

        public static Result LogErrorAndReturnResult(this ILogger logger, TransactionContext transactionContext,
            Exception exception, string label, params object[] dataObjects)
        {
            logger.LogError(transactionContext, exception, label, exception.GetBaseException().ToString(), dataObjects);

            var result = new Result(Status.Error, exception.Message, transactionContext.TransactionId);

            if (exception is CoreException)
            {
                result.StatusCode = ((CoreException)exception).HttpStatusCode.ToString();
            }

            return result;
        }

        public static Result LogErrorAndReturnResult<T>(this ILoggingManager<T> logger,
            TransactionContext transactionContext,
            LoggingCategory loggingCategory, LoggingSubCategory loggingSubCategory,
            Exception exception,
            string label, string message, Dictionary<string, string> properties = null,
            Dictionary<string, double> metrics = null,
            [CallerMemberName] string memberName = "",
            [CallerFilePath] string memberFilePath = "",
            [CallerLineNumber] int memberLineNumber = 0,
            params object[] dataObjects)
        {
            logger.LogError(loggingCategory, loggingSubCategory,
                exception, label, message, properties, metrics,
                memberName, memberFilePath, memberLineNumber, dataObjects);

            // logger.LogError(transactionContext, exception, label, exception.GetBaseException().ToString(), dataObjects);

            var result = new Result(Status.Error, exception.Message, transactionContext.TransactionId);

            if (exception is CoreException)
            {
                result.StatusCode = ((CoreException)exception).HttpStatusCode.ToString();
            }

            return result;
        }
    }
}
