package com.example.back.entity;

import java.util.List;

import lombok.Data;

@Data
public class UsuarioInfo {

    private String username;
    private String nombre;
    private String apellido;
    private String password;
    private double saldo;
    private List<Transaccion> transacciones;

}
