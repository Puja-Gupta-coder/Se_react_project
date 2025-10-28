import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" alt="Weather" src={logo} />
      <p className="header__date-and-location">
        {currentDate},{weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        {" "}
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegenge</p>
        <img src={avatar} alt="Terrence Tegenge" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
