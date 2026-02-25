import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CareerAssessmentApp from './CareerAssessmentApp';
import ExamSchedule from './ExamSchedule';
import Results from './Results';
import CareerPathAssessment from './CareerPathAssessment';
import HostDashboard from './HostDashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<CareerAssessmentApp />} />
    <Route path="/host" element={<HostDashboard />} />
  <Route path="/exam-schedule" element={<ExamSchedule />} />
  <Route path="/results" element={<Results />} />
  <Route path="/results/:id" element={<Results />} />
  <Route path="/career-assessment" element={<CareerPathAssessment />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);