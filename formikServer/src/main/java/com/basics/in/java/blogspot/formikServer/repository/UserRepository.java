package com.basics.in.java.blogspot.formikServer.repository;

import com.basics.in.java.blogspot.formikServer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
