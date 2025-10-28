import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { getItems, postItem, deleteItem } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues, handleReset) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.link,
      weather: inputValues.weatherType,
    };

    postItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleReset();
        closeActiveModal();
      })
      .catch((error) => console.error("Failed to add item:", error));
  };

  const handleDeleteItem = (card) => {
    deleteItem(card._id || card.id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter(
            (item) => item.id !== card.id || item._id !== card._id
          )
        );
        closeActiveModal();
      })
      .catch((error) => console.error("Failed to delete item:", error));
  };

  function closeActiveModal() {
    setActiveModal("");
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch((error) => console.error("Failed to fetch weather data:", error));
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => console.error("Failed to load item:", error));
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  onAddItem={onAddItem}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeActiveModal}
          handleDeleteItem={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
