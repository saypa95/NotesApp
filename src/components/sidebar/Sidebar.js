import { Button, Input, Tooltip } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";

const Sidebar = (props) => {
  return (
    <div className="app-sidebar">
      <div className="app-sidebar__header">
        <div className="app-sidebar__search-box">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: "100%", height: "100%" }}
            bordered={false}
          />
        </div>
        <Tooltip title="Add">
          <Button onClick={props.addNote} type="text" icon={<PlusOutlined />} className="app-sidebar__btn" />
        </Tooltip>
      </div>
      <div className="app-sidebar__notes-list">
        {props.notes.map((note) => {
          return (
            <div
              className={`app-sidebar__note ${props.activeNote === note.id ? "app-sidebar__note_active" : null}`}
              key={note.id}
              onClick={() => {props.setActiveNote(note.id)}}
            >
              <h2 className="app-sidebar__note-title">First note</h2>
              <div className="wrapper">
                <p className="app-sidebar__note-date">{dateFormat(Date(note.date), "dd.mm.yyyy")}</p>
                <p className="app-sidebar__note-preview">Lorem ipsum</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



export default Sidebar;
