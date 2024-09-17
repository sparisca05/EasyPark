package com.example.back.repositories;


import com.example.back.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVehiculoRepository extends JpaRepository<Vehiculo, Long> {
    
}
