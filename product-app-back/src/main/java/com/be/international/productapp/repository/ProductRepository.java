package com.be.international.productapp.repository;

import java.util.List;

import com.be.international.productapp.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


public interface ProductRepository extends JpaRepository<Product, Integer>{


    Product findByProductcode(String productcode);

    @Transactional
    void deleteByProductcode(String productcode);
}
