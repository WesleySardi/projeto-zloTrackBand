package com.example.demo.filters;

import com.example.demo.buckets.CustomBucket;
import com.example.demo.buckets.MyBucketListener;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Component
public class TokenRateLimitFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    private final Map<String, Long> blockedIps = new ConcurrentHashMap<>();

    @Autowired
    CustomBucket customBucket = new CustomBucket(new MyBucketListener(), 15); // Inicializa com 100 tokens

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String clientIp = request.getRemoteAddr();

        if (blockedIps.containsKey(clientIp)) {
            long blockTime = blockedIps.get(clientIp);
            if (System.currentTimeMillis() < blockTime) {
                response.setStatus(429);
                response.getWriter().write("Você foi bloqueado por exceder o limite de taxa. Tente novamente mais tarde.");
                return;
            } else {
                blockedIps.remove(clientIp);
            }
        }

        Bucket bucket = buckets.computeIfAbsent(clientIp, key -> {
            Bandwidth limit = Bandwidth.classic(15, Refill.intervally(15, Duration.ofSeconds(1)));
            return Bucket.builder()
                    .addLimit(limit)
                    .build();
        });

        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
        if (probe.isConsumed()) {
            response.addHeader("X-RateLimit-Remaining", Long.toString(probe.getRemainingTokens()));
            filterChain.doFilter(request, response);
        } else {
            blockedIps.put(clientIp, System.currentTimeMillis() + TimeUnit.SECONDS.toMillis(60));
            response.setStatus(429);
            response.getWriter().write("Limite de taxa excedido. Tente novamente mais tarde.");
            response.addHeader("X-RateLimit-Retry-After-Milliseconds",
                    Long.toString(TimeUnit.NANOSECONDS.toMillis(probe.getNanosToWaitForRefill())));
        }
    }
}
