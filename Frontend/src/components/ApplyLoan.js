import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ApplyLoan.css'; // Import custom CSS for styling

const ApplyLoan = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoanId, setSelectedLoanId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:9091/api/customers/getAllLoan');
        setLoans(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching loans', error);
        setError('Could not fetch loans. Please try again later.');
      }
    };

    fetchLoans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'loanId') {
      setSelectedLoanId(value);
    } else if (name === 'customerId') {
      setCustomerId(value);
    }
  };

  const applyForLoan = async () => {
    if (!selectedLoanId || !customerId) {
      alert('Please select a loan and enter your Customer ID.');
      return;
    }

    const application = {
      customer: {
        customerId,
      },
      loan: {
        loanId: selectedLoanId,
      },
      status: 'Pending',
    };

    try {
      await axios.post('http://localhost:9091/api/customers/applyLoan', application);
      alert('Loan application successful');
      navigate(`/check-loan-status/${customerId}`); // Navigate with customerId
    } catch (error) {
      console.error('Error applying for loan', error);
      alert('Loan application failed');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading available loans...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="apply-loan-container">
      <h2>Apply for Loan</h2>
      <form>
        <input
          type="text"
          name="customerId"
          placeholder="Enter your Customer ID"
          value={customerId}
          onChange={handleChange}
          required
          className="form-input"
        />

        <select
          name="loanId"
          value={selectedLoanId}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="" disabled>
            Select a Loan
          </option>
          {loans.map((loan) => (
            <option key={loan.loanId} value={loan.loanId}>
              {loan.loanType}
            </option>
          ))}
        </select>

        <button type="button" onClick={applyForLoan} className="apply-button">
          Apply
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;
