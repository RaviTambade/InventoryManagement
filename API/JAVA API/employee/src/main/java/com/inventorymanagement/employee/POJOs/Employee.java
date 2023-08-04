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
@Table(name="employees")
public class Employee {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
     @Column(name = "userid")
    private Integer UserId;
     @Column(name = "imageurl")
    private String ImageUrl;
    @Column(name = "departmentid")
    private Integer Departmentid;
    @Column(name = "roleid")
    private Integer RoleId;
}
