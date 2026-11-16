
// Base URL of the ASP.NET Core Student API.
const API_BASE_URL = "http://localhost:5169/api/students";

// Retrieves student records using search, filters, sorting and pagination.
export async function getStudents({
    search = "",
    course = "",
    status = "",
    sortBy = "id",
    sortOrder = "asc",
    pageNumber = 1,
    pageSize = 10,
} = {}) {

    // Prepare query parameters for the API request.
    const params = new URLSearchParams({
        pageNumber,
        pageSize,
        sortBy,
        sortOrder,
    });

    // Add search only when the user enters something.
    if (search.trim()) {
        params.append("search", search.trim());
    }

    // Add course only when a specific course is selected.
    if (course) {
        params.append("course", course);
    }

    // Add status only when a specific status is selected.
    if (status) {
        params.append("status", status);
    }

    // Send the request to the backend API.
    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);

    // Check whether the API request was successful.
    if (!response.ok) {
        throw new Error("Failed to retrieve students.");
    }

    // Convert the API response into JavaScript data.
    const data = await response.json();

    // Extract student records from the paginated response.
    return Array.isArray(data) ? data : data.items ?? [];
}

// Sends a new student's information to the backend API.
export async function createStudent(studentData) {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to create student.");
    }

    return await response.json();
}

// Sends updated student information to the backend API.
export async function updateStudent(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to update student.");
    }
}

// Sends a delete request for the selected student.
export async function deleteStudent(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete student.");
    }
}
