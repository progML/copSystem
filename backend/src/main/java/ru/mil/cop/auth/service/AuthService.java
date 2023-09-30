package ru.mil.cop.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.mil.cop.auth.dto.AuthenticationResponse;
import ru.mil.cop.auth.dto.UserDto;
import ru.mil.cop.security.JwtProvider;


@Service
public class AuthService {

    private AuthenticationManager authenticationManager;
    private JwtProvider jwtProvider;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    public AuthenticationResponse login(UserDto userDto) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(),
                    userDto.getPassword()));
            if (authenticate != null && authenticate.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(authenticate);
                String authenticationToken = jwtProvider.generateToken(authenticate);
                return AuthenticationResponse.builder()
                        .authenticationToken(authenticationToken)
                        .build();
            }
        } catch (AuthenticationException authenticationException) {
            return AuthenticationResponse.builder()
                    .build();
        }
        return AuthenticationResponse.builder()
                .build();
    }
}
