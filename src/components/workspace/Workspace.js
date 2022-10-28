import { useMemo, useContext } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { marked } from "marked";

import context from "../../context";

const Workspace = () => {
  const {editing, setEditing, deleteNote, activeNoteItem, editNote} = useContext(context);
  
  const noteContent = marked.parse(activeNoteItem ? activeNoteItem.value : '');

  const toggleEditing = () => {
    setEditing((editing) => !editing);
  };

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      maxHeight: "75vh",
    };
  }, []);

  return (
    <div className="app-main">
      <div className="app-main__header">
        <Button type="text" className="app-main__btn" onClick={toggleEditing}>
          {editing ? "Done" : "Edit"}
        </Button>
        <Tooltip title="Delete">
          <Button type="text" icon={<DeleteOutlined />} className="app-main__btn" onClick={deleteNote}/>
        </Tooltip>
      </div>
      {editing ? (
        <SimpleMdeReact
          value={activeNoteItem.value}
          onChange={editNote}
          className="app-main__content"
          options={options}
        />
      ) : (
        <NoteContentView noteContent={noteContent} />
      )}
    </div>
  );
};

const NoteContentView = ({ noteContent }) => {
  return <div className="app-main__content" dangerouslySetInnerHTML={{ __html: noteContent }}></div>;
};

export default Workspace;
