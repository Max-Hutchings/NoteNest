import React, { useState} from "react";
import "./standard_note_section.css"
import NoteTextArea from "./note_text_area/NoteTextArea";
import DeleteIcon from '@mui/icons-material/Delete';
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";



function StandardNoteSection(props){
    const sectionId = props.sectionData.id
    const [title, setTitle] = useState(props.sectionData.title)
    const [addNoteText, setAddNoteText] = useState("")

    return(

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
                    items={props.notes ? props.notes.map(note => note.id) : []}
                    strategy={verticalListSortingStrategy}
                >

                    {props.notes && props.notes.map((note, index) => {
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
    )
}

export default StandardNoteSection