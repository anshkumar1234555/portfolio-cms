package portfolio_cms_backend.service;

import portfolio_cms_backend.dto.LoginRequest;
import portfolio_cms_backend.dto.LoginResponse;
import portfolio_cms_backend.dto.RegisterRequest;
import portfolio_cms_backend.model.User;
import portfolio_cms_backend.repository.UserRepository;
import portfolio_cms_backend.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        String encodedPassword =
                passwordEncoder.encode(request.getPassword());

        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setRole("ADMIN");

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password")
                );

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail(),
                        user.getRole()
                );

        return new LoginResponse(
                token,
                user.getEmail(),
                user.getRole()
        );
    }
}