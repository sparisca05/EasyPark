package com.example.back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.entity.RecargaRequest;
import com.example.back.entity.Usuario;
import com.example.back.entity.UsuarioInfo;
import com.example.back.services.UsuarioService;

@RestController
@RequestMapping("api/v1/perfil")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Información de perfil propio
    @GetMapping
    public UsuarioInfo getUserProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        return usuarioService.getUserInfoByUsername(username);
    }

    // Editar perfil
    @PutMapping
    public Usuario updateUserProfile(@RequestBody Usuario request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        Long id = usuarioService.getUserByUsername(username).getId();
        return usuarioService.updateUserById(request, id);
    }

    // Eliminar perfil
    @DeleteMapping
    public String deleteUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        return usuarioService.deleteUser(usuarioService.getUserByUsername(username).getId());
    }
    // Recargar saldo del usuario autenticado
    @PostMapping("/recargar")
    public String recargarSaldo(@RequestBody RecargaRequest monto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName(); // Obtener el username del usuario autenticado
        Long id = usuarioService.getUserByUsername(username).getId();
        usuarioService.recargarSaldo(id, monto);
        return "Recarga exitosa";
    }

    // Consultar saldo y movimientos del usuario autenticado
    @GetMapping("/saldo")
    public UsuarioInfo consultarSaldo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return usuarioService.consultarSaldo(username);
    }


}
