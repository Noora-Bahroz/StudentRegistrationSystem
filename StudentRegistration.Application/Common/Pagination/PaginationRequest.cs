
namespace StudentRegistration.Application.Common.Pagination;

// Contains the parameters used for searching, filtering, sorting and pagination.
public class PaginationRequest
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;

    // Search students by name, email, code or course.
    public string? Search { get; set; }

    // Filter students by status and course.
    public string? Status { get; set; }
    public string? Course { get; set; }

    // Sort students by a selected field and direction.
    public string? SortBy { get; set; } = "id";
    public string? SortOrder { get; set; } = "asc";
}
