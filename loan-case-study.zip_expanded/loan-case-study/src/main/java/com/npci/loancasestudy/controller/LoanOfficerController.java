package com.npci.loancasestudy.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.npci.loancasestudy.model.CreditScore;
import com.npci.loancasestudy.model.LoanApplication;
import com.npci.loancasestudy.service.CreditScoreService;
import com.npci.loancasestudy.service.LoanApplicationService;

@RestController
@RequestMapping("/api/loan-officers")
@CrossOrigin(origins = "*")
public class LoanOfficerController {
	@Autowired
	private LoanApplicationService loanApplicationService;
	@Autowired
	private CreditScoreService creditScoreService;

	@GetMapping("/applications")
	public ResponseEntity<List<LoanApplication>> viewApplications() {
		return ResponseEntity.ok(loanApplicationService.getAllLoanApplications());
	}

	@PutMapping("/update/{applicationId}")
	public ResponseEntity<LoanApplication> updateApplicationStatus(@PathVariable Long applicationId,
			@RequestBody Map<String, String> updateRequest) {
		String status = updateRequest.get("status");
		LoanApplication updatedApplication = loanApplicationService.updateApplicationStatus(applicationId, status);
		return ResponseEntity.ok(updatedApplication);
	}

	@GetMapping("/credit-score/{pan}")
	public ResponseEntity<CreditScore> viewCreditScore(@PathVariable String pan) {
		Optional<CreditScore> creditScore = creditScoreService.getCreditScoreByPanNumber(pan);
		return creditScore.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
}