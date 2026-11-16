
using Microsoft.AspNetCore.Mvc;
using StudentRegistration.Application.Common.Pagination;
using StudentRegistration.Application.DTOs;
using StudentRegistration.Application.Services;

namespace StudentRegistration.Api.Controllers;

// Handles HTTP requests related to students.
[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    // Receives the student service through Dependency Injection.
    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    // GET: api/students
    // Retrieves students with search, filtering and pagination.
    [HttpGet]
    public async Task<IActionResult> GetStudents(
        [FromQuery] PaginationRequest request)
    {
        var students = await _studentService.GetAllAsync(request);

        return Ok(students);
    }

    // GET: api/students/1
    // Retrieves one student by ID.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetStudent(int id)
    {
        var student = await _studentService.GetByIdAsync(id);

        if (student == null)
        {
            return NotFound();
        }

        return Ok(student);
    }

    // POST: api/students
    // Creates a new student.
    [HttpPost]
    public async Task<IActionResult> CreateStudent(
        CreateStudentDto dto)
    {
        try
        {
            var student = await _studentService.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetStudent),
                new { id = student.Id },
                student);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    // PUT: api/students/1
    // Updates an existing student.
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(
        int id,
        UpdateStudentDto dto)
    {
        var updated = await _studentService.UpdateAsync(id, dto);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE: api/students/1
    // Deletes an existing student.
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var deleted = await _studentService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
