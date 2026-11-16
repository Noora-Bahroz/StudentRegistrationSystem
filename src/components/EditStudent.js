
"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

// Starting values copied from the student being edited.
function createInitialFormData(student) {
    return {
        name: student?.name || "",
        gender: student?.gender || "",
        email: student?.email || "",
        course: student?.course || "",
        mobileNumber: student?.mobileNumber || "",
        registrationDate: student?.registrationDate || "",
        dateOfBirth: student?.dateOfBirth || "",
        status: student?.status || "Active",
    };
}

// Displays the edit form filled with the selected student's details.
export default function EditStudent({ student, onCancel, onUpdate }) {
    const [formData, setFormData] = useState(() => createInitialFormData(student));

    // Updates the corresponding field when the user enters or selects a value.
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    // Submits the updated student details to the parent component.
    function handleSubmit(event) {
        event.preventDefault();
        onUpdate(formData);
    }

    // Common styling for all input fields and dropdowns.
    const inputClass =
        "w-full box-border border border-slate-300 rounded-lg p-3 text-black outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600";

    // Common styling for field labels.
    const labelClass =
        "block mb-2 text-sm font-medium text-slate-700";

    // Same label styling plus the red asterisk used for required fields.
    const requiredLabelClass =
        `${labelClass} required-label`;

    // Show a friendly fallback if no student was selected.
    if (!student) {
        return (
            <main className="flex-1 bg-white p-8 text-black">
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Edit Student
                </h2>
                <p className="mt-4 text-slate-600">
                    No student selected.
                </p>

                <button
                    onClick={onCancel}
                    className="mt-6 px-5 py-3 border border-slate-300 rounded-lg"
                >
                    Back to List
                </button>
            </main>
        );
    }

    return (
        <main className="flex-1 bg-white p-8 text-black">

            {/* Page heading and Back to List button. */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight">
                    Edit Student
                </h2>

                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-2 border border-slate-300 rounded-lg px-4 py-2 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to List
                </button>
            </div>

            {/* Complete edit form. */}
            <form onSubmit={handleSubmit} className="w-full">

                {/* Student ID is shown for reference but cannot be changed. */}
                <div style={{ width: "calc(50% - 12px)", marginBottom: "24px" }}>
                    <label htmlFor="studentId" className={labelClass}>
                        Student ID
                    </label>
                    <input
                        id="studentId"
                        type="text"
                        value={student.id}
                        disabled
                        className={`${inputClass} bg-slate-100 text-slate-500 cursor-not-allowed`}
                    />
                </div>

                {/* Two equal-width columns with four rows of student fields. */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                        columnGap: "24px",
                        rowGap: "24px",
                        width: "100%",
                    }}
                >

                    {/* Row 1, Left: Full Name. */}
                    <div>
                        <label htmlFor="name" className={requiredLabelClass}>
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Row 1, Right: Gender. */}
                    <div>
                        <label htmlFor="gender" className={requiredLabelClass}>
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Row 2, Left: Email Address. */}
                    <div>
                        <label htmlFor="email" className={requiredLabelClass}>
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Row 2, Right: Course. */}
                    <div>
                        <label htmlFor="course" className={requiredLabelClass}>
                            Course
                        </label>
                        <select
                            id="course"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        >
                            <option value="">Select Course</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Business">Business</option>
                            <option value="Engineering">Engineering</option>
                        </select>
                    </div>

                    {/* Row 3, Left: Mobile Number. */}
                    <div>
                        <label htmlFor="mobileNumber" className={requiredLabelClass}>
                            Mobile Number
                        </label>
                        <input
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Row 3, Right: Registration Date with calendar icon. */}
                    <div>
                        <label htmlFor="registrationDate" className={requiredLabelClass}>
                            Registration Date
                        </label>
                        <input
                            id="registrationDate"
                            name="registrationDate"
                            type="date"
                            value={formData.registrationDate}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Row 4, Left: Date of Birth with calendar icon. */}
                    <div>
                        <label htmlFor="dateOfBirth" className={requiredLabelClass}>
                            Date of Birth
                        </label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Row 4, Right: Status. */}
                    <div>
                        <label htmlFor="status" className={requiredLabelClass}>
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={inputClass}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                </div>

                {/* Cancel and Update buttons aligned to the far right. */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        marginTop: "24px",
                        gap: "12px",
                    }}
                >
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-8 py-3 bg-purple-900 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors"
                    >
                        Update Student
                    </button>
                </div>

            </form>
        </main>
    );
}
