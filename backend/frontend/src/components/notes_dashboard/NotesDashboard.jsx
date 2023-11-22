import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core"
import { arrayMove,  verticalListSortingStrategy } from "@dnd-kit/sortable"
import StandardNoteSection from "./components/standard_note_section/StandardNoteSection";
import AddSectionComponent from "./components/add_section/AddSection";
import "./notes_dashboard.css"
import {useDispatch, useSelector} from "react-redux";


function NoteSections(props) {

    const { sections, status, error } = useSelector(state => state.noteSections)

    const sortedSections = [...sections].sort((a, b) => {
        return b.section_type.localeCompare(a.section_type); // Sorting in reverse alphabetical order
    });

    return (
        <>
            {sortedSections.map((section, index) => (
                <div className={"col section_col d-flex justify-content-center"}
                     key={section.id}>
                    <StandardNoteSection
                        sectionId={section.id}
                        sectionData={section}
                        saveTitle={(newTitle) => props.handleAddSectionTitle(newTitle, section.id)}
                        saveNote={(textValue, noteId) => props.handleSaveNote(textValue, noteId, section.id)}
                        addNote={(textValue) => props.handleAddNote(textValue, section.id)}
                        deleteNote={props.handleDeleteNote}
                        deleteSection={props.handleDeleteSection}
                        toggleCompleteNote={props.handleToggleCompleteNote}
                        handleUpdateAllNotePositions={props.handleUpdateAllNotePositions}

                    />
                </div>
            ))}
            </>
    )}





export default NoteSections
