package org.egov.finance.migration.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log =
            LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        long startTime = System.currentTimeMillis();

        // Request log
        log.info(
                "----------->  {} {}",
                request.getMethod(),
                request.getRequestURI()
        );

        try {
            // Process request
            filterChain.doFilter(request, response);

        } finally {
            // Calculate response time
            long duration = System.currentTimeMillis() - startTime;

            // Response log
            log.info(
                    "<-----------  {} ({} ms)",
                    response.getStatus(),
                    duration
            );
        }
    }
}