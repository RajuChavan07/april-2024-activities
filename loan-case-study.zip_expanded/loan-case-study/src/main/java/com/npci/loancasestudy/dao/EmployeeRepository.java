package com.npci.loancasestudy.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.npci.loancasestudy.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	Employee findByEmailId(String emailId);
}