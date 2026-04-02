package com.example.TaskManagerApp.TaskManagerApp.controller;

import com.example.TaskManagerApp.TaskManagerApp.exception.ObjectAlreadyExistsException;
import com.example.TaskManagerApp.TaskManagerApp.model.User;
import com.example.TaskManagerApp.TaskManagerApp.repository.UserRepository;
import com.example.TaskManagerApp.TaskManagerApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private PasswordEncoder encoder;
    private JwtUtil jwtUtils;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, PasswordEncoder encoder, JwtUtil jwtUtils, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @PostMapping("/signin")
    public Map<String, String> authenticateUser(@RequestBody User user){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtils.GenerateToken(userDetails.getUsername());

        return Map.of("token", token);
    }


    @PostMapping("/signup")
    public String registerUser(@RequestBody User user){
        if(userRepository.existsByUsername(user.getUsername())){
            throw new ObjectAlreadyExistsException("User already exists");
        }

        final User newUser = new User(user.getEmail(), null, encoder.encode(user.getPassword()), user.getUsername());

        userRepository.save(newUser);
        return "User registered successfully!";
    }


}
