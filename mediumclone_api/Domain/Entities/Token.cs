namespace mediumclone_api.Domain.Entities
{
    public class Token : BaseEntity
    {
        public string UserId { get; set; }
        public DateTime ExpTimeSpan { get; set; } = DateTime.UtcNow.AddDays(7);
    }
}