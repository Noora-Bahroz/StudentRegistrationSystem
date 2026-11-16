
namespace StudentRegistration.Application.DTOs;

// Contains the information allowed when updating a student.
public class UpdateStudentDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Course { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public DateOnly? DateOfBirth { get; set; }
    public DateOnly? RegistrationDate { get; set; }
    public string Status { get; set; } = "Active";
}
