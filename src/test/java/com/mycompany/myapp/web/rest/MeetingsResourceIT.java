package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.MeetingsAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Meetings;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.enumeration.location;
import com.mycompany.myapp.repository.MeetingsRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.MeetingsService;
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
 * Integration tests for the {@link MeetingsResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class MeetingsResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final location DEFAULT_LOCATION = location.ONLINE;
    private static final location UPDATED_LOCATION = location.OFFLINE;

    private static final String DEFAULT_LOCATION_OFFLINE_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_OFFLINE_DETAIL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FROM = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FROM = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/meetings";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private MeetingsRepository meetingsRepository;

    @Autowired
    private UserRepository userRepository;

    @Mock
    private MeetingsRepository meetingsRepositoryMock;

    @Mock
    private MeetingsService meetingsServiceMock;

    @Autowired
    private WebTestClient webTestClient;

    private Meetings meetings;

    private Meetings insertedMeetings;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Meetings createEntity() {
        Meetings meetings = new Meetings()
            .title(DEFAULT_TITLE)
            .location(DEFAULT_LOCATION)
            .location_Offline_Detail(DEFAULT_LOCATION_OFFLINE_DETAIL)
            .from(DEFAULT_FROM)
            .to(DEFAULT_TO);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        meetings.setUser(user);
        return meetings;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Meetings createUpdatedEntity() {
        Meetings meetings = new Meetings()
            .title(UPDATED_TITLE)
            .location(UPDATED_LOCATION)
            .location_Offline_Detail(UPDATED_LOCATION_OFFLINE_DETAIL)
            .from(UPDATED_FROM)
            .to(UPDATED_TO);
        // Add required entity
        User user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        meetings.setUser(user);
        return meetings;
    }

    @BeforeEach
    public void initTest() {
        meetings = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedMeetings != null) {
            meetingsRepository.delete(insertedMeetings).block();
            insertedMeetings = null;
        }
    }

    @Test
    void createMeetings() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Meetings
        var returnedMeetings = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(Meetings.class)
            .returnResult()
            .getResponseBody();

        // Validate the Meetings in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertMeetingsUpdatableFieldsEquals(returnedMeetings, getPersistedMeetings(returnedMeetings));

        insertedMeetings = returnedMeetings;
    }

    @Test
    void createMeetingsWithExistingId() throws Exception {
        // Create the Meetings with an existing ID
        meetings.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkTitleIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        meetings.setTitle(null);

        // Create the Meetings, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkLocationIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        meetings.setLocation(null);

        // Create the Meetings, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkFromIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        meetings.setFrom(null);

        // Create the Meetings, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkToIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        meetings.setTo(null);

        // Create the Meetings, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllMeetings() {
        // Initialize the database
        insertedMeetings = meetingsRepository.save(meetings).block();

        // Get all the meetingsList
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
            .value(hasItem(meetings.getId()))
            .jsonPath("$.[*].title")
            .value(hasItem(DEFAULT_TITLE))
            .jsonPath("$.[*].location")
            .value(hasItem(DEFAULT_LOCATION.toString()))
            .jsonPath("$.[*].location_Offline_Detail")
            .value(hasItem(DEFAULT_LOCATION_OFFLINE_DETAIL))
            .jsonPath("$.[*].from")
            .value(hasItem(sameInstant(DEFAULT_FROM)))
            .jsonPath("$.[*].to")
            .value(hasItem(sameInstant(DEFAULT_TO)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMeetingsWithEagerRelationshipsIsEnabled() {
        when(meetingsServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(meetingsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllMeetingsWithEagerRelationshipsIsNotEnabled() {
        when(meetingsServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(meetingsRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getMeetings() {
        // Initialize the database
        insertedMeetings = meetingsRepository.save(meetings).block();

        // Get the meetings
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, meetings.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(meetings.getId()))
            .jsonPath("$.title")
            .value(is(DEFAULT_TITLE))
            .jsonPath("$.location")
            .value(is(DEFAULT_LOCATION.toString()))
            .jsonPath("$.location_Offline_Detail")
            .value(is(DEFAULT_LOCATION_OFFLINE_DETAIL))
            .jsonPath("$.from")
            .value(is(sameInstant(DEFAULT_FROM)))
            .jsonPath("$.to")
            .value(is(sameInstant(DEFAULT_TO)));
    }

    @Test
    void getNonExistingMeetings() {
        // Get the meetings
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingMeetings() throws Exception {
        // Initialize the database
        insertedMeetings = meetingsRepository.save(meetings).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the meetings
        Meetings updatedMeetings = meetingsRepository.findById(meetings.getId()).block();
        updatedMeetings
            .title(UPDATED_TITLE)
            .location(UPDATED_LOCATION)
            .location_Offline_Detail(UPDATED_LOCATION_OFFLINE_DETAIL)
            .from(UPDATED_FROM)
            .to(UPDATED_TO);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedMeetings.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedMeetings))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedMeetingsToMatchAllProperties(updatedMeetings);
    }

    @Test
    void putNonExistingMeetings() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        meetings.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, meetings.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchMeetings() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        meetings.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamMeetings() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        meetings.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateMeetingsWithPatch() throws Exception {
        // Initialize the database
        insertedMeetings = meetingsRepository.save(meetings).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the meetings using partial update
        Meetings partialUpdatedMeetings = new Meetings();
        partialUpdatedMeetings.setId(meetings.getId());

        partialUpdatedMeetings.title(UPDATED_TITLE).location(UPDATED_LOCATION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedMeetings.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedMeetings))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Meetings in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMeetingsUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedMeetings, meetings), getPersistedMeetings(meetings));
    }

    @Test
    void fullUpdateMeetingsWithPatch() throws Exception {
        // Initialize the database
        insertedMeetings = meetingsRepository.save(meetings).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the meetings using partial update
        Meetings partialUpdatedMeetings = new Meetings();
        partialUpdatedMeetings.setId(meetings.getId());

        partialUpdatedMeetings
            .title(UPDATED_TITLE)
            .location(UPDATED_LOCATION)
            .location_Offline_Detail(UPDATED_LOCATION_OFFLINE_DETAIL)
            .from(UPDATED_FROM)
            .to(UPDATED_TO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedMeetings.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedMeetings))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Meetings in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertMeetingsUpdatableFieldsEquals(partialUpdatedMeetings, getPersistedMeetings(partialUpdatedMeetings));
    }

    @Test
    void patchNonExistingMeetings() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        meetings.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, meetings.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchMeetings() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        meetings.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamMeetings() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        meetings.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(meetings))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Meetings in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteMeetings() {
        // Initialize the database
        insertedMeetings = meetingsRepository.save(meetings).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the meetings
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, meetings.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return meetingsRepository.count().block();
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

    protected Meetings getPersistedMeetings(Meetings meetings) {
        return meetingsRepository.findById(meetings.getId()).block();
    }

    protected void assertPersistedMeetingsToMatchAllProperties(Meetings expectedMeetings) {
        assertMeetingsAllPropertiesEquals(expectedMeetings, getPersistedMeetings(expectedMeetings));
    }

    protected void assertPersistedMeetingsToMatchUpdatableProperties(Meetings expectedMeetings) {
        assertMeetingsAllUpdatablePropertiesEquals(expectedMeetings, getPersistedMeetings(expectedMeetings));
    }
}
