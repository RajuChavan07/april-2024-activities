package com.npci.loancasestudy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.npci.loancasestudy.dao.LoanApplicationRepository;
import com.npci.loancasestudy.model.LoanApplication;

@Service
public class LoanApplicationService {
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    public LoanApplication applyForLoan(LoanApplication loanApplication) {
        loanApplication.setStatus("Pending");
        return loanApplicationRepository.save(loanApplication);
    }

    public List<LoanApplication> getAllLoanApplications() {
        return loanApplicationRepository.findAll();
    }

    public LoanApplication updateApplicationStatus(Long applicationId, String status) {
        Optional<LoanApplication> application = loanApplicationRepository.findById(applicationId);
        if (application.isPresent()) {
            application.get().setStatus(status);
            return loanApplicationRepository.save(application.get());
        }
        throw new RuntimeException("Application not found");
    }
    
    public List<LoanApplication> getApplicationsByCustomerId(Long customerId) {
    	return loanApplicationRepository.findByCustomerId(customerId);
//    	return null;
    }
}
