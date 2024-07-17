import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/api/items')
            .then(res => setItems(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = e => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/items', newItem)
            .then(res => setItems([...items, res.data]))
            .catch(err => console.log(err));
    };

    const handleDelete = id => {
        axios.delete(` http://localhost:5000/api/items/${id}`)
            .then(() => setItems(items.filter(item => item._id !== id)))
            .catch(err => console.log(err));
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    name="description"
                    value={newItem.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Item</button>
            </form>
            <ul>
                {items.map(item => (
                    <li key={item._id} className="border p-2 mb-2 flex justify-between">
                        <span>{item.name}: {item.description}</span>
                        <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-2">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
