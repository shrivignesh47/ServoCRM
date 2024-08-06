package com.mycompany.myapp.domain;

import java.util.UUID;

public class MeetingsTestSamples {

    public static Meetings getMeetingsSample1() {
        return new Meetings().id("id1").title("title1").location_Offline_Detail("location_Offline_Detail1");
    }

    public static Meetings getMeetingsSample2() {
        return new Meetings().id("id2").title("title2").location_Offline_Detail("location_Offline_Detail2");
    }

    public static Meetings getMeetingsRandomSampleGenerator() {
        return new Meetings()
            .id(UUID.randomUUID().toString())
            .title(UUID.randomUUID().toString())
            .location_Offline_Detail(UUID.randomUUID().toString());
    }
}
