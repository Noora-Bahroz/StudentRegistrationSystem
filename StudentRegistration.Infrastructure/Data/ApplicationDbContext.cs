
using Microsoft.EntityFrameworkCore;
using StudentRegistration.Domain.Entities;

namespace StudentRegistration.Infrastructure.Data;

// Represents the database session used by Entity Framework Core.
public class ApplicationDbContext : DbContext
{
    // Receives database configuration through dependency injection.
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // Represents the Students table in PostgreSQL.
    public DbSet<Student> Students { get; set; }

    // Configures how the Student entity maps to the database.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Maps the Student entity to the Students table.
        modelBuilder.Entity<Student>().ToTable("Students");

        // Configures the primary key.
        modelBuilder.Entity<Student>().HasKey(s => s.Id);
    }
}
