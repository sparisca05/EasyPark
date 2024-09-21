package com.example.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.entity.RegistrarVehiculoRequest;
import com.example.back.entity.Usuario;
import com.example.back.exceptions.InvalidVehiculoException;
import com.example.back.services.UsuarioService;
import com.example.back.services.VehiculoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/registra-vehiculo")
@RequiredArgsConstructor
public class VehiculoController {

    @Autowired
    private VehiculoService vehiculoService;
    private final UsuarioService usuarioService;
    
    @GetMapping
    public String get() {
        return "GET: vehiculo";
    }

    @PostMapping
    public void registrarVehiculo(@RequestBody RegistrarVehiculoRequest vehiculo){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario user = usuarioService.getUserByUsername(username);
        vehiculoService.saveVehiculo(vehiculo, user);
    }
    
    @ExceptionHandler(InvalidVehiculoException.class)
    public ResponseEntity<String> handleInvalidVehiculoException(InvalidVehiculoException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

}
