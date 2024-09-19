package com.example.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.back.entity.Transaccion;

@Repository
public interface ITransaccionRepository extends JpaRepository<Transaccion, Long> {
}
