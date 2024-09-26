package com.example.back.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.back.entity.Transaccion;
import com.example.back.entity.Usuario;

@Repository
public interface ITransaccionRepository extends JpaRepository<Transaccion, Long> {

    List<Transaccion> findTop5ByUsuarioOrderByFechaAsc(Usuario usuario);

}
