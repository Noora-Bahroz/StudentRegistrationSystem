
namespace StudentRegistration.Domain.Entities;

// Represents a student in the Student Registration System.
public class Student
{
    // Unique database identifier for each student.
    public int Id { get; set; }

    // Automatically generated student registration code.
    public string StudentCode { get; set; } = string.Empty;

    // Student's full name.
    public string Name { get; set; } = string.Empty;

    // Student's email address.
    public string Email { get; set; } = string.Empty;

    // Student's enrolled course.
    public string Course { get; set; } = string.Empty;

    // Student's current registration status.
    public string Status { get; set; } = "Active";

    // Student's gender.
    public string Gender { get; set; } = string.Empty;

    // Student's mobile number.
    public string MobileNumber { get; set; } = string.Empty;

    // Student's date of birth.
    public DateOnly? DateOfBirth { get; set; }

    // Date when the student registered.
    public DateOnly? RegistrationDate { get; set; }
}
