import {createSlice} from "@reduxjs/toolkit";
import {
    addSection,
    addSectionNote,
    addSectionTitle, clearCompletedNotes,
    deleteNote,
    deleteSection,
    getSections,
    saveNote, toggleCompleteNote, updateAllNotePositions
} from "../apis/NoteSectionsAPI";


// Initial State of Note Sections
const initialState = {
    sections: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Async Thunk actions related to note sections.
// They either pass data for all sections back to client or dont.
const asyncActionsReturnSections = [getSections, addSection, addSectionTitle, addSectionNote,saveNote,
                      deleteNote, deleteSection, toggleCompleteNote, clearCompletedNotes,
                     ]
const asyncActionsDontReturnSection = [updateAllNotePositions,]


const noteSectionsSlice = createSlice({
    name: "noteSections",
    initialState,
    reducers: {
    // ... other reducers ...
    resetNoteSectionState: (state, action) => {
        state.sections = [];
        state.status = 'idle';
        state.error = null;
    },


    updateSectionNotes: (state, action) => {

        const { sectionId, newNotes } = action.payload;
        console.log("Reducer called")
        console.log(sectionId)
        console.log(newNotes)
        const sectionIndex = state.sections.findIndex(section => section.id === sectionId);
        if (sectionIndex !== -1) {
            state.sections[sectionIndex].notes = newNotes;
        }
    },
    removeSectionNote: (state, action) => {
        const { sectionId, noteId } = action.payload
        const sectionIndex = state.sections.findIndex(section => section.id === sectionId);
        if (sectionIndex !== -1) {
            state.sections[sectionIndex].notes = state.sections[sectionIndex].notes.filter(note => note.id !== noteId);

        }
    }

},
    extraReducers: (builder) =>{
        asyncActionsReturnSections.forEach(action => {
            builder
                .addCase(action.pending, (state) => {
                    state.status = "loading"
                })
                .addCase(action.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                })
                .addCase(action.fulfilled, (state, action) => {
                    state.status = "succeeded"
                    state.sections = action.payload;

                })
        })
        asyncActionsDontReturnSection.forEach(action => {
            builder
                .addCase(action.pending, (state) => {
                    state.status = "loading"
                })
                .addCase(action.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload
                })
                .addCase(action.fulfilled, (state, action) => {
                    state.status = "succeeded"
                })
        })
    }
})

export default noteSectionsSlice.reducer

export const { updateSectionNotes, removeSectionNote, resetNoteSectionState } = noteSectionsSlice.actions;


