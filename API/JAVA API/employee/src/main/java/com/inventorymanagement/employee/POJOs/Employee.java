package com.inventorymanagement.employee.POJOs;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
@Entity
@Table(name="employee")
public class Employee {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer UserId;
     @Column(name = "imageurl")
    private String ImageUrl;
    @Column(name = "department")
    private String Department;
    @Column(name = "role")
    private String Role;
}
