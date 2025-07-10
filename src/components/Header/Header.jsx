import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" />
      <p className="header__date-and-location">DATE,LOCATION</p>
      <button className="header__add-clothes-btn">Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Name</p>
        <img src="" alt="" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
