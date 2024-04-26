
import {Link, useNavigate, useParams,useLocation} from "react-router-dom";
import {useState} from "react";
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';



export function CustomerRegistration(){
    const [emailId, setEmailId] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [pan, setPan] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
  
    const validateForm = () => {
      const errors = {};
      
      if (firstname.length < 3) {
        errors.firstname = 'First Name must be at least 3 characters';
      }
  
      if (lastname.length < 1) {
        errors.lastname = 'Last Name is required';
      }
  
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;
      if (!password.match(passwordPattern)) {
        errors.password = 'Password must be at least 8 characters and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.';
      }
  
      if (pan.length === 0) {
        errors.pan = 'PAN is required';
      }
  
      const phonePattern = /^\d{10}$/;
      if (!phone.match(phonePattern)) {
        errors.phone = 'Phone number must be 10 digits';
      }
  
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        const customer = {
          firstname: firstname,
          lastname: lastname,
          email_id: emailId,
          password: password,
          pan: pan,
          phone: phone,
        };
        
        const url = 'http://localhost:8080/customer/v1/add-customer';
        axios.post(url, customer)
          .then(response => navigate('/login'))
          .catch(err => navigate('/register'));
      }
    };

    return (
        <div className="container">
            <h3>Registration Form</h3><hr />
            <form onSubmit={handleSubmit}>
                <div className="w-25">
                    <label>Enter First Name</label>
                    <input type='text' className="form-control" onChange={e => setFirstName(e.target.value)}></input>
                    {errors.firstname && <div className="error text-danger">{errors.firstname}</div>}
                </div>
                <div className="w-25">
                    <label>Enter Last Name</label>
                    <input type='text' className="form-control" onChange={e => setLastName(e.target.value)}></input>
                    {errors.lastname && <div className="error text-danger">{errors.lastname}</div>}
                </div>
                <div className="w-25">
                    <label>Enter Email</label>
                    <input type='email' className="form-control" onChange={e => setEmailId(e.target.value)}></input>
                </div>
                <div className="w-25">
                    <label>Enter Password</label>
                    <input type='password' className="form-control" onChange={e => setPassword(e.target.value)}></input>
                    {errors.password && <div className="error text-danger">{errors.password}</div>}
                </div>
                <div className="w-25">
                    <label>Enter Mobile Number</label>
                    <input type='number' className="form-control" onChange={e => setPhone(e.target.value)}></input>
                    {errors.phone && <div className="error text-danger">{errors.phone}</div>}
                </div>
                <div className="w-25">
                    <label>Enter PAN</label>
                    <input type='text' className="form-control" onChange={e => setPan(e.target.value)}></input>
                    {errors.pan && <div className="error text-danger">{errors.pan}</div>}
                </div>
                <br />
                <div className="w-25">
                    <input className="btn btn-primary form-control" type='submit' value='Register'></input>
                </div>
            </form>
            
            <div>
                <Link to = '/login'>Login</Link>
            </div>
        </div>
    );
}



export function CustomerLogin() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store error message
  
    // To programmatically navigate
    const navigate = useNavigate();
  
    // Authenticate email and password
    const handleSubmit = (e) => {
      e.preventDefault();
      const loginJson = { email_id: emailId, password: password };
      const url = 'http://localhost:8080/customer/v1/login';
  
      axios
        .post(url, loginJson)
        .then((res) => {
          if (res.data === 'not found') {
            setError('User not found');
          } else {
            navigate('/success/' + res.data.customer_id, { state: res.data });
          }
        })
        .catch((err) => {
          setError('User not found');
        });
    };
  
    return (
        <div className="container">
      <h3>Login Form</h3>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="w-25">
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmailId(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <div className="w-25">
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <div>
          <input type="submit" className="btn btn-secondary" value="Login"></input>
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>} 
      <div>
        <Link to="/register">Create Profile</Link>
      </div>
    </div>
    );
  }

  export function CustomerSuccess() {
    let { customer_id } = useParams(); 
    let data = useLocation();
    let mainCredential = data.state;
    let [user, setUser] = useState(mainCredential);
  
    return (
      <div className="row">
        <div className="col-4">
          {user ? (
            <div>
              <p>Name: {user.firstname}</p>
              <p>Birthday: {user.pan}</p>
              <p>Phone: {user.phone}</p>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
        <div className="col-6">
          <Link to="applyLoan">Apply Loan</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="viewLoans">View Loans</Link>
  
          <div>
            <Routes>
              <Route path="" element={<div>Welcome, {customer_id}</div>}></Route>
              <Route path="dashboard" element={<div>Welcome, {customer_id}</div>}></Route>
              <Route path="applyLoan" element={<ApplyLoan />}></Route>
              <Route path="viewLoans" element={<ViewLoans />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    );
  }
  

export function ApplyLoan(){
    const { customer_id } = useParams();
    const [selectedOption, setSelectedOption] = useState('secured');
    const [apiResponse, setApiResponse] = useState(null);
  
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const callApi = () => {

        const requestData = {
            "customer_id_ref": { "customer_id": customer_id },
            "loan_id_ref": {
                "loan_type": selectedOption
            }
        };

        console.log(requestData,"9876543234567890987654");
    
        axios.post('http://localhost:8080/loan-application/v1/apply-loan', requestData)
          .then((response) => {
            setApiResponse(`API call successful: ${response.data}`);
          })
          .catch((error) => {
            console.error('API call failed:', error);
            setApiResponse('An error occurred while making the API call. Please try again later.');
          });
      };
  
    return (
        <div>
        <h2>Apply for loan</h2>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="secured">Secured Loan</option>
          <option value="gold">Gold Loan</option>
          <option value="personal">Personal Loan</option>
        </select>
        <p>Selected option: {selectedOption}</p>
        <button onClick={callApi}>Apply for Loan</button>
        {apiResponse && <p>{apiResponse}</p>}
      </div>
    );
  }

  function ViewLoans() {
    const { customer_id } = useParams();
    const [apiResponse, setApiResponse] = useState(null);
  
    const callApi = () => {
      fetch(`http://localhost:8080/loan-application/v1/getAllLoansById/${customer_id}`)
        .then((response) => response.json())
        .then((data) => {
         
          setApiResponse(data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };
  
    return (
      <div>
        <h2>View Loans</h2>
        <button onClick={callApi}>View Loan Details</button>
        {apiResponse && (
          <div>
            <h3>Loan Application Details</h3>
            <p>Application ID: {apiResponse[0].application_id}</p>
            <p>Customer ID: {apiResponse[0].customer_id_ref.customer_id}</p>
            <p>First Name: {apiResponse[0].customer_id_ref.firstname}</p>
            <p>Last Name: {apiResponse[0].customer_id_ref.lastname}</p>
            <p>Email: {apiResponse[0].customer_id_ref.email_id}</p>
            <p>Loan Type: {apiResponse[0].loan_id_ref.loan_type}</p>
            <p>Status: {apiResponse[0].status}</p>
          </div>
        )}
      </div>
    );
  }
  
  
  