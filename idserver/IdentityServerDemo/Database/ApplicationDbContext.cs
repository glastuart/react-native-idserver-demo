using Microsoft.EntityFrameworkCore;

namespace IdentityServerDemo.Database;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options) {
    
}