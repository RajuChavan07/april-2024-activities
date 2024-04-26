package com.npci.loancasestudy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npci.loancasestudy.dao.CustomerRepository;
import com.npci.loancasestudy.dao.LoanApplicationRepository;
import com.npci.loancasestudy.model.Customer;
import com.npci.loancasestudy.model.LoanApplication;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private LoanApplicationRepository loanApplicationRepository;

	public Customer registerCustomer(Customer customer) {
		customer.setPassword(customer.getPassword());
		return customerRepository.save(customer);
	}

	public Optional<Customer> findByEmailAndPassword(String emailId, String password) {
		Optional<Customer> customer = customerRepository.findByEmailIdAndPassword(emailId, password);
		if (customer.isPresent()) {
			return customer;
		}
		return Optional.empty();
	}

	public List<LoanApplication> getAllLoanApplication() {
		return loanApplicationRepository.findAll();
	}
}
