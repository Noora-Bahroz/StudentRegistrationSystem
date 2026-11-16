
namespace StudentRegistration.Application.Common.Pagination;

// Contains paginated records and pagination information.
public class PaginatedResult<T>
{
    public List<T> Items { get; set; } = new();

    public int PageNumber { get; set; }

    public int PageSize { get; set; }

    public int TotalRecords { get; set; }

    public int TotalPages { get; set; }
}
