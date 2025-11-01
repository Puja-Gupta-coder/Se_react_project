import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleDeleteItem }) {
  // Protect against empty objects or missing card
  if (!card || Object.keys(card).length === 0) return null;

  const itemId = card.id || card._id || null;
  const weatherText = card.weather
    ? card.weather.charAt(0).toUpperCase() + card.weather.slice(1)
    : "Not specified";

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl || card.link}
          alt={card.name || "item"}
          className="modal__image"
          id="image-modal"
        />
        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name || "Unnamed"}</h2>
            <button
              type="button"
              className="modal__delete-btn"
              onClick={() =>
                itemId && handleDeleteItem && handleDeleteItem(card)
              }
              disabled={!itemId}
              title={
                !itemId ? "This item cannot be deleted (no id)" : "Delete item"
              }
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {weatherText}</p>
          {!itemId && (
            <p className="modal__note">
              This item hasn't been saved to the backend and cannot be deleted.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
