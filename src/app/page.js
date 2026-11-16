
"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/Sidebar";
import StudentList from "../components/StudentList";
import AddStudent from "../components/AddStudent";
import StudentDetails from "../components/StudentDetails";
import EditStudent from "../components/EditStudent";
import DeleteConfirm from "../components/DeleteConfirm";

// Imports all API functions used by the student dashboard.
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../lib/studentApi";

// Controls dashboard navigation and student records.
export default function Home() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Stores student records retrieved from the backend.
  const [studentRecords, setStudentRecords] = useState([]);

  // Stores search and filter values.
  const [searchValue, setSearchValue] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Stores the selected sorting option.
  const [sortOption, setSortOption] = useState("id-asc");

  // Tracks loading and error states.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieves students after the user stops typing or changes a filter.
  useEffect(() => {
    let isCurrentRequest = true;

    // Wait briefly before sending the search request.
    const delay = setTimeout(async () => {
      try {
        const [sortBy, sortOrder] = sortOption.split("-");

        const data = await getStudents({
          search: searchValue,
          course: courseFilter,
          status: statusFilter,
          sortBy,
          sortOrder
        });

        // Ignore results from outdated requests.
        if (isCurrentRequest) {
          setStudentRecords(data);
          setError("");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading students:", error);

        if (isCurrentRequest) {
          setError("Unable to load students. Please check that the backend API is running.");
          setIsLoading(false);
        }
      }
    }, 400);

    // Cancels the previous delay when the search changes.
    return () => {
      isCurrentRequest = false;
      clearTimeout(delay);
    };
  }, [searchValue, courseFilter, statusFilter, sortOption]);

  // Retrieves the latest student records using current filters.
  async function refreshStudents() {
    const [sortBy, sortOrder] = sortOption.split("-");

    const updatedStudents = await getStudents({
      search: searchValue,
      course: courseFilter,
      status: statusFilter,
      sortBy,
      sortOrder
    });

    setStudentRecords(updatedStudents);
  }

  // Adds a new student and refreshes the list.
  async function handleAddStudent(studentData) {
    try {
      await createStudent(studentData);
      await refreshStudents();

      setError("");
      setActiveScreen("home");

      alert("Student added successfully.");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Unable to add student. Please check the backend API and try again.");
    }
  }

  // Updates the selected student's information.
  async function handleUpdateStudent(studentData) {
    try {
      await updateStudent(selectedStudent.id, studentData);
      await refreshStudents();

      setSelectedStudent({
        ...selectedStudent,
        ...studentData
      });

      setError("");
      setActiveScreen("details");

      alert("Student updated successfully.");
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Unable to update student. Please try again.");
    }
  }

  // Opens the selected student's details.
  function handleViewStudent(student) {
    setSelectedStudent(student);
    setActiveScreen("details");
  }

  // Opens the selected student's edit screen.
  function handleEditStudent(student) {
    setSelectedStudent(student);
    setActiveScreen("edit");
  }

  // Selects a student before opening the delete confirmation.
  function handleDeleteStudent(student) {
    setSelectedStudent(student);
    setActiveScreen("delete");
  }

  // Deletes the selected student and refreshes the list.
  async function handleConfirmDelete() {
    try {
      await deleteStudent(selectedStudent.id);
      await refreshStudents();

      setSelectedStudent(null);
      setError("");
      setActiveScreen("home");

      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Unable to delete student. Please try again.");
    }
  }

  // Handles sidebar navigation.
  function handleSidebarNavigate(screen) {
    if (screen === "details") {
      setSelectedStudent(null);
    }

    setActiveScreen(screen);
  }

  // Passes search, filters, sorting, and student actions to the list.
  function renderStudentList() {
    return (
      <StudentList
        students={studentRecords}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        courseFilter={courseFilter}
        onCourseChange={setCourseFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onAddStudent={() => setActiveScreen("add")}
        onViewStudent={handleViewStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* Shared Header */}
      <DashboardHeader />

      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Shared Sidebar */}
        <Sidebar
          onNavigate={handleSidebarNavigate}
          active={activeScreen === "delete" ? "home" : activeScreen}
        />

        {/* Home Screen */}
        {activeScreen === "home" && (
          isLoading ? (
            <main className="flex-1 bg-white p-8 text-black">
              Loading students...
            </main>
          ) : error ? (
            <main className="flex-1 bg-white p-8 text-red-600">
              {error}
            </main>
          ) : (
            renderStudentList()
          )
        )}

        {/* Add Student Screen */}
        {activeScreen === "add" && (
          <AddStudent
            onCancel={() => setActiveScreen("home")}
            onSave={handleAddStudent}
          />
        )}

        {/* View Details Screen */}
        {activeScreen === "details" && (
          <StudentDetails
            students={studentRecords}
            student={selectedStudent}
            onBack={() => setActiveScreen("home")}
            onEdit={handleEditStudent}
            onView={handleViewStudent}
          />
        )}

        {/* Edit Student Screen */}
        {activeScreen === "edit" && (
          <EditStudent
            student={selectedStudent}
            onCancel={() => setActiveScreen("home")}
            onUpdate={handleUpdateStudent}
          />
        )}

        {/* Delete Confirmation Screen */}
        {activeScreen === "delete" && (
          <>
            {renderStudentList()}

            <DeleteConfirm
              student={selectedStudent}
              onCancel={() => setActiveScreen("home")}
              onConfirm={handleConfirmDelete}
            />
          </>
        )}

      </div>
    </div>
  );
}
