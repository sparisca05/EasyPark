package com.example.back.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back.entity.RecargaRequest;
import com.example.back.entity.Transaccion;
import com.example.back.entity.Usuario;
import com.example.back.entity.UsuarioInfo;
import com.example.back.repositories.ITransaccionRepository;
import com.example.back.repositories.IUsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    @Autowired
    private IUsuarioRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ITransaccionRepository transaccionRepository;


    public void saveUser(Usuario user) {
        // Encripta la contraseña antes de guardarla
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Guarda el usuario en la base de datos
        userRepository.save(user);
        System.out.println("Usuario guardado con éxito");
    }

    public UsuarioInfo getUserInfoByUsername(String username) {
        Usuario user = getUserByUsername(username);

        UsuarioInfo userInfo = new UsuarioInfo();
        userInfo.setNombre(user.getNombre());
        userInfo.setApellido(user.getApellido());
        userInfo.setUsername(user.getUsername());
        userInfo.setPassword(user.getPassword());
        userInfo.setSaldo(user.getSaldo());

        return userInfo;
    }

    public Usuario getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> userDetail = userRepository.findByUsername(username);

        return userDetail.map(user ->
                new org.springframework.security.core.userdetails.User(
                        user.getNombre(),
                        user.getPassword(),
                        user.getAuthorities()
                )).orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public Usuario updateUserById(Usuario request, Long userId){
        Usuario user = userRepository.findById(userId).get();

        user.setUsername(request.getUsername());
        user.setNombre(request.getNombre());
        user.setApellido(request.getApellido());
        user.setPassword(request.getPassword());
        saveUser(user);

        return user;
    }

    public String deleteUser(Long userId) {
        Usuario user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        userRepository.delete(user);
        return "Usuario eliminado";
    }
    
    public void recargarSaldo(Long idUsuario, RecargaRequest monto) {
        // Buscar el usuario por ID
        Usuario usuario = userRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Actualizar el saldo del usuario
        usuario.setSaldo(usuario.getSaldo() + monto.getMonto());
        userRepository.save(usuario);

        // Crear y guardar una nueva transacción
        Transaccion transaccion = new Transaccion();
        transaccion.setMonto(monto.getMonto());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        transaccion.setFecha(LocalDateTime.now().format(formatter));
        transaccion.setUsuario(usuario);
        transaccionRepository.save(transaccion);
    }

    public UsuarioInfo consultarSaldo(String username) {
        // Buscar el usuario por nombre de usuario
        Usuario usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Crear un objeto UsuarioInfo para devolver saldo y transacciones
        UsuarioInfo usuarioInfo = new UsuarioInfo();
        usuarioInfo.setSaldo(usuario.getSaldo());
        usuarioInfo.setTransacciones(transaccionRepository.findTop5ByUsuarioOrderByFechaDesc(usuario)); // Lista de las últimas 5 transacciones

        return usuarioInfo;
    }

}

