package com.basics.in.java.blogspot.formikServer.service;

import com.basics.in.java.blogspot.formikServer.entity.User;
import com.basics.in.java.blogspot.formikServer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
    }
}
