
// Import the icons used in the sidebar navigation.
import {
    Home as HomeIcon,
    PlusCircle,
    LayoutList,
    LogOut,
    Pencil,
} from "lucide-react";

// Styles shared by every sidebar button, highlighting the active screen.
function navItemClass(isActive) {
    return `flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
            ? "bg-purple-100 text-purple-700"
            : "hover:bg-purple-100 hover:text-purple-700"
        }`;
}

// Displays the shared sidebar and sends navigation choices to the dashboard.
export default function Sidebar({ onNavigate, active }) {
    // Check whether the Edit Student screen is currently open.
    const isEditing = active === "edit";

    return (
        <aside className="w-64 h-full min-h-0 shrink-0 bg-slate-100 text-slate-700 p-5 border-r border-slate-200">
            <nav className="space-y-2">

                {/* Home Navigation */}
                <button
                    onClick={() => onNavigate("home")}
                    className={navItemClass(active === "home")}
                >
                    <HomeIcon size={20} />
                    <span>Home</span>
                </button>

                {/* Add Student Navigation */}
                <button
                    onClick={() => onNavigate("add")}
                    className={navItemClass(active === "add")}
                >
                    <PlusCircle size={20} />
                    <span>Add New</span>
                </button>

                {/* View Details changes to Edit while editing a student. */}
                <button
                    onClick={() => onNavigate("details")}
                    className={navItemClass(
                        active === "details" || isEditing
                    )}
                >
                    {isEditing ? (
                        <Pencil size={20} />
                    ) : (
                        <LayoutList size={20} />
                    )}

                    <span>
                        {isEditing ? "Edit" : "View Details"}
                    </span>
                </button>

                {/* Logout Button - authentication will be added later. */}
                <button
                    className={navItemClass(false)}
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>

            </nav>
        </aside>
    );
}
