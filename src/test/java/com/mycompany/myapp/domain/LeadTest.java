package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.DealTestSamples.*;
import static com.mycompany.myapp.domain.LeadTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class LeadTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lead.class);
        Lead lead1 = getLeadSample1();
        Lead lead2 = new Lead();
        assertThat(lead1).isNotEqualTo(lead2);

        lead2.setId(lead1.getId());
        assertThat(lead1).isEqualTo(lead2);

        lead2 = getLeadSample2();
        assertThat(lead1).isNotEqualTo(lead2);
    }

    @Test
    void dealTest() {
        Lead lead = getLeadRandomSampleGenerator();
        Deal dealBack = getDealRandomSampleGenerator();

        lead.addDeal(dealBack);
        assertThat(lead.getDeals()).containsOnly(dealBack);
        assertThat(dealBack.getLead()).isEqualTo(lead);

        lead.removeDeal(dealBack);
        assertThat(lead.getDeals()).doesNotContain(dealBack);
        assertThat(dealBack.getLead()).isNull();

        lead.deals(new HashSet<>(Set.of(dealBack)));
        assertThat(lead.getDeals()).containsOnly(dealBack);
        assertThat(dealBack.getLead()).isEqualTo(lead);

        lead.setDeals(new HashSet<>());
        assertThat(lead.getDeals()).doesNotContain(dealBack);
        assertThat(dealBack.getLead()).isNull();
    }
}
