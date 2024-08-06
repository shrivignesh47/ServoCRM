package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TicketTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Ticket getTicketSample1() {
        return new Ticket()
            .id("id1")
            .contact_name("contact_name1")
            .account_name("account_name1")
            .email("email1")
            .phone(1L)
            .subject("subject1")
            .description("description1")
            .product_name("product_name1")
            .language("language1");
    }

    public static Ticket getTicketSample2() {
        return new Ticket()
            .id("id2")
            .contact_name("contact_name2")
            .account_name("account_name2")
            .email("email2")
            .phone(2L)
            .subject("subject2")
            .description("description2")
            .product_name("product_name2")
            .language("language2");
    }

    public static Ticket getTicketRandomSampleGenerator() {
        return new Ticket()
            .id(UUID.randomUUID().toString())
            .contact_name(UUID.randomUUID().toString())
            .account_name(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .phone(longCount.incrementAndGet())
            .subject(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .product_name(UUID.randomUUID().toString())
            .language(UUID.randomUUID().toString());
    }
}
