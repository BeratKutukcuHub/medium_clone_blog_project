namespace mediumclone_api.Domain.Entities
{
    public class Post : BaseEntity
    {
        public string UserId { get; set; }
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}