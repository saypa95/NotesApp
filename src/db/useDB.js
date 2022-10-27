import { useLiveQuery } from "dexie-react-hooks";
import db from ".";

function useDB() {
  const { notes } = db;

  const addNote = async () => {
    await notes.add({
      value: "# Новая заметка",
      date: Date.now(),
    });
  };

  const notesList = useLiveQuery(() => notes.toArray(), []);

  return { notesList, addNote };
}

export default useDB;
