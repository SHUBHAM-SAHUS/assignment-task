import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/HomePage';
import DetailsPage from '../pages/DetailsPage/DetailsPage';






const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>

    );
}

export default AppRouter;
