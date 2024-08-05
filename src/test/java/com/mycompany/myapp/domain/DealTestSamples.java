package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class DealTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Deal getDealSample1() {
        return new Deal()
            .id("id1")
            .amount(1L)
            .deal_name("deal_name1")
            .probability_Percentage(1)
            .compaign_Source("compaign_Source1")
            .description("description1");
    }

    public static Deal getDealSample2() {
        return new Deal()
            .id("id2")
            .amount(2L)
            .deal_name("deal_name2")
            .probability_Percentage(2)
            .compaign_Source("compaign_Source2")
            .description("description2");
    }

    public static Deal getDealRandomSampleGenerator() {
        return new Deal()
            .id(UUID.randomUUID().toString())
            .amount(longCount.incrementAndGet())
            .deal_name(UUID.randomUUID().toString())
            .probability_Percentage(intCount.incrementAndGet())
            .compaign_Source(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
