import { Button, Input, Tooltip } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import { useState } from "react";
import { marked } from "marked";

const Sidebar = (props) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="app-sidebar">
      <div className="app-sidebar__header">
        <div className="app-sidebar__search-box">
          <Input
            value={searchValue}
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: "100%", height: "100%" }}
            bordered={false}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Tooltip title="Add">
          <Button onClick={props.addNote} type="text" icon={<PlusOutlined />} className="app-sidebar__btn" />
        </Tooltip>
      </div>
      <div className="app-sidebar__notes-list">
        {props.notes
          .filter((item) => item.value.toLowerCase().includes(searchValue.toLowerCase()))
          .map((note) => {
            const tokens = note.value ? marked.lexer(note.value) : [];
            const title = tokens.length ? (tokens[0].text?.length ? tokens[0].text : "Новая заметка") 
            : 
            "Новая заметка";
            const text = tokens[1] ? (tokens[1].text?.length ? tokens[1].text : "Нет дополнительного текста") 
            : 
            "Нет дополнительного текста";
            return (
              <div
                className={`app-sidebar__note ${props.activeNote === note.id ? "app-sidebar__note_active" : null}`}
                key={note.id}
                onClick={() => {
                  props.setActiveNote(note.id);
                }}
              >
                <h2 className="app-sidebar__note-title">{title.length>20 ? title.slice(0, 20)+"..." : title}</h2>
                <div className="wrapper">
                  <p className="app-sidebar__note-date">{dateFormat(Date(note.date), "dd.mm.yyyy")}</p>
                  <p className="app-sidebar__note-preview">{text.length>30 ? text.slice(0, 30)+"..." : text}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
