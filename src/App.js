import { useState, useEffect } from "react";
import {Modal} from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Sidebar from "./components/sidebar/Sidebar";
import Workspace from "./components/workspace/Workspace";
import DefaultLayout from "./components/defaultLayout/DefaultLayout";
import db from "./db";
import "./App.scss";

const { confirm } = Modal;

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    updateNotes();
  }, []);

  const updateNotes = () => {
    getAllNotes().then((res) => {
      setNotes(res);
    });
  };

  const getAllNotes = async () => {
    return await db.notes.toArray();
  };

  const addNote = async () => {
    await db.notes
      .add({
        value: "# Новая заметка",
        date: Date.now(),
      })
      .then((id) => setActiveNote(id));
    setEditing(false);
    updateNotes();
  };

  const deleteNote = () => {
    confirm({
      title: "Are you sure delete this note?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await db.notes.delete(activeNote);
        updateNotes();
        setActiveNote(null);
      },
      onCancel() {
        return 
      },
    });
  };


  const editNote = async (value) => {
    await db.notes.update(activeNote, { value, date: Date.now() });
    updateNotes();
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="app">
      <Sidebar addNote={addNote} activeNote={activeNote} setActiveNote={setActiveNote} notes={notes} />
      {activeNote ? (
        <Workspace
          editing={editing}
          setEditing={setEditing}
          deleteNote={deleteNote}
          activeNote={getActiveNote()}
          notes={notes}
          editNote={editNote}
        />
      ) : (
        <DefaultLayout />
      )}
    </div>
  );
}

export default App;
