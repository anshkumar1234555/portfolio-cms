package portfolio_cms_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(
                        request -> {

                            var configuration =
                                    new org.springframework.web.cors.CorsConfiguration();

                            configuration.setAllowedOrigins(
                                    java.util.List.of(
                                            "http://localhost:5173"
                                    )
                            );

                            configuration.setAllowedMethods(
                                    java.util.List.of(
                                            "GET",
                                            "POST",
                                            "PUT",
                                            "DELETE",
                                            "OPTIONS"
                                    )
                            );

                            configuration.setAllowedHeaders(
                                    java.util.List.of("*")
                            );

                            configuration.setAllowCredentials(true);

                            return configuration;
                        }
                ))

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()

                        .requestMatchers(
                                "/api/public/projects",
                                "/api/public/projects/**",

                                "/api/public/profile",
                                "/api/public/profile/**",

                                "/api/public/skills",
                                "/api/public/skills/**",

                                "/api/public/experiences",
                                "/api/public/experiences/**",

                                "/api/public/education",
                                "/api/public/education/**",

                                "/api/public/contact",

                                "/api/public/certifications",
                                "/api/public/certifications/**",

                                "/api/public/blog",
                                "/api/public/blog/**"
                        ).permitAll()

                        .requestMatchers(
                                "/api/dashboard/**"
                        ).authenticated()

                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}