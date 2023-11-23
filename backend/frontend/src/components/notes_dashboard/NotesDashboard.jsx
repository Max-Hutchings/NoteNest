import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core"
import { arrayMove,  verticalListSortingStrategy } from "@dnd-kit/sortable"
import StandardNoteSection from "./components/standard_note_section/StandardNoteSection";
import "./notes_dashboard.css"
import {useDispatch, useSelector} from "react-redux";
import {updateSectionNotes, removeSectionNote} from "../../services/slices/NoteSectionsSlice";


function NoteSections(props) {

    const dispatch = useDispatch()

    const { sections, status, error } = useSelector(state => state.noteSections)

    const sortedSections = [...sections].sort((a, b) => {
        return b.section_type.localeCompare(a.section_type); // Sorting in reverse alphabetical order
    });


    function handleNoteDrag(event) {
        const { active, over } = event;

        if (active.data.current.sortable.containerId === over.data.current.sortable.containerId){
            const sourceSection = sections.find(section =>
                section.notes.some(note => note.id === active.id)
            );
            if (!sourceSection) {
                console.log("No source section found for the note");
                return;
            }

            const sectionId = sourceSection.id
            const notes = sourceSection.notes


            if (active.id !== over.id) {
                const oldIndex = notes.findIndex(note => note.id === active.id);
                const newIndex = notes.findIndex(note => note.id === over.id);

                if (oldIndex === -1 || newIndex === -1) {
                    return; // Exit if either note is not found
                }

                const newNotes = arrayMove([...notes], oldIndex, newIndex);
                // Reassign positions based on new order
                const updatedNotes = newNotes.map((note, index) => ({ ...note, position: index + 1 }));
                updatedNotes.sort((a, b) => a.position - b.position);

                console.log("Dispatching updateSectionNotes", {sectionId: sectionId, newNotes: updatedNotes});
                dispatch(updateSectionNotes({sectionId: sectionId, newNotes: updatedNotes}));
                props.handleUpdateAllNotePositions(sectionId, updatedNotes)
            }
        }
    }

    function handleDragOver(event){
        const {active, over } = event;
        if (active.data.current.sortable.containerId !== over.data.current.sortable.containerId){
            const targetSection = sections.find(section =>
                section.notes.some(note => note.id === over.id)
                );
            const sourceSection = sections.find(section =>
                section.notes.some(note => note.id === active.id)
            );
            const targetSectionId = targetSection.id
            const sourceSectionId = sourceSection.id

            if (active.id !== over.id){
                let noteToMove = sourceSection.notes.find(note => note.id === active.id);
                if (noteToMove) {
                    noteToMove = { ...noteToMove, position: targetSection.notes.length + 1 };
                }
                const updatedTargetNotes = noteToMove ? [...targetSection.notes, noteToMove] : [...targetSection.notes];
                updatedTargetNotes.sort((a, b) => a.position - b.position);
                dispatch(updateSectionNotes({sectionId: targetSectionId, newNotes: updatedTargetNotes}));
                props.handleUpdateNotesSection(targetSectionId, noteToMove.id)

                const newSourceNotes = sourceSection.notes.filter(note => note.id !== noteToMove.id);
                dispatch(updateSectionNotes({ sectionId: sourceSectionId, newNotes: newSourceNotes }));

            }
    }}



    return (
        <>
            <DndContext
                collisionDetection={closestCenter}
                onDragOver={handleDragOver}
                onDragEnd={handleNoteDrag}
            >
                {sortedSections.map((section) => (
                    <div className={"col section_col d-flex justify-content-center"}
                         key={section.id}>
                        <StandardNoteSection
                            sectionId={section.id}
                            sectionData={section}
                            notes={section.notes}
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
            </DndContext>

            </>
    )}

export default NoteSections
