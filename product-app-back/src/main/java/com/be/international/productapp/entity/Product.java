package com.be.international.productapp.entity;
import java.io.Serializable;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "productcode")
    private String productcode;

    @Column(name = "productname")
    private String productname;

    @Column(name = "category")
    private String category;

    @Column(name = "brand")
    private String brand;

    @Column(name = "type")
    private String type;

    @Column(name = "productdesc")
    private String productdesc;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductcode() {
        return productcode;
    }

    public void setProductcode(String productcode) {
        this.productcode = productcode;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProductdesc() {
        return productdesc;
    }

    public void setProductdesc(String productdesc) {
        this.productdesc = productdesc;
    }

    public Product(String productcode, String productname, String category, String brand, String type, String productdesc) {
        this.productcode = productcode;
        this.productname = productname;
        this.category = category;
        this.brand = brand;
        this.type = type;
        this.productdesc = productdesc;
    }

    public Product() {
    }
}