namespace mediumclone_api.Domain.Entities
{
    public class Like : BaseEntity
    {
        public string UserId { get; set; }
        public string PostId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}