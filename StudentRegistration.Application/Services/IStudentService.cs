
using StudentRegistration.Application.Common.Pagination;
using StudentRegistration.Application.DTOs;

// Defines the operations available for student management.
namespace StudentRegistration.Application.Services;

public interface IStudentService
{
    // Retrieves students with search, filtering and pagination.
    Task<PaginatedResult<StudentResponseDto>> GetAllAsync(
        PaginationRequest request);

    // Retrieves a student by ID.
    Task<StudentResponseDto?> GetByIdAsync(int id);

    // Creates a new student.
    Task<StudentResponseDto> CreateAsync(CreateStudentDto dto);

    // Updates an existing student.
    Task<bool> UpdateAsync(int id, UpdateStudentDto dto);

    // Deletes a student.
    Task<bool> DeleteAsync(int id);
}
