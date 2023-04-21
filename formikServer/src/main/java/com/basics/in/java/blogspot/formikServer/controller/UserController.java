package com.basics.in.java.blogspot.formikServer.controller;

import com.basics.in.java.blogspot.formikServer.dto.UserDto;
import com.basics.in.java.blogspot.formikServer.entity.User;
import com.basics.in.java.blogspot.formikServer.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDto, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        if (!userDto.getPassword().equals(userDto.getConfirmPassword())) {
            result.rejectValue("confirmPassword", "Passwords do not match","Passwords do not match");
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        userService.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}
