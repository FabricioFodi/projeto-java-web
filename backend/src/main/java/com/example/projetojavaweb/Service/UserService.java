package com.example.projetojavaweb.Service;

import com.example.projetojavaweb.Model.User;
import com.example.projetojavaweb.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    // No lugar de @AutoWired usar esse.
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
