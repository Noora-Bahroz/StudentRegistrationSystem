
import { Eye, Pencil, Trash2 } from "lucide-react";

// Displays student records and provides search, filters, sorting, and actions.
export default function StudentList({
    students,
    searchValue,
    onSearchChange,
    courseFilter,
    onCourseChange,
    statusFilter,
    onStatusChange,
    sortOption,
    onSortChange,
    onAddStudent,
    onViewStudent,
    onEditStudent,
    onDeleteStudent,
}) {
    return (
        <main className="flex-1 bg-white p-8 text-black">

            {/* Page Heading and Add Student Button */}
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Students
                </h2>

                <button
                    onClick={onAddStudent}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-sm"
                >
                    + New Student
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4 mb-6 text-black">

                {/* Search by student name, email, or student code */}
                <input
                    type="text"
                    value={searchValue ?? ""}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search by name and email"
                    className="border p-3 rounded flex-1 min-w-0"
                />

                {/* Filter students by course */}
                <select
                    value={courseFilter ?? ""}
                    onChange={(event) => onCourseChange(event.target.value)}
                    className="border p-3 rounded text-black shrink-0 w-48"
                >
                    <option value="">All Courses</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business">Business</option>
                    <option value="Engineering">Engineering</option>
                </select>

                {/* Filter students by status */}
                <select
                    value={statusFilter ?? ""}
                    onChange={(event) => onStatusChange(event.target.value)}
                    className="border p-3 rounded text-black shrink-0 w-48"
                >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                {/* Sort students by selected field and direction */}
                <select
                    value={sortOption ?? "id-asc"}
                    onChange={(event) => onSortChange(event.target.value)}
                    className="border p-3 rounded text-black shrink-0 w-48"
                >
                    <option value="id-asc">Sort By</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="course-asc">Course (A-Z)</option>
                    <option value="course-desc">Course (Z-A)</option>
                    <option value="email-asc">Email (A-Z)</option>
                    <option value="email-desc">Email (Z-A)</option>
                </select>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto border border-slate-300 rounded-lg shadow-sm">
                <table className="w-full text-left text-black border-collapse border border-slate-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-semibold text-slate-700 border border-slate-300">ID</th>
                            <th className="p-3 font-semibold text-slate-700 border border-slate-300">Name</th>
                            <th className="p-3 font-semibold text-slate-700 border border-slate-300">Email</th>
                            <th className="p-3 font-semibold text-slate-700 border border-slate-300">Course</th>
                            <th className="p-3 font-semibold text-slate-700 border border-slate-300">Status</th>
                            <th className="p-3 font-semibold text-slate-700 border border-slate-300 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 border border-slate-300 font-medium">
                                    {student.studentCode || student.id}
                                </td>

                                <td className="p-3 border border-slate-300">
                                    {student.name}
                                </td>

                                <td className="p-3 border border-slate-300 text-slate-600">
                                    {student.email}
                                </td>

                                <td className="p-3 border border-slate-300 text-slate-600">
                                    {student.course}
                                </td>

                                <td className="p-3 border border-slate-300">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${student.status === "Active" ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"}`}>
                                        {student.status}
                                    </span>
                                </td>

                                <td className="p-3 border border-slate-300">
                                    <div className="flex justify-center items-center gap-2">
                                        <button
                                            onClick={() => onViewStudent(student)}
                                            className="p-1.5 border border-blue-200 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                                            title="View"
                                        >
                                            <Eye size={16} />
                                        </button>

                                        <button
                                            onClick={() => onEditStudent(student)}
                                            className="p-1.5 border border-blue-200 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={() => onDeleteStudent(student)}
                                            className="p-1.5 border border-red-200 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {students.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-6 text-center text-slate-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Student Count */}
                <div className="bg-slate-50 p-4 border-t border-slate-300 flex justify-between items-center text-sm text-slate-600 font-medium">
                    <span>Showing {students.length} students</span>
                </div>
            </div>
        </main>
    );
}
