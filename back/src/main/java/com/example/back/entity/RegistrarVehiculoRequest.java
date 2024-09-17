package com.example.back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrarVehiculoRequest {

    private String documento;
    private String programa;
    private String vehiculo;
    private String placa;

}
