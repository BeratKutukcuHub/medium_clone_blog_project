namespace mediumclone_ui.Domain.Entities;

public class User
{
    public string Id { get; set; } = null!;

    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public IEnumerable<string> Role { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public User()
    {
        Role = new List<string>()
        {
            "User"
        };
    }

}