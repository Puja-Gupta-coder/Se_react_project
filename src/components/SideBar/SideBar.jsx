import "./SideBar.css";
import avater from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img className="sidebar__avater" src={avater} alt="avater" />
        <p className="sidebar__username">User name</p>
      </div>
    </div>
  );
}

export default SideBar;
