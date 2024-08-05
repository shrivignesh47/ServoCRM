package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AccountsTestSamples.*;
import static com.mycompany.myapp.domain.DealTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AccountsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Accounts.class);
        Accounts accounts1 = getAccountsSample1();
        Accounts accounts2 = new Accounts();
        assertThat(accounts1).isNotEqualTo(accounts2);

        accounts2.setId(accounts1.getId());
        assertThat(accounts1).isEqualTo(accounts2);

        accounts2 = getAccountsSample2();
        assertThat(accounts1).isNotEqualTo(accounts2);
    }

    @Test
    void dealTest() {
        Accounts accounts = getAccountsRandomSampleGenerator();
        Deal dealBack = getDealRandomSampleGenerator();

        accounts.addDeal(dealBack);
        assertThat(accounts.getDeals()).containsOnly(dealBack);
        assertThat(dealBack.getAccounts()).isEqualTo(accounts);

        accounts.removeDeal(dealBack);
        assertThat(accounts.getDeals()).doesNotContain(dealBack);
        assertThat(dealBack.getAccounts()).isNull();

        accounts.deals(new HashSet<>(Set.of(dealBack)));
        assertThat(accounts.getDeals()).containsOnly(dealBack);
        assertThat(dealBack.getAccounts()).isEqualTo(accounts);

        accounts.setDeals(new HashSet<>());
        assertThat(accounts.getDeals()).doesNotContain(dealBack);
        assertThat(dealBack.getAccounts()).isNull();
    }
}
