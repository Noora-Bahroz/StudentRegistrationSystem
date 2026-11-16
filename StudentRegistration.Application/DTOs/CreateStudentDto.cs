
namespace StudentRegistration.Application.DTOs;

// Contains the information required to create a student.
public class CreateStudentDto
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
