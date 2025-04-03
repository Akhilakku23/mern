import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
    if (!opened) return null; // Prevent rendering when modal is closed

    const [visitDate, setVisitDate] = useState("");

    const handleClose = () => {
        setOpened(false); // Close the modal when called
    };

    const mutation = useMutation(async () => {
        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ propertyId, email, visitDate })
        });
        if (!response.ok) throw new Error("Failed to book visit");
        return response.json();
    });

    const handleBooking = () => {
        if (!visitDate) {
            alert("Please select a date for your visit.");
            return;
        }
        
        mutation.mutate(undefined, {
            onSuccess: () => {
                alert("Your visit has been booked successfully!");
                handleClose();
            },
            onError: () => {
                alert("Failed to book visit. Please try again.");
            }
        });
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
                <h2>Book Property Visit</h2>
                <p><strong>Property ID:</strong> {propertyId}</p>
                <p><strong>Your Email:</strong> {email}</p>
                
                <label>
                    <strong>Select Visit Date:</strong>
                    <input 
                        type="date" 
                        value={visitDate} 
                        onChange={(e) => setVisitDate(e.target.value)} 
                        style={{ display: "block", marginTop: "5px", padding: "5px", width: "100%" }}
                    />
                </label>
                
                <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                    <button 
                        onClick={handleBooking} 
                        style={{ padding: "8px 15px", background: "green", color: "white", border: "none", cursor: "pointer" }}
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Booking..." : "Book Visit"}
                    </button>
                    <button 
                        onClick={handleClose} 
                        style={{ padding: "8px 15px", background: "red", color: "white", border: "none", cursor: "pointer" }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;

