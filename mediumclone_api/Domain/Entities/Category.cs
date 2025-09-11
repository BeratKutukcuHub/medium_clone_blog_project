namespace mediumclone_api.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Topic { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}