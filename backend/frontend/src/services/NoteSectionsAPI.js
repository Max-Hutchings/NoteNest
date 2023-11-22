import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import useToken from "../services/getToken";
import createAxiosInstance from "./createAxiosInstance";
import {useSelector } from "react-redux"



function config(token){
    return {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };
}


export const getSections = createAsyncThunk(
    "noteSections/getSections",
    async(_, { getState, rejectWithValue }) => {
        try{
            const token = getState().auth.token;
            console.log(token)
            console.log("GET SECTIONS CALLED")
            const response = await axios.get("http://127.0.0.1:8000/api/get-sections/", config(token) );
            return response.data
        }catch(e){
            console.log(e)
            return rejectWithValue(e.response.data)
        }
    }
)


// Define the thunk using createAsyncThunk
export const addSection = createAsyncThunk(
    "noteSections/addSection",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const response = await axios.post(
                "http://127.0.0.1:8000/api/add-section/",
                {},
                config(token)
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);


export const addSectionTitle = createAsyncThunk(
    "noteSections/addSectionTitle",
    async ({newTitle, sectionId}, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const response = await axios.post("http://127.0.0.1:8000/api/add-section-title/",{
            "section_title": newTitle,
            "section_id": sectionId
                }, config(token));
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
    }
)

export const addSectionNote = createAsyncThunk(
    "noteSections/addSectionNote",
    async ({noteText, sectionId}, {getState, rejectWithValue}) =>{
        try{
            const token = getState().auth.token;
            const response = await axios.post("http://127.0.0.1:8000/api/add-section-note/", {
            "noteText": noteText,
            "sectionId": sectionId
                }, config(token))
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
    }
)

export const saveNote = createAsyncThunk(
    "noteSections/saveNote",
    async({noteText, noteId, sectionId}, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const response = await axios.put("http://127.0.0.1:8000/api/add-section-note/", {
                "sectionId": sectionId,
                "noteText": noteText,
                "noteId": noteId,
            }, config(token))
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
})

export const deleteNote = createAsyncThunk(
    "noteSections/deleteNote",
    async ({noteId}, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete-note/${noteId}`, config(token))
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
    }
)

export const deleteSection = createAsyncThunk(
    "noteSections/deleteSection",
    async ({sectionId}, {getState, rejectWithValue}) =>{
        try{
            const token = getState().auth.token;
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete-section/${sectionId}`, config(token))
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
    }
)

export const toggleCompleteNote = createAsyncThunk(
    "noteSections/toggleCompleteNote",
    async ({noteId}, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const response = await axios.put(`http://127.0.0.1:8000/api/complete-note/`,
            {"noteId": noteId}, config(token))
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
    }
)

export const clearCompletedNotes = createAsyncThunk(
    "noteSections/clearCompletedNotes",
    async (_, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const response = await axios.post(`http://127.0.0.1:8000/api/clear-completed-tasks/`, {}, config(token))
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
    }
)

export const updateAllNotePositions = createAsyncThunk(
    "noteSections/assignNewNotePosition",
    async ({sectionId, sectionNotes}, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            const response = await axios.post(
                `http://127.0.0.1:8000/api/update-all-section-notes/`,
                {"sectionId": sectionId,
                "sectionNotes": sectionNotes},
                config(token))
            return response.data
        }catch(e){
            return rejectWithValue(e.response.data)
        }
    }

)

// export const updateNotePosition = createAsyncThunk(
//     "noteSections/assignNewNotePosition",
//     async ({newNotePosition}, {getState, rejectWithValue}) => {
//         try{
//             const token = getState().auth.token;
//             const response = await axios.put(
//                 `http://127.0.0.1:8000/api/assign-new-note-position/`,
//                 {"newPositions": newNotePosition},
//                 config(token))
//             return response.data
//         }catch(e){
//             return rejectWithValue(e.response.data)
//         }
//     }
//
// )
