package com.example.demo.buckets;

import io.github.bucket4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CustomBucket extends AbstractBucket {

    private long tokens; // Variável para armazenar os tokens disponíveis

    public CustomBucket(BucketListener listener, @Value("${customBucket.initialTokens}") long initialTokens ) {
        super(listener);
        this.tokens = initialTokens;
    }

    @Override
    protected long consumeAsMuchAsPossibleImpl(long limit) {
        long consumedTokens = Math.min(tokens, limit);
        tokens -= consumedTokens;
        return consumedTokens;
    }

    @Override
    protected boolean tryConsumeImpl(long tokensToConsume) {
        if (tokens >= tokensToConsume) {
            tokens -= tokensToConsume;
            return true;
        }
        return false;
    }

    @Override
    protected ConsumptionProbe tryConsumeAndReturnRemainingTokensImpl(long tokensToConsume) {
        return null;
    }

    @Override
    protected EstimationProbe estimateAbilityToConsumeImpl(long numTokens) {
        return null;
    }

    @Override
    protected long reserveAndCalculateTimeToSleepImpl(long tokensToConsume, long waitIfBusyNanos) {
        return 0;
    }

    @Override
    protected void addTokensImpl(long tokensToAdd) {
        tokens += tokensToAdd;
    }

    @Override
    protected void forceAddTokensImpl(long tokensToAdd) {

    }

    @Override
    protected void replaceConfigurationImpl(BucketConfiguration newConfiguration, TokensInheritanceStrategy tokensInheritanceStrategy) {

    }

    @Override
    protected long consumeIgnoringRateLimitsImpl(long tokensToConsume) {
        return 0;
    }

    @Override
    protected VerboseResult<Long> consumeAsMuchAsPossibleVerboseImpl(long limit) {
        return null;
    }

    @Override
    protected VerboseResult<Boolean> tryConsumeVerboseImpl(long tokensToConsume) {
        return null;
    }

    @Override
    protected VerboseResult<ConsumptionProbe> tryConsumeAndReturnRemainingTokensVerboseImpl(long tokensToConsume) {
        return null;
    }

    @Override
    protected VerboseResult<EstimationProbe> estimateAbilityToConsumeVerboseImpl(long numTokens) {
        return null;
    }

    @Override
    protected VerboseResult<Long> getAvailableTokensVerboseImpl() {
        return null;
    }

    @Override
    protected VerboseResult<Nothing> addTokensVerboseImpl(long tokensToAdd) {
        return null;
    }

    @Override
    protected VerboseResult<Nothing> forceAddTokensVerboseImpl(long tokensToAdd) {
        return null;
    }

    @Override
    protected VerboseResult<Nothing> resetVerboseImpl() {
        return null;
    }

    @Override
    protected VerboseResult<Nothing> replaceConfigurationVerboseImpl(BucketConfiguration newConfiguration, TokensInheritanceStrategy tokensInheritanceStrategy) {
        return null;
    }

    @Override
    protected VerboseResult<Long> consumeIgnoringRateLimitsVerboseImpl(long tokensToConsume) {
        return null;
    }

    @Override
    public long getAvailableTokens() {
        return tokens;
    }

    @Override
    public Bucket toListenable(BucketListener listener) {
        return null;
    }

    @Override
    public void reset() {
        tokens = 0;
    }
}


