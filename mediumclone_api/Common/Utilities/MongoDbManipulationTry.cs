namespace mediumclone_api.Common.Utilities
{
    public static class MongoDbManipulationTry
    {
        private static string EndsWith(string value)
        {
            string[] chars = { "s", "x", "z", "ch", "sh" };
            foreach (string item in chars)
            {
                if (value.ToLower().EndsWith(item))
                {
                    value = value + "es";
                    return value;
                }
            }
            string[] consonants = {"B", "C", "D", "F", "G",
                "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"};
            if (value.EndsWith("y"))
            {
                foreach (string consonantsItem in consonants)
                {
                    if (value.ToLower().EndsWith($"{consonantsItem.ToLower() + "y"}"))
                    {
                        value = value.Substring(0, value.Length - 1) + "ies";
                        return value;
                    }
                }
            }
            value = value + "s";
            return value;        
            }
        public static string DataBaseName<T>() 
        {
            string typeName = typeof(T).Name;
            var response = EndsWith(typeName);
            return response;
        } 
    }
}