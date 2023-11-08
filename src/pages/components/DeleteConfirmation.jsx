import "../../index.css"

export function Modal({ show, onClose, onConfirm }) {
    if (!show) {
      return null;
    }
  
    return (
      <div className="overlay">
        <div className="moduleContainer">
          <h3>Are You Sure?</h3>
          <p>You won't be able to access this entry again once you delete it.</p>
          <button onClick={onConfirm} className='deleteButton' style={{backgroundColor: 'var(--dailyChallenge)'}}>Delete</button>
          <button className='deleteButton' onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }