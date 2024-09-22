package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AttendanceTestSamples.*;
import static com.mycompany.myapp.domain.EventTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AttendanceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attendance.class);
        Attendance attendance1 = getAttendanceSample1();
        Attendance attendance2 = new Attendance();
        assertThat(attendance1).isNotEqualTo(attendance2);

        attendance2.setId(attendance1.getId());
        assertThat(attendance1).isEqualTo(attendance2);

        attendance2 = getAttendanceSample2();
        assertThat(attendance1).isNotEqualTo(attendance2);
    }

    @Test
    void eventTest() {
        Attendance attendance = getAttendanceRandomSampleGenerator();
        Event eventBack = getEventRandomSampleGenerator();

        attendance.setEvent(eventBack);
        assertThat(attendance.getEvent()).isEqualTo(eventBack);

        attendance.event(null);
        assertThat(attendance.getEvent()).isNull();
    }
}
