import { useState, useEffect, useCallback } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Workspace from "./components/workspace/Workspace";
import db from "./db";
import "./App.scss";
import DefaultLayout from "./components/defaultLayout/DefaultLayout";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    updateNotes();
  }, []);

  const updateNotes = () => {
    getAllNotes().then((res) => {
      setNotes(res);
    });
  }

  const getAllNotes = async () => {
    return await db.notes.toArray();
  };

  const addNote = async () => {
    await db.notes.add({
      value: "# Новая заметка",
      date: Date.now(),
    });
    updateNotes();
  };

  const deleteNote = async () => {
    await db.notes.delete(activeNote);
    updateNotes();
    setActiveNote(null);
  };

  const editNote = async (value) => {
    await db.notes.update(activeNote, {value, date: Date.now()});
    updateNotes();
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="app">
      <Sidebar addNote={addNote} activeNote={activeNote} setActiveNote={setActiveNote} notes={notes} />
      {activeNote ? <Workspace deleteNote={deleteNote} activeNote={getActiveNote()} notes={notes} editNote={editNote} /> : <DefaultLayout />}
    </div>
  );
}

// function App() {
//   const [notes, setNotes] = useState([]);
//   const [activeNote, setActiveNote] = useState(null);

//   useEffect(() => {
//     getAllNotes().then((res) => {
//       setNotes(res);
//     });
//   }, []);

//   const getAllNotes = async () => {
//     return await db.notes.toArray();
//   };

//   const addNote = async () => {
//     await db.notes.add({
//       value: "# Новая заметка",
//       date: Date.now(),
//     });
//   };

//   const editNote = async (value) => {
//     setActiveNote(activeNote => notes.find((note) => note.id === activeNote.id))
//     await db.notes.update(activeNote.id, {value});
//   }

//   const noteEdited = () => {
//     setActiveNote();
//   }

//   const onNoteSelect = (id) => {
//     setActiveNote(notes.find((note) => note.id === id));
//   };

//   return (
//     <div className="app">
//       <Sidebar addNote={addNote} activeNote={activeNote} onNoteSelect={onNoteSelect} notes={notes} />
//       {activeNote ? <Workspace activeNote={activeNote} notes={notes} editNote={editNote} noteEdited={noteEdited}/> : <DefaultLayout />}
//     </div>
//   );
// }

export default App;
