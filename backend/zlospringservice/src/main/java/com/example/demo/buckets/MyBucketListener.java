package com.example.demo.buckets;

import io.github.bucket4j.BucketListener;
import org.springframework.stereotype.Component;

@Component
public class MyBucketListener implements BucketListener {
    @Override
    public void onConsumed(long tokens) {

    }

    @Override
    public void onRejected(long tokens) {

    }

    @Override
    public void onParked(long nanos) {

    }

    @Override
    public void onInterrupted(InterruptedException e) {

    }

    @Override
    public void onDelayed(long nanos) {

    }
}
