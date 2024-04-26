import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import ViewLoans from './components/ViewLoans';
import ApplyLoan from './components/ApplyLoan';
import CheckLoanStatus from './components/CheckLoanStatus';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />  {/* Navigation at the top */}
      <div className="container mt-3">  {/* Bootstrap container for spacing */}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-loans" element={<ViewLoans />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/check-loan-status/:customerId" element={<CheckLoanStatus />} />
          <Route exact path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
