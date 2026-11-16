
using StudentRegistration.Domain.Entities;
using StudentRegistration.Application.Common.Pagination;

namespace StudentRegistration.Application.Interfaces;

// Defines the contract for student database operations.
public interface IStudentRepository
{
    Task<Student?> GetByIdAsync(int id);

    Task<PaginatedResult<Student>> GetAllAsync(
        PaginationRequest request
    );

    Task<Student> AddAsync(Student student);

    Task UpdateAsync(Student student);

    Task DeleteAsync(Student student);

    Task<bool> EmailExistsAsync(string email);
}
