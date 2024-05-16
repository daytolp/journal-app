import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
jest.useRealTimers();
describe('Pruebas en Journal thunks' , () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    
//     beforeEach(() => {
//         jest.useRealTimers();
//         // jest.clearAllMocks();
// });

    test('startNewNote debe crear una nota en blanco', () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({auth: { uid }});
        jest.setTimeout(10 * 1000);
        startNewNote()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        // expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
        //     body: '',
        //     title: '',
        //     id: expect.any(String),
        //     date: expect.any(Number)
        // }));
        // expect(dispatch).toHaveBeenCalledWith(setActiveNote({
        //     body: '',
        //     title: '',
        //     id: expect.any(String),
        //     date: expect.any(Number)
        // }));

        // //Borrar de firebase
        // const collectionRef = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        // const docs = await getDoc(collectionRef);
        // console.log(docs);

        // const deletePromises = [];
        // docs.forEach(doc => {
        //     deletePromises.push(deleteDoc(doc.ref));
        // });

        // await Promise.all(deletePromises);
    });


});