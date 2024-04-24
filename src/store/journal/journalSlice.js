import { createSlice } from '@reduxjs/toolkit';

const setListNot = (state, action) => {
    console.log(action.payload)
    state.notes = state.notes.map(note => {
        if (note.id === action.payload.id) {
            return action.payload;
        }
        return note;
    });
    console.log("notes state: ", state.notes)
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: '',
        //     title: '',
        //     body: '',
        //     date: 1321,
        //     imagUrls: []
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
           state.notes.push(action.payload);
           state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.savedMessage = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.savedMessage =  '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            setListNot(state, action);
            state.savedMessage = `${action.payload.title}, actualizada correctamente`;
        }, 
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        setUpdateNoteList: (state, action) => {
            setListNot(state, action);
        },
        clearNoteLogout: (state) => {
            state.isSaving = false;
            state.savedMessage = '';
            state.active = null;
            state.notes = [];
        },
        
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter((note)=> note.id !== action.payload);
        }

    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, setPhotosToActiveNote, setUpdateNoteList, clearNoteLogout } = journalSlice.actions;