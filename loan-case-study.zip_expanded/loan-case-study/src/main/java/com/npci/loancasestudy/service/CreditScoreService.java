package com.npci.loancasestudy.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.npci.loancasestudy.dao.CreditScoreRepository;
import com.npci.loancasestudy.model.CreditScore;

@Service
public class CreditScoreService {
	@Autowired
	private CreditScoreRepository creditScoreRepository;

	public Optional<CreditScore> getCreditScoreByPanNumber(String pan) {
		return creditScoreRepository.findByPan(pan);
	}
}