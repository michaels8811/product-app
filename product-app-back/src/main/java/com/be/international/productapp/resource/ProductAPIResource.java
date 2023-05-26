package com.be.international.productapp.resource;

import java.util.List;

import com.be.international.productapp.entity.Product;
import com.be.international.productapp.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
public class ProductAPIResource {


    private ProductRepository productRepository;

    public ProductAPIResource(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/api/products")
    public List<Product> retrieveTodos() {
        return productRepository.findAll();
    }

    @GetMapping("/api/products/{productcode}")
    public ResponseEntity<Product> retrieveTodo(@PathVariable String productcode) {

        Product tempProduct = productRepository.findByProductcode(productcode);

        if (tempProduct == null) {
            throw new RuntimeException("Product Code not found - " + tempProduct);
        }

        return new ResponseEntity<>(tempProduct, HttpStatus.OK);

//        return productRepository.findByProductcode(productcode);
    }

    @DeleteMapping("/api/products/{productcode}")
    public ResponseEntity<String> deleteTodo(@PathVariable String productcode) {


//        Product tempProduct = productRepository.findByProductcode(productcode);
//
//        if (tempProduct == null) {
//            throw new RuntimeException("Product Code not found - " + tempProduct);
//        }

        productRepository.deleteByProductcode(productcode);

        return new ResponseEntity<>("Product deleted successfully.", HttpStatus.OK);
    }

    @PutMapping("/api/products/{productcode}")
    public ResponseEntity<Product> updateTodo( @PathVariable String productcode, @RequestBody Product product) {


        Product tempProduct = productRepository.findByProductcode(productcode);

        if (tempProduct == null) {
            throw new RuntimeException("Product Code not found - " + tempProduct);
        }
        product.setId(tempProduct.getId());
        productRepository.save(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/api/products")
    public ResponseEntity<Product> createTodo(@RequestBody Product product) {

        Product savedProduct = productRepository.save(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);

    }



}
