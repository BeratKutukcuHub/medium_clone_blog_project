namespace mediumclone_api.Domain.Entities
{
    public class Activation : BaseEntity
    {
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime ExpireAt { get; set; }
        public string Token { get; set; } = string.Empty;
        public bool IsUsed  { get; set; }
    }
}