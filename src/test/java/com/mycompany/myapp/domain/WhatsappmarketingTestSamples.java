package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class WhatsappmarketingTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Whatsappmarketing getWhatsappmarketingSample1() {
        return new Whatsappmarketing()
            .id("id1")
            .name("name1")
            .status("status1")
            .created_by("created_by1")
            .recipents(1L)
            .report("report1")
            .action("action1");
    }

    public static Whatsappmarketing getWhatsappmarketingSample2() {
        return new Whatsappmarketing()
            .id("id2")
            .name("name2")
            .status("status2")
            .created_by("created_by2")
            .recipents(2L)
            .report("report2")
            .action("action2");
    }

    public static Whatsappmarketing getWhatsappmarketingRandomSampleGenerator() {
        return new Whatsappmarketing()
            .id(UUID.randomUUID().toString())
            .name(UUID.randomUUID().toString())
            .status(UUID.randomUUID().toString())
            .created_by(UUID.randomUUID().toString())
            .recipents(longCount.incrementAndGet())
            .report(UUID.randomUUID().toString())
            .action(UUID.randomUUID().toString());
    }
}
