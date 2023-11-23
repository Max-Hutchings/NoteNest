import React, {useEffect} from "react";
import {Route, Redirect } from "react-router-dom"
import NotesSections from "../components/notes_dashboard/NotesDashboard";

import { DndContext, closestCenter } from "@dnd-kit/core"
import { arrayMove,  verticalListSortingStrategy } from "@dnd-kit/sortable"
import AddSectionComponent from "../components/notes_dashboard/components/add_section/AddSection";
import "../components/notes_dashboard/notes_dashboard.css"
import {useDispatch, useSelector} from "react-redux";
import {
    addSection,
    addSectionNote,
    addSectionTitle, clearCompletedNotes,
    deleteNote,
    deleteSection,
    getSections,
    saveNote, toggleCompleteNote, updateAllNotePositions, updateNotesSection
} from "../services/apis/NoteSectionsAPI"



function UserDashboardPage() {

    const dispatch = useDispatch()
    const { sections, status, error } = useSelector(state => state.noteSections)
    // GET SECTIONS
    const handleGetSections = () => {dispatch(getSections())}

    useEffect(() => {
        console.log("useEffect called in NotesDashboard");
        handleGetSections();
        // Optional: Return a cleanup function if you suspect unmounting/remounting
        return () => console.log("NotesDashboard unmounting");
    }, []);




    // ADD SECTION
    const handleAddSection = () => {dispatch(addSection())}

    // SAVE SECTION TITLE
    const handleAddSectionTitle = (newTitle, sectionId) => {dispatch(addSectionTitle({newTitle: newTitle, sectionId: sectionId}))}

    // SAVE NOTE
    const handleSaveNote = (noteText, noteId, sectionId) => {dispatch(saveNote({noteText: noteText, noteId: noteId, sectionId: sectionId}))}

    // ADD NOTE
    const handleAddNote = (noteText, sectionId) => {dispatch(addSectionNote({noteText: noteText, sectionId: sectionId}))}

    // DELETE NOTE
    const handleDeleteNote = (noteId) => {dispatch(deleteNote({noteId: noteId}))}

    // DELETE SECTION
    const handleDeleteSection = (sectionId) => {dispatch(deleteSection({sectionId: sectionId}))}

    // TOGGLE COMPLETE NOTE
    const handleToggleCompleteNote = (noteId) => {dispatch(toggleCompleteNote({noteId: noteId}))}

    // CLEAR COMPLETED NOTES
    const handleClearCompletedNotes = () => {dispatch(clearCompletedNotes())}

    // ASSIGN NEW NOTE POSITION
    const handleUpdateAllNotePositions = (sectionId, sectionNotes) => {dispatch(updateAllNotePositions({sectionId: sectionId, sectionNotes: sectionNotes }))}

    const handleUpdateNotesSection = (newSectionId, noteId) => {dispatch(updateNotesSection({newSectionId: newSectionId, noteId: noteId}))}

    function renderSections(){
        if (!Array.isArray(sections)){
            return null
        }
        return (
            <NotesSections
                handleGetSections={handleGetSections}
                handleAddSection={handleAddSection}
                handleAddSectionTitle={handleAddSectionTitle}
                handleSaveNote={handleSaveNote}
                handleAddNote={handleAddNote}
                handleDeleteNote={handleDeleteNote}
                handleDeleteSection={handleDeleteSection}
                handleToggleCompleteNote={handleToggleCompleteNote}
                handleUpdateAllNotePositions={handleUpdateAllNotePositions}
                handleUpdateNotesSection={handleUpdateNotesSection}

            />)
    }


    return (
        <div>
            <AddSectionComponent
                click={handleAddSection}
                />

                <div className={"container-fluid dashboard-sections-container"}>
                    <div className={"row"}>
                        {renderSections()}
                    </div>

                        <button onClick={handleClearCompletedNotes}>
                            Clear Completed Tasks
                        </button>

                </div>

        </div>
    );
}


export default UserDashboardPage