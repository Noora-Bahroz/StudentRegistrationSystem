
"use client";

import { UserRound, Pencil, ArrowLeft, Eye } from "lucide-react";

// Formats a date returned by the API without changing the stored value.
function formatStudentDate(date) {
    if (!date) return "Not provided";

    return date.split("T")[0];
}

// Displays a value or a fallback when student information is unavailable.
function DetailItem({ label, value }) {
    return (
        <div>
            <p className="text-sm font-medium text-slate-500 mb-2">
                {label}
            </p>
            <p className="text-base font-semibold text-slate-800">
                {value || "Not provided"}
            </p>
        </div>
    );
}


// Shows a card for every student when none is selected yet.
function StudentCards({ students, onView, onEdit }) {
    return (
        // Scrollable area containing all student cards.
        <main className="flex-1 min-h-0 overflow-y-auto bg-white p-8 text-black">

            {/* Page heading. */}
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">
                All Students ({students.length})
            </h2>

            {/* One card for each student. */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {students.map((student) => (
                    <div
                        key={student.id}
                        className="border border-slate-300 rounded-lg shadow-sm p-6"
                    >
                        {/* Student icon, name, ID, and status. */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                <UserRound size={24} className="text-purple-900" />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-800">
                                    {student.name}
                                </h3>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-slate-500">
                                        {student.studentCode || student.id}
                                    </span>

                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${student.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {student.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Every detail stored for this student. */}
                        <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
                            <p className="text-slate-600">
                                <span className="font-medium text-slate-500">Full Name:</span>{" "}
                                {student.name}
                            </p>

                            <p className="text-slate-600">
                                <span className="font-medium text-slate-500">Email Address:</span>{" "}
                                {student.email}
                            </p>

                            <p className="text-slate-600">
                                <span className="font-medium text-slate-500">Mobile Number:</span>{" "}
                                {student.mobileNumber}
                            </p>

                            <p className="text-slate-600">
                                <span className="font-medium text-slate-500">Date of Birth:</span>{" "}
                                {formatStudentDate(student.dateOfBirth)}
                            </p>

                            <p className="text-slate-600">
                                <span className="font-medium text-slate-500">Gender:</span>{" "}
                                {student.gender || "Not provided"}
                            </p>

                            <p className="text-slate-600">
                                <span className="font-medium text-slate-500">Course:</span>{" "}
                                {student.course}
                            </p>

                            <p className="text-slate-600">
                                <span className="font-medium text-slate-500">Registration Date:</span>{" "}
                                {formatStudentDate(student.registrationDate)}
                            </p>
                        </div>

                        {/* View and Edit buttons for this student. */}
                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => onView(student)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                <Eye size={16} />
                                View
                            </button>

                            <button
                                onClick={() => onEdit(student)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-900 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors"
                            >
                                <Pencil size={16} />
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}


export default function StudentDetails({ students, student, onBack, onEdit, onView }) {

    // Display a friendly date without changing the stored value.
    function formatDate(date) {
        if (!date) return "Not provided";

        return date.split("T")[0];
    }

    // Show the cards of all students when none is selected yet.
    if (!student) {
        return <StudentCards students={students} onView={onView} onEdit={onEdit} />;
    }

    const studentId = student.studentCode || student.id;
    const isActive = student.status === "Active";

    return (
        <main className="flex-1 bg-white p-8 text-black">

            {/* Page heading and Back to List button. */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "24px",
                }}
            >
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Student Details
                </h2>

                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 text-purple-900 font-semibold hover:text-purple-700"
                >
                    <ArrowLeft size={18} />
                    Back to List
                </button>
            </div>

            {/* Bordered container for the selected student's information. */}
            <div className="w-full border border-slate-300 rounded-lg shadow-sm p-6">

                {/* Student icon, ID, status, and full name. */}
                <div className="flex items-center gap-4 mb-6">

                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                        <UserRound size={34} className="text-purple-900" />
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="text-sm font-semibold text-slate-600">
                                Student ID: {studentId}
                            </span>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {student.status || "Unknown"}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-800">
                            {student.name}
                        </h3>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-6">

                    {/* Student details arranged in two columns. */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                            columnGap: "24px",
                            rowGap: "28px",
                            width: "100%",
                        }}
                    >
                        <DetailItem
                            label="Gender"
                            value={student.gender}
                        />

                        <DetailItem
                            label="Course"
                            value={student.course}
                        />

                        <DetailItem
                            label="Email Address"
                            value={student.email}
                        />

                        <DetailItem
                            label="Mobile Number"
                            value={student.mobileNumber}
                        />

                        <DetailItem
                            label="Registration Date"
                            value={formatDate(student.registrationDate)}
                        />

                        <DetailItem
                            label="Date of Birth"
                            value={formatDate(student.dateOfBirth)}
                        />
                    </div>
                </div>

                {/* Edit Student button aligned to the bottom-right. */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        marginTop: "32px",
                    }}
                >
                    <button
                        type="button"
                        onClick={() => onEdit(student)}
                        className="w-44 h-12 bg-purple-900 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-purple-800 transition-colors"
                    >
                        <Pencil size={17} />
                        Edit Student
                    </button>
                </div>

            </div>
        </main>
    );
}
