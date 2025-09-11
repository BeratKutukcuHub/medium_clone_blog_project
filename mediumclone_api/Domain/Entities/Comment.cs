namespace mediumclone_api.Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string PostId { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}