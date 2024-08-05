package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.ContactsTestSamples.*;
import static com.mycompany.myapp.domain.DealTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ContactsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contacts.class);
        Contacts contacts1 = getContactsSample1();
        Contacts contacts2 = new Contacts();
        assertThat(contacts1).isNotEqualTo(contacts2);

        contacts2.setId(contacts1.getId());
        assertThat(contacts1).isEqualTo(contacts2);

        contacts2 = getContactsSample2();
        assertThat(contacts1).isNotEqualTo(contacts2);
    }

    @Test
    void dealTest() {
        Contacts contacts = getContactsRandomSampleGenerator();
        Deal dealBack = getDealRandomSampleGenerator();

        contacts.addDeal(dealBack);
        assertThat(contacts.getDeals()).containsOnly(dealBack);
        assertThat(dealBack.getContacts()).isEqualTo(contacts);

        contacts.removeDeal(dealBack);
        assertThat(contacts.getDeals()).doesNotContain(dealBack);
        assertThat(dealBack.getContacts()).isNull();

        contacts.deals(new HashSet<>(Set.of(dealBack)));
        assertThat(contacts.getDeals()).containsOnly(dealBack);
        assertThat(dealBack.getContacts()).isEqualTo(contacts);

        contacts.setDeals(new HashSet<>());
        assertThat(contacts.getDeals()).doesNotContain(dealBack);
        assertThat(dealBack.getContacts()).isNull();
    }
}
