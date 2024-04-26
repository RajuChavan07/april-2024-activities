package com.npci.loancasestudy.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.npci.loancasestudy.model.LoanApplication;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long>{
	
	@Query(value = "select * from loan_application where customer_id=:customerId",nativeQuery = true)
	List<LoanApplication> findByCustomerId(Long customerId);

}
