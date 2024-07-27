package org.example.misa.filter;

import lombok.extern.slf4j.Slf4j;
import org.example.misa.component.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;

@Slf4j
@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {
    private final JwtUtils jwtUtils;

    public JwtAuthenticationProvider(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = authentication.getPrincipal().toString();
        if (jwtUtils.validateToken(token)) {
            String role = jwtUtils.getRoleFromToken(token);
            if (role.equals("ADMIN")) {
                return UsernamePasswordAuthenticationToken
                        .authenticated(authentication.getPrincipal()
                                , null
                                , Arrays.asList(
                                        new SimpleGrantedAuthority("ROLE_ADMIN"),
                                        new SimpleGrantedAuthority("ROLE_USER")
                                ));
            }
        }
        throw new BadCredentialsException("Invalid JWT");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
