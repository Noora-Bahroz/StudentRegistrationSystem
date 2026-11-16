
using StudentRegistration.Application.DTOs;
using StudentRegistration.Application.Interfaces;
using StudentRegistration.Application.Common.Pagination;
using StudentRegistration.Domain.Entities;

namespace StudentRegistration.Application.Services;

// Implements the business operations for student management.
public class StudentService : IStudentService
{
    private readonly IStudentRepository _repository;

    // Receives the student repository through Dependency Injection.
    public StudentService(IStudentRepository repository)
    {
        _repository = repository;
    }

    // Retrieves students with search, filtering and pagination.
    public async Task<PaginatedResult<StudentResponseDto>> GetAllAsync(
        PaginationRequest request)
    {
        var result = await _repository.GetAllAsync(request);

        return new PaginatedResult<StudentResponseDto>
        {
            Items = result.Items.Select(MapToResponse).ToList(),
            PageNumber = result.PageNumber,
            PageSize = result.PageSize,
            TotalRecords = result.TotalRecords,
            TotalPages = result.TotalPages
        };
    }

    // Retrieves one student by ID.
    public async Task<StudentResponseDto?> GetByIdAsync(int id)
    {
        var student = await _repository.GetByIdAsync(id);

        return student == null ? null : MapToResponse(student);
    }

    // Creates a new student.
    public async Task<StudentResponseDto> CreateAsync(CreateStudentDto dto)
    {
        // Prevent duplicate email addresses.
        if (await _repository.EmailExistsAsync(dto.Email))
        {
            throw new InvalidOperationException(
                "A student with this email already exists.");
        }

        var student = new Student
        {
            Name = dto.Name,
            Email = dto.Email,
            Course = dto.Course,
            Gender = dto.Gender,
            MobileNumber = dto.MobileNumber,
            DateOfBirth = dto.DateOfBirth,
            RegistrationDate = dto.RegistrationDate,
            Status = dto.Status
        };

        // Save the student to generate the database ID.
        student = await _repository.AddAsync(student);

        // Generate the student code using the database ID.
        student.StudentCode = $"ST{student.Id:D3}";

        // Save the generated student code.
        await _repository.UpdateAsync(student);

        return MapToResponse(student);
    }

    // Updates an existing student.
    public async Task<bool> UpdateAsync(int id, UpdateStudentDto dto)
    {
        var student = await _repository.GetByIdAsync(id);

        if (student == null)
        {
            return false;
        }

        student.Name = dto.Name;
        student.Email = dto.Email;
        student.Course = dto.Course;
        student.Gender = dto.Gender;
        student.MobileNumber = dto.MobileNumber;
        student.DateOfBirth = dto.DateOfBirth;
        student.RegistrationDate = dto.RegistrationDate;
        student.Status = dto.Status;

        await _repository.UpdateAsync(student);

        return true;
    }

    // Deletes an existing student.
    public async Task<bool> DeleteAsync(int id)
    {
        var student = await _repository.GetByIdAsync(id);

        if (student == null)
        {
            return false;
        }

        await _repository.DeleteAsync(student);

        return true;
    }

    // Converts a Domain Student entity into a response DTO.
    private static StudentResponseDto MapToResponse(Student student)
    {
        return new StudentResponseDto
        {
            Id = student.Id,
            StudentCode = student.StudentCode,
            Name = student.Name,
            Email = student.Email,
            Course = student.Course,
            Status = student.Status,
            Gender = student.Gender,
            MobileNumber = student.MobileNumber,
            DateOfBirth = student.DateOfBirth,
            RegistrationDate = student.RegistrationDate
        };
    }
}
