package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.MarketingAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Marketing;
import com.mycompany.myapp.repository.MarketingRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.UUID;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

/**
 * Integration tests for the {@link MarketingResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class MarketingResourceIT {

    private static final String DEFAULT_CAMPAIGN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CAMPAIGN_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_START_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/marketings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MarketingRepository marketingRepository;

    @Autowired
    private WebTestClient webTestClient;

    private Marketing marketing;

    private Marketing insertedMarketing;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marketing createEntity() {
        Marketing marketing = new Marketing()
            .campaign_name(DEFAULT_CAMPAIGN_NAME)
            .start_date(DEFAULT_START_DATE)
            .end_date(DEFAULT_END_DATE)
            .type(DEFAULT_TYPE)
            .status(DEFAULT_STATUS);
        return marketing;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marketing createUpdatedEntity() {
        Marketing marketing = new Marketing()
            .campaign_name(UPDATED_CAMPAIGN_NAME)
            .start_date(UPDATED_START_DATE)
            .end_date(UPDATED_END_DATE)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS);
        return marketing;
    }

    @BeforeEach
    public void initTest() {
        marketing = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedMarketing != null) {
            marketingRepository.delete(insertedMarketing).block();
            insertedMarketing = null;
        }
    }

    @Test
    void createMarketing() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Marketing
        var returnedMarketing = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(Marketing.class)
            .returnResult()
            .getResponseBody();

        // Validate the Marketing in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertMarketingUpdatableFieldsEquals(returnedMarketing, getPersistedMarketing(returnedMarketing));

        insertedMarketing = returnedMarketing;
    }

    @Test
    void createMarketingWithExistingId() throws Exception {
        // Create the Marketing with an existing ID
        marketing.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkCampaign_nameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        marketing.setCampaign_name(null);

        // Create the Marketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStart_dateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        marketing.setStart_date(null);

        // Create the Marketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkEnd_dateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        marketing.setEnd_date(null);

        // Create the Marketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkTypeIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        marketing.setType(null);

        // Create the Marketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStatusIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        marketing.setStatus(null);

        // Create the Marketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllMarketings() {
        // Initialize the database
        insertedMarketing = marketingRepository.save(marketing).block();

        // Get all the marketingList
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
            .value(hasItem(marketing.getId()))
            .jsonPath("$.[*].campaign_name")
            .value(hasItem(DEFAULT_CAMPAIGN_NAME))
            .jsonPath("$.[*].start_date")
            .value(hasItem(sameInstant(DEFAULT_START_DATE)))
            .jsonPath("$.[*].end_date")
            .value(hasItem(sameInstant(DEFAULT_END_DATE)))
            .jsonPath("$.[*].type")
            .value(hasItem(DEFAULT_TYPE))
            .jsonPath("$.[*].status")
            .value(hasItem(DEFAULT_STATUS));
    }

    @Test
    void getMarketing() {
        // Initialize the database
        insertedMarketing = marketingRepository.save(marketing).block();

        // Get the marketing
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, marketing.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(marketing.getId()))
            .jsonPath("$.campaign_name")
            .value(is(DEFAULT_CAMPAIGN_NAME))
            .jsonPath("$.start_date")
            .value(is(sameInstant(DEFAULT_START_DATE)))
            .jsonPath("$.end_date")
            .value(is(sameInstant(DEFAULT_END_DATE)))
            .jsonPath("$.type")
            .value(is(DEFAULT_TYPE))
            .jsonPath("$.status")
            .value(is(DEFAULT_STATUS));
    }

    @Test
    void getNonExistingMarketing() {
        // Get the marketing
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingMarketing() throws Exception {
        // Initialize the database
        insertedMarketing = marketingRepository.save(marketing).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the marketing
        Marketing updatedMarketing = marketingRepository.findById(marketing.getId()).block();
        updatedMarketing
            .campaign_name(UPDATED_CAMPAIGN_NAME)
            .start_date(UPDATED_START_DATE)
            .end_date(UPDATED_END_DATE)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedMarketing.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedMarketing))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMarketingToMatchAllProperties(updatedMarketing);
    }

    @Test
    void putNonExistingMarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        marketing.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, marketing.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchMarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        marketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamMarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        marketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateMarketingWithPatch() throws Exception {
        // Initialize the database
        insertedMarketing = marketingRepository.save(marketing).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the marketing using partial update
        Marketing partialUpdatedMarketing = new Marketing();
        partialUpdatedMarketing.setId(marketing.getId());

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedMarketing.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedMarketing))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Marketing in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMarketingUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedMarketing, marketing),
            getPersistedMarketing(marketing)
        );
    }

    @Test
    void fullUpdateMarketingWithPatch() throws Exception {
        // Initialize the database
        insertedMarketing = marketingRepository.save(marketing).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the marketing using partial update
        Marketing partialUpdatedMarketing = new Marketing();
        partialUpdatedMarketing.setId(marketing.getId());

        partialUpdatedMarketing
            .campaign_name(UPDATED_CAMPAIGN_NAME)
            .start_date(UPDATED_START_DATE)
            .end_date(UPDATED_END_DATE)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedMarketing.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedMarketing))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Marketing in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMarketingUpdatableFieldsEquals(partialUpdatedMarketing, getPersistedMarketing(partialUpdatedMarketing));
    }

    @Test
    void patchNonExistingMarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        marketing.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, marketing.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchMarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        marketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamMarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        marketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(marketing))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Marketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteMarketing() {
        // Initialize the database
        insertedMarketing = marketingRepository.save(marketing).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the marketing
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, marketing.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return marketingRepository.count().block();
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

    protected Marketing getPersistedMarketing(Marketing marketing) {
        return marketingRepository.findById(marketing.getId()).block();
    }

    protected void assertPersistedMarketingToMatchAllProperties(Marketing expectedMarketing) {
        assertMarketingAllPropertiesEquals(expectedMarketing, getPersistedMarketing(expectedMarketing));
    }

    protected void assertPersistedMarketingToMatchUpdatableProperties(Marketing expectedMarketing) {
        assertMarketingAllUpdatablePropertiesEquals(expectedMarketing, getPersistedMarketing(expectedMarketing));
    }
}
