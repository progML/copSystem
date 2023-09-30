package ru.mil.cop.auth.dto;

import lombok.Data;

@Data
public class UserDto {

    private Integer id;
    private String username;
    private String password;

}
