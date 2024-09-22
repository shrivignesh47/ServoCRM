package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AttendanceTestSamples.*;
import static com.mycompany.myapp.domain.EventTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class EventTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Event.class);
        Event event1 = getEventSample1();
        Event event2 = new Event();
        assertThat(event1).isNotEqualTo(event2);

        event2.setId(event1.getId());
        assertThat(event1).isEqualTo(event2);

        event2 = getEventSample2();
        assertThat(event1).isNotEqualTo(event2);
    }

    @Test
    void attendanceTest() {
        Event event = getEventRandomSampleGenerator();
        Attendance attendanceBack = getAttendanceRandomSampleGenerator();

        event.addAttendance(attendanceBack);
        assertThat(event.getAttendances()).containsOnly(attendanceBack);
        assertThat(attendanceBack.getEvent()).isEqualTo(event);

        event.removeAttendance(attendanceBack);
        assertThat(event.getAttendances()).doesNotContain(attendanceBack);
        assertThat(attendanceBack.getEvent()).isNull();

        event.attendances(new HashSet<>(Set.of(attendanceBack)));
        assertThat(event.getAttendances()).containsOnly(attendanceBack);
        assertThat(attendanceBack.getEvent()).isEqualTo(event);

        event.setAttendances(new HashSet<>());
        assertThat(event.getAttendances()).doesNotContain(attendanceBack);
        assertThat(attendanceBack.getEvent()).isNull();
    }
}
