namespace mediumclone_api.Common.Utilities;

public static class MongoDbManipulation {
    public static string Pluralize(string Entity)
    {
        if (string.IsNullOrEmpty(Entity)) return Entity;

        string lowerEntity = Entity.ToLower();
        int len = lowerEntity.Length;

        if (lowerEntity.EndsWith("y"))
        {
            if (len >= 2 && IsConsonant(lowerEntity[len - 2]))
            {
                return Entity.Substring(0, len - 1) + "ies";
            }
            else
            {
                return Entity + "s";
            }
        }

        if (lowerEntity.EndsWith("s") || lowerEntity.EndsWith("x") || lowerEntity.EndsWith("z") ||
            lowerEntity.EndsWith("ch") || lowerEntity.EndsWith("sh"))
        {
            return Entity + "es";
        }

        return Entity + "s";
    }

    private static bool IsConsonant(char c)
    {
        return !"aeiou".Contains(char.ToLower(c));
    }
}
