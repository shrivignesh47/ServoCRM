package com.mycompany.myapp.domain;

import java.util.UUID;

public class TaskTestSamples {

    public static Task getTaskSample1() {
        return new Task().id("id1").subject("subject1").description("description1");
    }

    public static Task getTaskSample2() {
        return new Task().id("id2").subject("subject2").description("description2");
    }

    public static Task getTaskRandomSampleGenerator() {
        return new Task().id(UUID.randomUUID().toString()).subject(UUID.randomUUID().toString()).description(UUID.randomUUID().toString());
    }
}
