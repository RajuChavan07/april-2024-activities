import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewLoans.css';  // Custom CSS for additional styling

const ViewLoans = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:9091/api/customers/getAllLoan');
        setLoans(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching loans', error);
        setError('Failed to fetch loans. Please try again later.');
      }
    };

    fetchLoans();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading available loans...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="view-loans-container">  {/* Apply custom container style */}
      <h2 className="heading">Available Loans</h2>  {/* Style the heading */}
      <ul className="loan-list">  {/* Apply custom styling for list */}
        {loans.map((loan) => (
          <li key={loan.loanId} className="loan-item">  {/* Style list items */}
            {loan.loanType }  
            <button
              // className="apply-button"
              onClick={() => alert(`Applying for ${loan.loanType}`)}
            >
              Apply  {/* Apply with reduced size */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewLoans;
