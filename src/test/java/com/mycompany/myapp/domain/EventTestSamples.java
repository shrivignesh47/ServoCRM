package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class EventTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Event getEventSample1() {
        return new Event().id("id1").event_name("event_name1").registrations(1);
    }

    public static Event getEventSample2() {
        return new Event().id("id2").event_name("event_name2").registrations(2);
    }

    public static Event getEventRandomSampleGenerator() {
        return new Event()
            .id(UUID.randomUUID().toString())
            .event_name(UUID.randomUUID().toString())
            .registrations(intCount.incrementAndGet());
    }
}
