namespace mediumclone_api.Application.Features.Post.Profiles
{
    public class PostGetDto
    {
        public string UserId { get; set; }
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;
    }
}