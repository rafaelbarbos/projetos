package com.streethub.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.streethub.auth.dto.LoginRequest;
import com.streethub.auth.dto.LoginResponse;
import com.streethub.auth.dto.RegisterRequest;
import com.streethub.auth.jwt.JwtTokenProvider;
import com.streethub.users.dto.UserCreateRequest;
import com.streethub.users.dto.UserResponse;
import com.streethub.users.entity.User;
import com.streethub.users.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public UserResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.username())) {
            throw new IllegalArgumentException("username_taken");
        }
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("email_taken");
        }

        User u = new User();
        u.setUsername(req.username());
        u.setDisplayName(req.displayName());
        u.setEmail(req.email());
        u.setPasswordHash(passwordEncoder.encode(req.password()));
        u.setAvatar(req.avatar());
        u.setBio(req.bio());

        User saved = userRepository.save(u);

        return new UserResponse(saved.getId(), saved.getUsername(), saved.getDisplayName(), saved.getEmail(), saved.getAvatar(), saved.getBio(), saved.isVerified(), saved.getFollowersCount(), saved.getFollowingCount(), saved.getReputation(), saved.getCreatedAt(), saved.getUpdatedAt());
    }

    public LoginResponse login(LoginRequest req) throws AuthenticationException {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.username(), req.password()));
        String token = tokenProvider.generateToken(auth);
        return new LoginResponse(token);
    }
}
