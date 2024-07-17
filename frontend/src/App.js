import React from 'react';
import ItemList from './components/ItemList';

function App() {
    return (
        <div className="App">
            <header className="bg-blue-500 text-white p-4">
                <h1 className="text-2xl">MERN CRUD App</h1>
            </header>
            <ItemList />
        </div>
    );
}

export default App;
