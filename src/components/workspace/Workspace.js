import { Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { marked } from "marked";
import SimpleMdeReact from "react-simplemde-editor";
import { useMemo } from "react";

const Workspace = (props) => {
  const noteContent = marked.parse(props.activeNote ? props.activeNote.value : '');

  const toggleEditing = () => {
    props.setEditing((editing) => !editing);
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
          {props.editing ? "Done" : "Edit"}
        </Button>
        <Tooltip title="Delete">
          <Button type="text" icon={<DeleteOutlined />} className="app-main__btn" onClick={props.deleteNote}/>
        </Tooltip>
      </div>
      {props.editing ? (
        <SimpleMdeReact
          value={props.activeNote.value}
          onChange={props.editNote}
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
