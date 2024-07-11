import React, { useState } from 'react';

const OrderComplaintForm = () => {
    // State variables to store form data
    const [orderId, setOrderId] = useState('');
    const [customer, setCustomer] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch("https://localhost:3000/api/support/complaint")
        console.log('Form submitted:', { orderId, customer, complaintType, description });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="orderId">Order ID:</label>
                <input type="text" id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
            </div>
            <div>
                <label htmlFor="customer">Customer:</label>
                <input type="text" id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
            </div>
            <div>
                <label htmlFor="complaintType">Complaint Type:</label>
                <select id="complaintType" value={complaintType} onChange={(e) => setComplaintType(e.target.value)}>
                    <option value="">Select</option>
                    <option value="Delivery Delay">Delivery Delay</option>
                    <option value="Product Quality">Product Quality</option>
                    <option value="Wrong Item">Wrong Item</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderComplaintForm;
