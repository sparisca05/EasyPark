package com.example.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="vehiculo") 
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;

    @Column(nullable = false, unique = true)
    private String placa;  

    @Column(nullable = false)
    private String tipoVehiculo;  

    @Column(nullable = false)
    private String programa;
    
    @Column(nullable = false, unique = true)
    private String documento; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;  // Relación muchos a uno con Usuario
}
