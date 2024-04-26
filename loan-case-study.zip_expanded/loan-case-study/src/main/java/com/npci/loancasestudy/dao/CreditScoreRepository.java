package com.npci.loancasestudy.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npci.loancasestudy.model.CreditScore;

public interface CreditScoreRepository extends JpaRepository<CreditScore, String> {

	public Optional<CreditScore> findByPan(String pan);
}