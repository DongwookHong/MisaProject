package org.example.misa;

import org.example.misa.component.JwtUtils;
import org.example.misa.filter.ApiKeyAuthProvider;
import org.example.misa.filter.ApiKeyFilter;
import org.example.misa.filter.JwtAuthenticationProvider;
import org.example.misa.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private JwtUtils jwtUtils;

    public SecurityConfig(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/**")
                .authorizeHttpRequests((customizer) -> customizer
                        .requestMatchers(HttpMethod.POST, "/api/stores").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/stores/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/stores/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().denyAll())
                .addFilterBefore(new JwtFilter(jwtAuthenticationManager()), AuthorizationFilter.class)
                .addFilterBefore(new ApiKeyFilter(apiAuthenticationManager()), JwtFilter.class)
                .formLogin(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement((customizer) -> customizer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }

    @Bean
    public SecurityFilterChain defaultFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((customizer) -> customizer
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/login").permitAll()
                        .requestMatchers("/test/**").permitAll()
                        .anyRequest().authenticated())
                .formLogin(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public AuthenticationManager apiAuthenticationManager() {
        ApiKeyAuthProvider apiKeyAuthProvider = new ApiKeyAuthProvider();

        return new ProviderManager(apiKeyAuthProvider);
    }

    @Bean
    public AuthenticationManager jwtAuthenticationManager() {
        JwtAuthenticationProvider jwtAuthenticationProvider = new JwtAuthenticationProvider(jwtUtils);

        return new ProviderManager(jwtAuthenticationProvider);
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);


        ProviderManager providerManager = new ProviderManager(authenticationProvider);
        providerManager.setEraseCredentialsAfterAuthentication(false);

        return providerManager;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails adminDetails = User.withUsername("misaadmin")
                .password("{bcrypt}$2a$10$6ObTn/3Pz.qRC9/jmAetveqRno6UkeYo3BFNlUJU7ub03d7EGocgK")
                .roles("ADMIN", "USER")
                .build();

        return new InMemoryUserDetailsManager(adminDetails);
    }

    @Bean
    public PasswordEncoder passwordEncoder() { //withDefaultPasswordEncoder 사용시 필요
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
