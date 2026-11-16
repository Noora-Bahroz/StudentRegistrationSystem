
"use client";

import { useState } from "react";

// Initial values for all student registration fields.
const initialFormData = {
    name: "",
    gender: "",
    email: "",
    course: "",
    mobileNumber: "",
    registrationDate: "",
    dateOfBirth: "",
    status: "Active",
};

export default function AddStudent({ onCancel, onSave }) {
    const [formData, setFormData] = useState(initialFormData);

    // Updates the corresponding field when the user enters or selects a value.
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    // Submits all student registration details to the parent component.
    function handleSubmit(event) {
        event.preventDefault();
        onSave(formData);
    }

    // Common styling for all input fields and dropdowns.
    const inputClass =
        "w-full box-border border border-slate-300 rounded-lg p-3 text-black outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600";

    // Common styling for field labels (the class adds the red required asterisk).
    const labelClass =
        "block mb-2 text-sm font-medium text-slate-700 required-label";

    return (
        <main className="flex-1 bg-white p-8 text-black">

            {/* Page heading aligned to the left. */}
            <h2 className="text-2xl font-extrabold tracking-tight mb-6">
                Add New Student
            </h2>

            {/* Complete student registration form. */}
            <form onSubmit={handleSubmit} className="w-full">


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
                        <label htmlFor="name" className={labelClass}>
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
                        <label htmlFor="gender" className={labelClass}>
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
                        <label htmlFor="email" className={labelClass}>
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
                        <label htmlFor="course" className={labelClass}>
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
                        <label htmlFor="mobileNumber" className={labelClass}>
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
                        <label htmlFor="registrationDate" className={labelClass}>
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
                        <label htmlFor="dateOfBirth" className={labelClass}>
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
                        <label htmlFor="status" className={labelClass}>
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

                {/* Cancel and Save buttons aligned to the far right. */}
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
                        Save Student
                    </button>
                </div>

            </form>
        </main>
    );
}
