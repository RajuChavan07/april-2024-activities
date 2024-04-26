package com.npci.loancasestudy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npci.loancasestudy.dao.LoanApplicationRepository;
import com.npci.loancasestudy.dao.LoanRepository;
import com.npci.loancasestudy.model.Loan;
import com.npci.loancasestudy.model.LoanApplication;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository;
    @Autowired
    private LoanApplicationRepository loanapplicationRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }
    
    public LoanApplication applyForLoan(LoanApplication application) {
    	
    	application.setStatus("Pending");
    	
    	return loanapplicationRepository.save(application);
    }
}
