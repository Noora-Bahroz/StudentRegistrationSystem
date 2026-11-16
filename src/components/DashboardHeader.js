
import { CircleUserRound, GraduationCap } from "lucide-react";

// Displays the shared header at the top of the dashboard.
export default function DashboardHeader() {
    return (
        <header className="bg-purple-900 text-white p-5 flex justify-between items-center">

            {/* Title with Graduation Cap */}
            <div className="flex items-center gap-3">
                <GraduationCap size={28} className="text-white" />
                <h1 className="text-2xl font-extrabold tracking-tight">
                    Student Registration
                </h1>
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-2 cursor-pointer hover:text-purple-200 transition-colors">
                <span className="font-medium">Welcome, User</span>
                <CircleUserRound size={28} />
            </div>

        </header>
    );
}
