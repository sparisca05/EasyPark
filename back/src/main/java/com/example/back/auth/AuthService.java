package com.example.back.auth;

import com.example.back.config.JwtService;
import com.example.back.entity.Role;
import com.example.back.entity.Usuario;
import com.example.back.repositories.IUsuarioRepository;
import com.example.back.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUsuarioRepository userRepository;
    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario user;
        user = Usuario.builder()
                .username(request.getUsername())
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .password(request.getPassword())
                .rol(Role.USUARIO)
                .build();
        usuarioService.saveUser(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

}
