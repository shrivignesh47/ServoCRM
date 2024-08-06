package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class ProductTestSamples {

    private static final Random random = new Random();
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Product getProductSample1() {
        return new Product()
            .id("id1")
            .product_name("product_name1")
            .product_code(1)
            .manufacture("manufacture1")
            .unit_price(1)
            .tax("tax1")
            .description("description1");
    }

    public static Product getProductSample2() {
        return new Product()
            .id("id2")
            .product_name("product_name2")
            .product_code(2)
            .manufacture("manufacture2")
            .unit_price(2)
            .tax("tax2")
            .description("description2");
    }

    public static Product getProductRandomSampleGenerator() {
        return new Product()
            .id(UUID.randomUUID().toString())
            .product_name(UUID.randomUUID().toString())
            .product_code(intCount.incrementAndGet())
            .manufacture(UUID.randomUUID().toString())
            .unit_price(intCount.incrementAndGet())
            .tax(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
