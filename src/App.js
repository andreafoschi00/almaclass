import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Classroom, Teaching, Course, Layout, NoPage, ClassroomDetails, TeachingDetails, CourseDetails } from './pages'; 

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="classroom" element={<Classroom />} />
          <Route path="classroom/details" element={<ClassroomDetails />} />
          <Route path="teaching" element={<Teaching />} />
          <Route path="teaching/details" element={<TeachingDetails />} />
          <Route path="course" element={<Course />} />
          <Route path="course/details" element={<CourseDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App