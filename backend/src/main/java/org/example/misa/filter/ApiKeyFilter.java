package org.example.misa.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.authentication.*;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.file.AccessDeniedException;

public class ApiKeyFilter extends OncePerRequestFilter {

    private final String apiKeyHeaderName = "x-api-key";

    private final boolean getOnly = true;

    AuthenticationManager apiAuthenticationManager;

    public ApiKeyFilter(AuthenticationManager apiAuthenticationManager) {
        this.apiAuthenticationManager = apiAuthenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String apiKey = request.getHeader(apiKeyHeaderName);
        System.out.println("apiKeyHeaderName: " + apiKeyHeaderName);
        System.out.println("request: " + request.getRequestURI());
        System.out.println("apikey: " + apiKey);
        if (this.getOnly && !request.getMethod().equals("GET")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
        else {
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(apiKey, apiKey);
            authRequest.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            Authentication authentication =  apiAuthenticationManager.authenticate(authRequest);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        }
    }
}
