package com.vn.insee.zalobot.service;

import com.vn.insee.zalobot.entity.CustomerEntity;
import com.vn.insee.zalobot.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    public static CustomerService INSTANCE;

    @Autowired
    private static CustomerService customerService;

    public CustomerService(CustomerRepository customerRepository) {
        INSTANCE = this;
        this.customerRepository = customerRepository;
    }

    @Autowired
    private CustomerRepository customerRepository;

    public void test() {
        System.out.println("NONE.........");
        List<CustomerEntity> all = customerRepository.findAll();
        System.out.println(all);
    }




}
