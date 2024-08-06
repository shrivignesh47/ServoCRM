package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.MarketingTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MarketingTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Marketing.class);
        Marketing marketing1 = getMarketingSample1();
        Marketing marketing2 = new Marketing();
        assertThat(marketing1).isNotEqualTo(marketing2);

        marketing2.setId(marketing1.getId());
        assertThat(marketing1).isEqualTo(marketing2);

        marketing2 = getMarketingSample2();
        assertThat(marketing1).isNotEqualTo(marketing2);
    }
}
