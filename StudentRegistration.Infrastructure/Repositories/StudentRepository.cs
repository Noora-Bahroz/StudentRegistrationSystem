
using Microsoft.EntityFrameworkCore;
using StudentRegistration.Application.Common.Pagination;
using StudentRegistration.Application.Interfaces;
using StudentRegistration.Domain.Entities;
using StudentRegistration.Infrastructure.Data;

namespace StudentRegistration.Infrastructure.Repositories;

// Implements the database operations defined by IStudentRepository.
public class StudentRepository : IStudentRepository
{
    private readonly ApplicationDbContext _context;

    // Receives the database context through Dependency Injection.
    public StudentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    // Retrieves one student using their database ID.
    public async Task<Student?> GetByIdAsync(int id)
    {
        return await _context.Students
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    // Retrieves students with search, filtering and pagination.
    public async Task<PaginatedResult<Student>> GetAllAsync(
        PaginationRequest request)
    {
        var query = _context.Students.AsNoTracking().AsQueryable();

        // Apply search across student name, email, code and course.
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim().ToLower();

            query = query.Where(s =>
                s.Name.ToLower().Contains(search) ||
                s.Email.ToLower().Contains(search) ||
                s.StudentCode.ToLower().Contains(search) ||
                s.Course.ToLower().Contains(search));
        }

        // Filter students by status when a status is provided.
        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            var status = request.Status.Trim().ToLower();

            query = query.Where(s =>
                s.Status.ToLower() == status);
        }

        // Filter students by course when a course is provided.
        if (!string.IsNullOrWhiteSpace(request.Course))
        {
            var course = request.Course.Trim().ToLower();

            query = query.Where(s =>
                s.Course.ToLower() == course);
        }

        // Count matching records before applying pagination.
        var totalRecords = await query.CountAsync();

        // Keep page number and page size within valid limits.
        var pageNumber = Math.Max(1, request.PageNumber);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

       // Apply sorting based on the requested field and direction.
var sortBy = request.SortBy?.Trim().ToLower();
var sortOrder = request.SortOrder?.Trim().ToLower();

query = (sortBy, sortOrder) switch
{
    ("name", "desc") => query.OrderByDescending(s => s.Name),
    ("name", _) => query.OrderBy(s => s.Name),

    ("email", "desc") => query.OrderByDescending(s => s.Email),
    ("email", _) => query.OrderBy(s => s.Email),

    ("course", "desc") => query.OrderByDescending(s => s.Course),
    ("course", _) => query.OrderBy(s => s.Course),

    ("status", "desc") => query.OrderByDescending(s => s.Status),
    ("status", _) => query.OrderBy(s => s.Status),

    ("id", "desc") => query.OrderByDescending(s => s.Id),
    _ => query.OrderBy(s => s.Id)
};

// Retrieve only the records required for the current page.
var students = await query
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();

        // Return the records along with pagination information.
        return new PaginatedResult<Student>
        {
            Items = students,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalRecords = totalRecords,
            TotalPages = (int)Math.Ceiling(
                totalRecords / (double)pageSize)
        };
    }

    // Adds a new student to the database.
    public async Task<Student> AddAsync(Student student)
    {
        await _context.Students.AddAsync(student);
        await _context.SaveChangesAsync();

        return student;
    }

    // Updates an existing student in the database.
    public async Task UpdateAsync(Student student)
    {
        _context.Students.Update(student);
        await _context.SaveChangesAsync();
    }

    // Deletes an existing student from the database.
    public async Task DeleteAsync(Student student)
    {
        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
    }

    // Checks whether an email address already exists.
    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Students.AnyAsync(s =>
            s.Email.ToLower() == email.Trim().ToLower());
    }
}
