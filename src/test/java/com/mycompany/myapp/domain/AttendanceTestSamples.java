package com.mycompany.myapp.domain;

import java.util.UUID;

public class AttendanceTestSamples {

    public static Attendance getAttendanceSample1() {
        return new Attendance().id("id1").user("user1");
    }

    public static Attendance getAttendanceSample2() {
        return new Attendance().id("id2").user("user2");
    }

    public static Attendance getAttendanceRandomSampleGenerator() {
        return new Attendance().id(UUID.randomUUID().toString()).user(UUID.randomUUID().toString());
    }
}
