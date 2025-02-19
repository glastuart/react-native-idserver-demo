namespace IdentityServerDemo.Models;

public class LoginRequest {
    
    public string Username { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string ReturnUrl { get; set; } = string.Empty;
}