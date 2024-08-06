package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.MeetingsTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MeetingsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Meetings.class);
        Meetings meetings1 = getMeetingsSample1();
        Meetings meetings2 = new Meetings();
        assertThat(meetings1).isNotEqualTo(meetings2);

        meetings2.setId(meetings1.getId());
        assertThat(meetings1).isEqualTo(meetings2);

        meetings2 = getMeetingsSample2();
        assertThat(meetings1).isNotEqualTo(meetings2);
    }
}
