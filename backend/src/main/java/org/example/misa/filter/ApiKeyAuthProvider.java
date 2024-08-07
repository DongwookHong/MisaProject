package org.example.misa.filter;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.AuthProvider;
import java.util.Collections;

public final class ApiKeyAuthProvider implements AuthenticationProvider {

    private static final String validApiKey = "testapikey";

//    @Value("${apiKey.validApiKey}")
//    private String validApiKey;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String apiKey = (String) authentication.getPrincipal();

        if (apiKey != null & validApiKey.equals(apiKey)) {
            return UsernamePasswordAuthenticationToken
                    .authenticated(authentication.getPrincipal()
                            , null
                            , Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
        }
        else {
            throw new BadCredentialsException("Invalid API Key");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
