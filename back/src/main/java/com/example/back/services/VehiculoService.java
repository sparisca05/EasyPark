package com.example.back.services;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back.entity.RegistrarVehiculoRequest;
import com.example.back.entity.Usuario;
import com.example.back.entity.Vehiculo;
import com.example.back.exceptions.InvalidVehiculoException;
import com.example.back.repositories.IVehiculoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VehiculoService {

    @Autowired
    private IVehiculoRepository vehiculoRepository;

    public void saveVehiculo(RegistrarVehiculoRequest request, Usuario user) {
        if (Objects.isNull(request.getDocumento()) || 
            Objects.isNull(request.getPrograma()) || 
            Objects.isNull(request.getVehiculo()) || 
            Objects.isNull(request.getPlaca()) || 
            Objects.isNull(user)) {
            throw new InvalidVehiculoException("Todos los campos son obligatorios y no pueden ser nulos");
        }

        Vehiculo vehiculo = new Vehiculo();
        
        vehiculo.setDocumento(request.getDocumento());
        vehiculo.setPrograma(request.getPrograma());
        vehiculo.setTipoVehiculo(request.getVehiculo());
        vehiculo.setPlaca(request.getPlaca());
        vehiculo.setUsuario(user);

        vehiculoRepository.save(vehiculo);
        System.out.println("Vehiculo registrado con exito");
    }

}
