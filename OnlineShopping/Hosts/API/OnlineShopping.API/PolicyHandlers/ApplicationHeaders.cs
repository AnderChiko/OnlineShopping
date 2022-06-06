namespace OnlineShopping.API.PolicyHandlers
{
    public static class ApplicationHeaders
    {
        public static string ApiVersion = "app-api-version";

        public static string ConfigKey(string headerName)
        {
            return $"headers:{headerName}"; // TODO: To be tested.
        }
    }
}
