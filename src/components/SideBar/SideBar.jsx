import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__username">User name</p>
      </div>
    </div>
  );
}

export default SideBar;
