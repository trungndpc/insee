package com.vn.insee.zalobot.repository;


import com.vn.insee.zalobot.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Integer> {
}
