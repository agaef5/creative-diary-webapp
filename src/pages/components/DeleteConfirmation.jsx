import "../../index.css"

export function Modal({ show, onClose, onConfirm }) {
    if (!show) {
      return null;
    }
  
    return (
      <div className="overlay">
        <div className="moduleContainer">
          <p>Are you sure you want to delete this entry?</p>
          <button onClick={onConfirm}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }