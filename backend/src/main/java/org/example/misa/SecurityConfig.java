package org.example.misa;

import jakarta.servlet.DispatcherType;
import org.example.misa.filter.ApiKeyAuthProvider;
import org.example.misa.filter.ApiKeyFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.intercept.AuthorizationFilter;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.DigestAuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.DigestAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    @Order(0)
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
//        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(new HandlerMappingIntrospector()).servletPath("/");
        http
                .securityMatcher("/api/**")
                .authorizeHttpRequests((authorize) -> authorize //authorization
                        .requestMatchers("/api/**").hasRole("USER")
//                        .requestMatchers(mvcMatcherBuilder.pattern("/api/*")).hasRole("USER")
                        .anyRequest().authenticated())
                .addFilterBefore(apiKeyFilter(), AuthorizationFilter.class)
//                .formLogin(AbstractHttpConfigurer::disable)
        ;
        return http.build();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain adminFilterChain(HttpSecurity http) throws Exception {
        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(new HandlerMappingIntrospector()).servletPath("/admin");
        http
//                .securityMatcher("**")
                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers("login").permitAll()
//                        .requestMatchers("**").hasRole("ADMIN")
                        .requestMatchers(mvcMatcherBuilder.pattern("/**")).hasRole("ADMIN")
                        .anyRequest().authenticated())
                .formLogin(withDefaults())
                .csrf(AbstractHttpConfigurer::disable);
        ;
        return http.build();
    }


    @Bean
    @Order(2)
    public SecurityFilterChain defaultFilterChain(HttpSecurity http) throws Exception {
//        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(new HandlerMappingIntrospector()).servletPath("/test");
        http
                .securityMatcher("/test")
                .authorizeHttpRequests((authorize) -> authorize
//                        .requestMatchers(mvcMatcherBuilder.pattern("**")).permitAll()
                        .anyRequest().permitAll());
        return http.build();
    }
    @Bean
    public ApiKeyFilter apiKeyFilter() {
        return new ApiKeyFilter();
    }

    @Bean
    public AuthenticationManager apiAuthenticationManager() {
        System.out.println("apiAuthenticationManager");

        return new ProviderManager(apiKeyAuthProvider());
    }

    @Bean
    public ApiKeyAuthProvider apiKeyAuthProvider() {
        return new ApiKeyAuthProvider();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        System.out.println("authenticationManager");
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails adminDetails = User.withUsername("misaadmin") //보안에 좀 더 좋음
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
