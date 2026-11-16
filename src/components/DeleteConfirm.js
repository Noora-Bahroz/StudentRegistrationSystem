
"use client";

import { Trash2 } from "lucide-react";

// Asks the user to confirm before a student is deleted.
export default function DeleteConfirm({ student, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            {/* Confirmation pop-up card. */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-center">

                {/* Red trash icon inside a light red circle. */}
                <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5">
                    <Trash2 size={28} className="text-red-600" />
                </div>

                <h2 className="text-xl font-extrabold text-black mb-3">
                    Delete Student
                </h2>

                <p className="text-slate-600 mb-2">
                    Are you sure you want to delete this student?
                </p>

                <p className="text-lg font-bold text-black mb-2">
                    {student
                        ? `${student.name} (${student.id})`
                        : "No student selected."}
                </p>

                <p className="text-sm text-slate-500 mb-6">
                    This action cannot be undone.
                </p>

                {/* Cancel and Delete buttons. */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-8 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}
