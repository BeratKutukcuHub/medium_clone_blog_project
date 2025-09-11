namespace mediumclone_api.Domain.Entities
{
    public class Save : BaseEntity
    {
        public string PostId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}