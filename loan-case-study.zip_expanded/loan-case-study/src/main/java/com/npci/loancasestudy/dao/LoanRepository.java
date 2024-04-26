package com.npci.loancasestudy.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npci.loancasestudy.model.Loan;

public interface LoanRepository extends JpaRepository<Loan, Long> {

}
