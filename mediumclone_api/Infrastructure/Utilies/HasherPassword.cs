using Isopoh.Cryptography.Argon2;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Infrastructure.Utilities
{
    public static class HasherPassword
    {
        public static void Hash<T>(T entity) where T : BaseEntity
        {
            var property = typeof(T).GetProperty("PasswordHash");

            if (property != null && property.PropertyType == typeof(string))
            {
                var plainPassword = (string)property.GetValue(entity);

                if (!string.IsNullOrEmpty(plainPassword))
                {
                    var hashed = Argon2.Hash(plainPassword);
                    property.SetValue(entity, hashed); 
                }
            }
        }
    }
}