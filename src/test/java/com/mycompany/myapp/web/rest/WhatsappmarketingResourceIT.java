package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.WhatsappmarketingAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.Whatsappmarketing;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.repository.WhatsappmarketingRepository;
import com.mycompany.myapp.service.WhatsappmarketingService;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link WhatsappmarketingResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class WhatsappmarketingResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_ON = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_ON = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Long DEFAULT_RECIPENTS = 1L;
    private static final Long UPDATED_RECIPENTS = 2L;

    private static final String DEFAULT_REPORT = "AAAAAAAAAA";
    private static final String UPDATED_REPORT = "BBBBBBBBBB";

    private static final String DEFAULT_ACTION = "AAAAAAAAAA";
    private static final String UPDATED_ACTION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/whatsappmarketings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private WhatsappmarketingRepository whatsappmarketingRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private WhatsappmarketingRepository whatsappmarketingRepositoryMock;

    @Mock
    private WhatsappmarketingService whatsappmarketingServiceMock;

    @Autowired
    private WebTestClient webTestClient;

    private Whatsappmarketing whatsappmarketing;

    private Whatsappmarketing insertedWhatsappmarketing;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Whatsappmarketing createEntity() {
        Whatsappmarketing whatsappmarketing = new Whatsappmarketing()
            .name(DEFAULT_NAME)
            .status(DEFAULT_STATUS)
            .created_On(DEFAULT_CREATED_ON)
            .created_by(DEFAULT_CREATED_BY)
            .recipents(DEFAULT_RECIPENTS)
            .report(DEFAULT_REPORT)
            .action(DEFAULT_ACTION);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        whatsappmarketing.setUser(user);
        return whatsappmarketing;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Whatsappmarketing createUpdatedEntity() {
        Whatsappmarketing whatsappmarketing = new Whatsappmarketing()
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .created_On(UPDATED_CREATED_ON)
            .created_by(UPDATED_CREATED_BY)
            .recipents(UPDATED_RECIPENTS)
            .report(UPDATED_REPORT)
            .action(UPDATED_ACTION);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        whatsappmarketing.setUser(user);
        return whatsappmarketing;
    }

    @BeforeEach
    public void initTest() {
        whatsappmarketing = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedWhatsappmarketing != null) {
            whatsappmarketingRepository.delete(insertedWhatsappmarketing).block();
            insertedWhatsappmarketing = null;
        }
    }

    @Test
    void createWhatsappmarketing() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Whatsappmarketing
        var returnedWhatsappmarketing = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(Whatsappmarketing.class)
            .returnResult()
            .getResponseBody();

        // Validate the Whatsappmarketing in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertWhatsappmarketingUpdatableFieldsEquals(returnedWhatsappmarketing, getPersistedWhatsappmarketing(returnedWhatsappmarketing));

        insertedWhatsappmarketing = returnedWhatsappmarketing;
    }

    @Test
    void createWhatsappmarketingWithExistingId() throws Exception {
        // Create the Whatsappmarketing with an existing ID
        whatsappmarketing.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        whatsappmarketing.setName(null);

        // Create the Whatsappmarketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkStatusIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        whatsappmarketing.setStatus(null);

        // Create the Whatsappmarketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkCreated_OnIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        whatsappmarketing.setCreated_On(null);

        // Create the Whatsappmarketing, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllWhatsappmarketings() {
        // Initialize the database
        insertedWhatsappmarketing = whatsappmarketingRepository.save(whatsappmarketing).block();

        // Get all the whatsappmarketingList
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
            .value(hasItem(whatsappmarketing.getId()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].status")
            .value(hasItem(DEFAULT_STATUS))
            .jsonPath("$.[*].created_On")
            .value(hasItem(DEFAULT_CREATED_ON.toString()))
            .jsonPath("$.[*].created_by")
            .value(hasItem(DEFAULT_CREATED_BY))
            .jsonPath("$.[*].recipents")
            .value(hasItem(DEFAULT_RECIPENTS.intValue()))
            .jsonPath("$.[*].report")
            .value(hasItem(DEFAULT_REPORT))
            .jsonPath("$.[*].action")
            .value(hasItem(DEFAULT_ACTION));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWhatsappmarketingsWithEagerRelationshipsIsEnabled() {
        when(whatsappmarketingServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(whatsappmarketingServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllWhatsappmarketingsWithEagerRelationshipsIsNotEnabled() {
        when(whatsappmarketingServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(whatsappmarketingRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getWhatsappmarketing() {
        // Initialize the database
        insertedWhatsappmarketing = whatsappmarketingRepository.save(whatsappmarketing).block();

        // Get the whatsappmarketing
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, whatsappmarketing.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(whatsappmarketing.getId()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.status")
            .value(is(DEFAULT_STATUS))
            .jsonPath("$.created_On")
            .value(is(DEFAULT_CREATED_ON.toString()))
            .jsonPath("$.created_by")
            .value(is(DEFAULT_CREATED_BY))
            .jsonPath("$.recipents")
            .value(is(DEFAULT_RECIPENTS.intValue()))
            .jsonPath("$.report")
            .value(is(DEFAULT_REPORT))
            .jsonPath("$.action")
            .value(is(DEFAULT_ACTION));
    }

    @Test
    void getNonExistingWhatsappmarketing() {
        // Get the whatsappmarketing
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingWhatsappmarketing() throws Exception {
        // Initialize the database
        insertedWhatsappmarketing = whatsappmarketingRepository.save(whatsappmarketing).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the whatsappmarketing
        Whatsappmarketing updatedWhatsappmarketing = whatsappmarketingRepository.findById(whatsappmarketing.getId()).block();
        updatedWhatsappmarketing
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .created_On(UPDATED_CREATED_ON)
            .created_by(UPDATED_CREATED_BY)
            .recipents(UPDATED_RECIPENTS)
            .report(UPDATED_REPORT)
            .action(UPDATED_ACTION);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedWhatsappmarketing.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedWhatsappmarketing))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedWhatsappmarketingToMatchAllProperties(updatedWhatsappmarketing);
    }

    @Test
    void putNonExistingWhatsappmarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        whatsappmarketing.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, whatsappmarketing.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchWhatsappmarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        whatsappmarketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamWhatsappmarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        whatsappmarketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateWhatsappmarketingWithPatch() throws Exception {
        // Initialize the database
        insertedWhatsappmarketing = whatsappmarketingRepository.save(whatsappmarketing).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the whatsappmarketing using partial update
        Whatsappmarketing partialUpdatedWhatsappmarketing = new Whatsappmarketing();
        partialUpdatedWhatsappmarketing.setId(whatsappmarketing.getId());

        partialUpdatedWhatsappmarketing.action(UPDATED_ACTION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedWhatsappmarketing.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedWhatsappmarketing))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Whatsappmarketing in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWhatsappmarketingUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedWhatsappmarketing, whatsappmarketing),
            getPersistedWhatsappmarketing(whatsappmarketing)
        );
    }

    @Test
    void fullUpdateWhatsappmarketingWithPatch() throws Exception {
        // Initialize the database
        insertedWhatsappmarketing = whatsappmarketingRepository.save(whatsappmarketing).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the whatsappmarketing using partial update
        Whatsappmarketing partialUpdatedWhatsappmarketing = new Whatsappmarketing();
        partialUpdatedWhatsappmarketing.setId(whatsappmarketing.getId());

        partialUpdatedWhatsappmarketing
            .name(UPDATED_NAME)
            .status(UPDATED_STATUS)
            .created_On(UPDATED_CREATED_ON)
            .created_by(UPDATED_CREATED_BY)
            .recipents(UPDATED_RECIPENTS)
            .report(UPDATED_REPORT)
            .action(UPDATED_ACTION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedWhatsappmarketing.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedWhatsappmarketing))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Whatsappmarketing in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWhatsappmarketingUpdatableFieldsEquals(
            partialUpdatedWhatsappmarketing,
            getPersistedWhatsappmarketing(partialUpdatedWhatsappmarketing)
        );
    }

    @Test
    void patchNonExistingWhatsappmarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        whatsappmarketing.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, whatsappmarketing.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchWhatsappmarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        whatsappmarketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamWhatsappmarketing() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        whatsappmarketing.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(whatsappmarketing))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Whatsappmarketing in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteWhatsappmarketing() {
        // Initialize the database
        insertedWhatsappmarketing = whatsappmarketingRepository.save(whatsappmarketing).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the whatsappmarketing
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, whatsappmarketing.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return whatsappmarketingRepository.count().block();
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

    protected Whatsappmarketing getPersistedWhatsappmarketing(Whatsappmarketing whatsappmarketing) {
        return whatsappmarketingRepository.findById(whatsappmarketing.getId()).block();
    }

    protected void assertPersistedWhatsappmarketingToMatchAllProperties(Whatsappmarketing expectedWhatsappmarketing) {
        assertWhatsappmarketingAllPropertiesEquals(expectedWhatsappmarketing, getPersistedWhatsappmarketing(expectedWhatsappmarketing));
    }

    protected void assertPersistedWhatsappmarketingToMatchUpdatableProperties(Whatsappmarketing expectedWhatsappmarketing) {
        assertWhatsappmarketingAllUpdatablePropertiesEquals(
            expectedWhatsappmarketing,
            getPersistedWhatsappmarketing(expectedWhatsappmarketing)
        );
    }
}
