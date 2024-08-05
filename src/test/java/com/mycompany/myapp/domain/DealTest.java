package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AccountsTestSamples.*;
import static com.mycompany.myapp.domain.ContactsTestSamples.*;
import static com.mycompany.myapp.domain.DealTestSamples.*;
import static com.mycompany.myapp.domain.LeadTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DealTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deal.class);
        Deal deal1 = getDealSample1();
        Deal deal2 = new Deal();
        assertThat(deal1).isNotEqualTo(deal2);

        deal2.setId(deal1.getId());
        assertThat(deal1).isEqualTo(deal2);

        deal2 = getDealSample2();
        assertThat(deal1).isNotEqualTo(deal2);
    }

    @Test
    void accountsTest() {
        Deal deal = getDealRandomSampleGenerator();
        Accounts accountsBack = getAccountsRandomSampleGenerator();

        deal.setAccounts(accountsBack);
        assertThat(deal.getAccounts()).isEqualTo(accountsBack);

        deal.accounts(null);
        assertThat(deal.getAccounts()).isNull();
    }

    @Test
    void contactsTest() {
        Deal deal = getDealRandomSampleGenerator();
        Contacts contactsBack = getContactsRandomSampleGenerator();

        deal.setContacts(contactsBack);
        assertThat(deal.getContacts()).isEqualTo(contactsBack);

        deal.contacts(null);
        assertThat(deal.getContacts()).isNull();
    }

    @Test
    void leadTest() {
        Deal deal = getDealRandomSampleGenerator();
        Lead leadBack = getLeadRandomSampleGenerator();

        deal.setLead(leadBack);
        assertThat(deal.getLead()).isEqualTo(leadBack);

        deal.lead(null);
        assertThat(deal.getLead()).isNull();
    }
}
