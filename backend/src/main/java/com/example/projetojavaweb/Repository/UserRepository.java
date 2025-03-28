package com.example.projetojavaweb.Repository;

import com.example.projetojavaweb.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
