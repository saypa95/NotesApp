import { useContext } from "react";
import { Button, Input, Tooltip } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import context from "../../context";
import NotesList from "../notesList/NotesList";


const Sidebar = () => {
  const {addNote, searchValue, setSearchValue} = useContext(context);

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
          <Button onClick={addNote} type="text" icon={<PlusOutlined />} className="app-sidebar__btn" />
        </Tooltip>
      </div>
      <NotesList/>
    </div>
  );
};

export default Sidebar;
