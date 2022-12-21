import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Classroom, Teaching, Course, Layout, NoPage } from './pages'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="classroom" element={<Classroom />} />
          <Route path="teaching" element={<Teaching />} />
          <Route path="course" element={<Course />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App