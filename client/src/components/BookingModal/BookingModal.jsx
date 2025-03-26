import React from "react";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
    if (!opened) return null; // Prevent rendering when modal is closed

    const handleClose = () => {
        setOpened(false); // Close the modal when called
    };

    return (
        <div 
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000
            }}
            onClick={handleClose} // Click outside modal to close
        >
            <div 
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    minWidth: "300px",
                    position: "relative"
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <h2>Book Property</h2>
                <p><strong>Property ID:</strong> {propertyId}</p>
                <p><strong>Your Email:</strong> {email}</p>
                
                <button onClick={handleClose} style={{ marginTop: "10px", padding: "5px 10px", background: "red", color: "white", border: "none", cursor: "pointer" }}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BookingModal;
