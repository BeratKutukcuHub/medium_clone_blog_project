namespace mediumclone_api.Application.Features.Profiles;

public record CreateUserResponse
{
    public string Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public IEnumerable<string> Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
}