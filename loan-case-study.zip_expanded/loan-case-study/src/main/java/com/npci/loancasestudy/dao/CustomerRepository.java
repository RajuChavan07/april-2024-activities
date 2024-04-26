package com.npci.loancasestudy.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npci.loancasestudy.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	Optional<Customer> findByEmailIdAndPassword(String emailId, String password);

	Customer findByPan(String pan);

}
