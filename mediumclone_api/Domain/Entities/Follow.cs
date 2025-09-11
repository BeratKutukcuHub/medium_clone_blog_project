namespace mediumclone_api.Domain.Entities
{
    public class Follow : BaseEntity
    {
        public string UserId { get; set; }
        public string FollowingUserId { get; set; }
    }
}