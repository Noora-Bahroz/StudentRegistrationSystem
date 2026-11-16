
namespace StudentRegistration.Application.DTOs;

// Defines the student information returned to the frontend.
public class StudentResponseDto
{
    public int Id { get; set; }
    public string StudentCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Course { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public DateOnly? DateOfBirth { get; set; }
    public DateOnly? RegistrationDate { get; set; }
}
