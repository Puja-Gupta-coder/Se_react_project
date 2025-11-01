import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-item">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          onAddItem={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
