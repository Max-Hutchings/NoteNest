import React, { useEffect, useState} from "react";
import "./standard_note_section.css"
import NoteTextArea from "./note_text_area/NoteTextArea";
import DeleteIcon from '@mui/icons-material/Delete';
import {closestCenter, DndContext, useDroppable} from "@dnd-kit/core"
import {SortableContext, verticalListSortingStrategy, arrayMove} from "@dnd-kit/sortable";
import {useDispatch, useSelector} from "react-redux";
import { updateSectionNotes } from "../../../../services/slices/NoteSectionsSlice"


function StandardNoteSection(props){

    const dispatch = useDispatch()

    // const {token} = useContext(AuthContext)
    const token = "123";
    const sectionId = props.sectionData.id
    console.log(sectionId)
    // console.log(props.sectionData)
    //
    const [title, setTitle] = useState(props.sectionData.title)
    const [addNoteText, setAddNoteText] = useState("")
    const notes = useSelector(state => {
        // Find the specific note section by its ID within the sections array
        const section = state.noteSections.sections.find(s => s.id === sectionId);
        // Return the notes array if the section is found, otherwise return an empty array
        return section ? section.notes : [];
    });



    function handleNoteDrag(event) {
        const { active, over } = event;
        console.log("ActiveID: ", active.id)
        console.log("OverID: ", over.id)


        if (active.id !== over.id) {
            const oldIndex = notes.findIndex(note => note.position === active.id);
            const newIndex = notes.findIndex(note => note.position === over.id);

            if (oldIndex === -1 || newIndex === -1) {
                return; // Exit if either note is not found
            }

            const newNotes = arrayMove([...notes], oldIndex, newIndex);
            // Reassign positions based on new order
            const updatedNotes = newNotes.map((note, index) => ({ ...note, position: index + 1 }));

            console.log("Dispatching updateSectionNotes", {sectionId: sectionId, newNotes: updatedNotes});
            dispatch(updateSectionNotes({sectionId: sectionId, newNotes: updatedNotes}));
            props.handleUpdateAllNotePositions(sectionId, updatedNotes)
        }

    }




    return(
        <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleNoteDrag}
            >
        <div className={"container standard-note-section"}>
            <div className={"row justify-content-center"}>
                <div className="col d-flex align-items-center note-section-title-container">
                    <input
                        onBlur={() => props.saveTitle(title)}
                        className={"note-section-title"}
                        name={"title"}
                        placeholder={"Enter Title"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    <DeleteIcon
                        sx={{
                            color:"lightGrey"
                        }}
                        onClick={()=> props.deleteSection(sectionId)}
                    />
                </div>
            </div>

                <SortableContext
                    items={notes ? notes.map(note => note.position) : []}
                    strategy={verticalListSortingStrategy}
                >

                    {notes && notes.map((note, index) => {
                        return (
                            <NoteTextArea
                                key={note.id}
                                id={note.id}
                                position={note.position}
                                noteData={note}
                                saveNote={(textValue, noteId) => props.saveNote(textValue, noteId, sectionId)}
                                deleteNote={props.deleteNote}
                                toggleCompleteNote={props.toggleCompleteNote}

                                />
                        )
                    })}
                </SortableContext>

            <div className={"row"}>

                <div className="col d-flex justify-content-center align-items-center note-section-container">
                    <textarea
                        className={"note-section-note"}
                        name={"add-note"}
                        placeholder={"Add Note"}
                        value={addNoteText}
                        onChange={e => setAddNoteText(e.target.value)}
                        onBlur={() => {
                            if (addNoteText.length > 0){
                                props.addNote(addNoteText);
                                setAddNoteText("");
                                }
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevents the default action of the enter key in a textarea
                                if (addNoteText.length > 0){
                                    props.addNote(addNoteText);
                                    setAddNoteText("");
                                }
                            }
                        }}
                        maxLength={200}
                />
                </div>
            </div>
        </div>
        </DndContext>

    )
}

export default StandardNoteSection