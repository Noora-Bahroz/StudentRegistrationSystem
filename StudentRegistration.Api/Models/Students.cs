
namespace StudentRegistration.Api.Models;

public class Student
{
    public int Id { get; set; }

    public string StudentCode { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Course { get; set; } = string.Empty;

    public string Status { get; set; } = "Active";

    // Stores the student's gender.
    public string Gender { get; set; } = string.Empty;

    // Stores the student's mobile number as text.
    public string MobileNumber { get; set; } = string.Empty;

    // Stores the registration date without a time component.
    public DateOnly? RegistrationDate { get; set; }

    // Stores the date of birth without a time component.
    public DateOnly? DateOfBirth { get; set; }
}
