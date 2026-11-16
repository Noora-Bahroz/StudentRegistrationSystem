
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register the existing API DbContext temporarily.
// It keeps the old StudentsController and migration setup working.
builder.Services.AddDbContext<StudentRegistration.Api.Data.ApplicationDbContext>(
    options => options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// Register the new Infrastructure DbContext.
// It will be used by the Clean Architecture repository.
builder.Services.AddDbContext<StudentRegistration.Infrastructure.Data.ApplicationDbContext>(
    options => options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// Register the student repository.
builder.Services.AddScoped<
    StudentRegistration.Application.Interfaces.IStudentRepository,
    StudentRegistration.Infrastructure.Repositories.StudentRepository>();

// Register the student service.
builder.Services.AddScoped<
    StudentRegistration.Application.Services.IStudentService,
    StudentRegistration.Application.Services.StudentService>();

// Register the controller services.
builder.Services.AddControllers();

// Allow the Next.js frontend to communicate with this backend.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Register OpenAPI services.
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Apply the CORS policy before authorization and controller endpoints.
app.UseCors("AllowNextJs");

app.UseAuthorization();

// Map the API controller routes.
app.MapControllers();

app.Run();
