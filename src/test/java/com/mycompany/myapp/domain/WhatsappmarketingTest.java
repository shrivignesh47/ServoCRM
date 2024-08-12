package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.WhatsappmarketingTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WhatsappmarketingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Whatsappmarketing.class);
        Whatsappmarketing whatsappmarketing1 = getWhatsappmarketingSample1();
        Whatsappmarketing whatsappmarketing2 = new Whatsappmarketing();
        assertThat(whatsappmarketing1).isNotEqualTo(whatsappmarketing2);

        whatsappmarketing2.setId(whatsappmarketing1.getId());
        assertThat(whatsappmarketing1).isEqualTo(whatsappmarketing2);

        whatsappmarketing2 = getWhatsappmarketingSample2();
        assertThat(whatsappmarketing1).isNotEqualTo(whatsappmarketing2);
    }
}
