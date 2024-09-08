package com.example.back.controllers;

import com.example.back.entity.Usuario;
import com.example.back.entity.UsuarioInfo;
import com.example.back.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
}
