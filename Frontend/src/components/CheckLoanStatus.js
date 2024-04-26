import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CheckLoanStatus.css';  // Custom CSS for additional styling

const CheckLoanStatus = () => {
  const { customerId } = useParams();  // Extract customerId from the route
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/api/customers/loanStatusOfCustomer/${customerId}`);
        setApplications(response.data);
        setIsLoading(false);  // Loading complete
      } catch (error) {
        console.error('Error fetching loan applications', error);
        setError('Failed to fetch loan applications. Please try again later.');  // Set error message
      }
    };

    fetchLoanApplications();  // Fetch data on component mount
  }, [customerId]);

  if (isLoading) {
    return <div className="loading">Loading loan applications...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="loan-status-container">  {/* Apply custom container style */}
      <h2>Loan Status</h2>
      {applications.length > 0 ? (
        <ul className="application-list">  {/* Style list with custom CSS */}
          {applications.map((application) => (
            <li key={application.applicationId} className="application-item">
              Loan ID: {application.applicationId}, Status: {application.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No loan applications found for this customer.</p>  
      )}
    </div>
  );
};

export default CheckLoanStatus;
