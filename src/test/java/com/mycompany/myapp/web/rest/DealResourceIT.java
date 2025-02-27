package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.DealAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Accounts;
import com.mycompany.myapp.domain.Contacts;
import com.mycompany.myapp.domain.Deal;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.enumeration.Stage;
import com.mycompany.myapp.domain.enumeration.Type;
import com.mycompany.myapp.repository.DealRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.DealService;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;

/**
 * Integration tests for the {@link DealResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class DealResourceIT {

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final String DEFAULT_DEAL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DEAL_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CLOSING_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CLOSING_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Stage DEFAULT_STAGE = Stage.QUALIFICATION;
    private static final Stage UPDATED_STAGE = Stage.NEEDS_ANALYSIS;

    private static final Type DEFAULT_TYPE = Type.NONE;
    private static final Type UPDATED_TYPE = Type.EXISTING_BUSINESS;

    private static final Integer DEFAULT_PROBABILITY_PERCENTAGE = 1;
    private static final Integer UPDATED_PROBABILITY_PERCENTAGE = 2;

    private static final String DEFAULT_COMPAIGN_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_COMPAIGN_SOURCE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/deals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private DealRepository dealRepositoryMock;

    @Mock
    private DealService dealServiceMock;

    @Autowired
    private WebTestClient webTestClient;

    private Deal deal;

    private Deal insertedDeal;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deal createEntity() {
        Deal deal = new Deal()
            .amount(DEFAULT_AMOUNT)
            .deal_name(DEFAULT_DEAL_NAME)
            .closing_date(DEFAULT_CLOSING_DATE)
            .stage(DEFAULT_STAGE)
            .type(DEFAULT_TYPE)
            .probability_Percentage(DEFAULT_PROBABILITY_PERCENTAGE)
            .compaign_Source(DEFAULT_COMPAIGN_SOURCE)
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        deal.setUser(user);
        // Add required entity
        Accounts accounts;
        accounts = AccountsResourceIT.createEntity();
        accounts.setId("fixed-id-for-tests");
        deal.setAccounts(accounts);
        // Add required entity
        Contacts contacts;
        contacts = ContactsResourceIT.createEntity();
        contacts.setId("fixed-id-for-tests");
        deal.setContacts(contacts);
        return deal;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deal createUpdatedEntity() {
        Deal deal = new Deal()
            .amount(UPDATED_AMOUNT)
            .deal_name(UPDATED_DEAL_NAME)
            .closing_date(UPDATED_CLOSING_DATE)
            .stage(UPDATED_STAGE)
            .type(UPDATED_TYPE)
            .probability_Percentage(UPDATED_PROBABILITY_PERCENTAGE)
            .compaign_Source(UPDATED_COMPAIGN_SOURCE)
            .description(UPDATED_DESCRIPTION);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        deal.setUser(user);
        // Add required entity
        Accounts accounts;
        accounts = AccountsResourceIT.createUpdatedEntity();
        accounts.setId("fixed-id-for-tests");
        deal.setAccounts(accounts);
        // Add required entity
        Contacts contacts;
        contacts = ContactsResourceIT.createUpdatedEntity();
        contacts.setId("fixed-id-for-tests");
        deal.setContacts(contacts);
        return deal;
    }

    @BeforeEach
    public void initTest() {
        deal = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedDeal != null) {
            dealRepository.delete(insertedDeal).block();
            insertedDeal = null;
        }
    }

    @Test
    void createDeal() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Deal
        var returnedDeal = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(Deal.class)
            .returnResult()
            .getResponseBody();

        // Validate the Deal in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertDealUpdatableFieldsEquals(returnedDeal, getPersistedDeal(returnedDeal));

        insertedDeal = returnedDeal;
    }

    @Test
    void createDealWithExistingId() throws Exception {
        // Create the Deal with an existing ID
        deal.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkAmountIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        deal.setAmount(null);

        // Create the Deal, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDeal_nameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        deal.setDeal_name(null);

        // Create the Deal, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkClosing_dateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        deal.setClosing_date(null);

        // Create the Deal, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStageIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        deal.setStage(null);

        // Create the Deal, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        deal.setType(null);

        // Create the Deal, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkDescriptionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        deal.setDescription(null);

        // Create the Deal, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllDeals() {
        // Initialize the database
        insertedDeal = dealRepository.save(deal).block();

        // Get all the dealList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(deal.getId()))
            .jsonPath("$.[*].amount")
            .value(hasItem(DEFAULT_AMOUNT.intValue()))
            .jsonPath("$.[*].deal_name")
            .value(hasItem(DEFAULT_DEAL_NAME))
            .jsonPath("$.[*].closing_date")
            .value(hasItem(sameInstant(DEFAULT_CLOSING_DATE)))
            .jsonPath("$.[*].stage")
            .value(hasItem(DEFAULT_STAGE.toString()))
            .jsonPath("$.[*].type")
            .value(hasItem(DEFAULT_TYPE.toString()))
            .jsonPath("$.[*].probability_Percentage")
            .value(hasItem(DEFAULT_PROBABILITY_PERCENTAGE))
            .jsonPath("$.[*].compaign_Source")
            .value(hasItem(DEFAULT_COMPAIGN_SOURCE))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDealsWithEagerRelationshipsIsEnabled() {
        when(dealServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(dealServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDealsWithEagerRelationshipsIsNotEnabled() {
        when(dealServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(dealRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getDeal() {
        // Initialize the database
        insertedDeal = dealRepository.save(deal).block();

        // Get the deal
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, deal.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(deal.getId()))
            .jsonPath("$.amount")
            .value(is(DEFAULT_AMOUNT.intValue()))
            .jsonPath("$.deal_name")
            .value(is(DEFAULT_DEAL_NAME))
            .jsonPath("$.closing_date")
            .value(is(sameInstant(DEFAULT_CLOSING_DATE)))
            .jsonPath("$.stage")
            .value(is(DEFAULT_STAGE.toString()))
            .jsonPath("$.type")
            .value(is(DEFAULT_TYPE.toString()))
            .jsonPath("$.probability_Percentage")
            .value(is(DEFAULT_PROBABILITY_PERCENTAGE))
            .jsonPath("$.compaign_Source")
            .value(is(DEFAULT_COMPAIGN_SOURCE))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION));
    }

    @Test
    void getNonExistingDeal() {
        // Get the deal
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingDeal() throws Exception {
        // Initialize the database
        insertedDeal = dealRepository.save(deal).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the deal
        Deal updatedDeal = dealRepository.findById(deal.getId()).block();
        updatedDeal
            .amount(UPDATED_AMOUNT)
            .deal_name(UPDATED_DEAL_NAME)
            .closing_date(UPDATED_CLOSING_DATE)
            .stage(UPDATED_STAGE)
            .type(UPDATED_TYPE)
            .probability_Percentage(UPDATED_PROBABILITY_PERCENTAGE)
            .compaign_Source(UPDATED_COMPAIGN_SOURCE)
            .description(UPDATED_DESCRIPTION);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedDeal.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedDeal))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDealToMatchAllProperties(updatedDeal);
    }

    @Test
    void putNonExistingDeal() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        deal.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, deal.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDeal() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        deal.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDeal() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        deal.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDealWithPatch() throws Exception {
        // Initialize the database
        insertedDeal = dealRepository.save(deal).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the deal using partial update
        Deal partialUpdatedDeal = new Deal();
        partialUpdatedDeal.setId(deal.getId());

        partialUpdatedDeal
            .amount(UPDATED_AMOUNT)
            .closing_date(UPDATED_CLOSING_DATE)
            .stage(UPDATED_STAGE)
            .type(UPDATED_TYPE)
            .compaign_Source(UPDATED_COMPAIGN_SOURCE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDeal.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedDeal))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Deal in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDealUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedDeal, deal), getPersistedDeal(deal));
    }

    @Test
    void fullUpdateDealWithPatch() throws Exception {
        // Initialize the database
        insertedDeal = dealRepository.save(deal).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the deal using partial update
        Deal partialUpdatedDeal = new Deal();
        partialUpdatedDeal.setId(deal.getId());

        partialUpdatedDeal
            .amount(UPDATED_AMOUNT)
            .deal_name(UPDATED_DEAL_NAME)
            .closing_date(UPDATED_CLOSING_DATE)
            .stage(UPDATED_STAGE)
            .type(UPDATED_TYPE)
            .probability_Percentage(UPDATED_PROBABILITY_PERCENTAGE)
            .compaign_Source(UPDATED_COMPAIGN_SOURCE)
            .description(UPDATED_DESCRIPTION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDeal.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedDeal))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Deal in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDealUpdatableFieldsEquals(partialUpdatedDeal, getPersistedDeal(partialUpdatedDeal));
    }

    @Test
    void patchNonExistingDeal() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        deal.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, deal.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDeal() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        deal.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDeal() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        deal.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(deal))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Deal in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDeal() {
        // Initialize the database
        insertedDeal = dealRepository.save(deal).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the deal
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, deal.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dealRepository.count().block();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Deal getPersistedDeal(Deal deal) {
        return dealRepository.findById(deal.getId()).block();
    }

    protected void assertPersistedDealToMatchAllProperties(Deal expectedDeal) {
        assertDealAllPropertiesEquals(expectedDeal, getPersistedDeal(expectedDeal));
    }

    protected void assertPersistedDealToMatchUpdatableProperties(Deal expectedDeal) {
        assertDealAllUpdatablePropertiesEquals(expectedDeal, getPersistedDeal(expectedDeal));
    }
}
