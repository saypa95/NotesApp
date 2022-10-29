import { useContext } from "react";
import { marked } from "marked";
import dateFormat from "dateformat";

import context from "../../context";

const NotesList = () => {
  const {notes, setActiveNote, activeNote, searchValue } = useContext(context);

  return (
    <div className="app-sidebar__notes-list">
      {notes
        .filter((item) => item.value.toLowerCase().includes(searchValue.toLowerCase()))
        .map((note) => {
          const tokens = note.value ? marked.lexer(note.value) : [];
          const title = tokens.length ? (tokens[0].text?.length ? tokens[0].text : "Новая заметка") : "Новая заметка";
          const text = tokens[1]
            ? tokens[1].text?.length
              ? tokens[1].text
              : "Нет дополнительного текста"
            : "Нет дополнительного текста";
          return (
            <div
              className={`app-sidebar__note ${activeNote === note.id ? "app-sidebar__note_active" : null}`}
              key={note.id}
              onClick={() => {
                setActiveNote(note.id);
              }}
            >
              <h2 className="app-sidebar__note-title">{title.length > 20 ? title.slice(0, 20) + "..." : title}</h2>
              <div className="wrapper">
                <p className="app-sidebar__note-date">{dateFormat(Date(note.date), "dd.mm.yyyy")}</p>
                <p className="app-sidebar__note-preview">{text.length > 30 ? text.slice(0, 30) + "..." : text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default NotesList;