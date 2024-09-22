package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.AttendanceAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Attendance;
import com.mycompany.myapp.domain.Event;
import com.mycompany.myapp.repository.AttendanceRepository;
import com.mycompany.myapp.service.AttendanceService;
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
 * Integration tests for the {@link AttendanceResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class AttendanceResourceIT {

    private static final String DEFAULT_USER = "AAAAAAAAAA";
    private static final String UPDATED_USER = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_TIMESTAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIMESTAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/attendances";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Mock
    private AttendanceRepository attendanceRepositoryMock;

    @Mock
    private AttendanceService attendanceServiceMock;

    @Autowired
    private WebTestClient webTestClient;

    private Attendance attendance;

    private Attendance insertedAttendance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attendance createEntity() {
        Attendance attendance = new Attendance().user(DEFAULT_USER).timestamp(DEFAULT_TIMESTAMP);
        // Add required entity
        Event event;
        event = EventResourceIT.createEntity();
        event.setId("fixed-id-for-tests");
        attendance.setEvent(event);
        return attendance;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attendance createUpdatedEntity() {
        Attendance attendance = new Attendance().user(UPDATED_USER).timestamp(UPDATED_TIMESTAMP);
        // Add required entity
        Event event;
        event = EventResourceIT.createUpdatedEntity();
        event.setId("fixed-id-for-tests");
        attendance.setEvent(event);
        return attendance;
    }

    @BeforeEach
    public void initTest() {
        attendance = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAttendance != null) {
            attendanceRepository.delete(insertedAttendance).block();
            insertedAttendance = null;
        }
    }

    @Test
    void createAttendance() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Attendance
        var returnedAttendance = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(Attendance.class)
            .returnResult()
            .getResponseBody();

        // Validate the Attendance in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertAttendanceUpdatableFieldsEquals(returnedAttendance, getPersistedAttendance(returnedAttendance));

        insertedAttendance = returnedAttendance;
    }

    @Test
    void createAttendanceWithExistingId() throws Exception {
        // Create the Attendance with an existing ID
        attendance.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkUserIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        attendance.setUser(null);

        // Create the Attendance, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkTimestampIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        attendance.setTimestamp(null);

        // Create the Attendance, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllAttendances() {
        // Initialize the database
        insertedAttendance = attendanceRepository.save(attendance).block();

        // Get all the attendanceList
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
            .value(hasItem(attendance.getId()))
            .jsonPath("$.[*].user")
            .value(hasItem(DEFAULT_USER))
            .jsonPath("$.[*].timestamp")
            .value(hasItem(sameInstant(DEFAULT_TIMESTAMP)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAttendancesWithEagerRelationshipsIsEnabled() {
        when(attendanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(attendanceServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAttendancesWithEagerRelationshipsIsNotEnabled() {
        when(attendanceServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(attendanceRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getAttendance() {
        // Initialize the database
        insertedAttendance = attendanceRepository.save(attendance).block();

        // Get the attendance
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, attendance.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(attendance.getId()))
            .jsonPath("$.user")
            .value(is(DEFAULT_USER))
            .jsonPath("$.timestamp")
            .value(is(sameInstant(DEFAULT_TIMESTAMP)));
    }

    @Test
    void getNonExistingAttendance() {
        // Get the attendance
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingAttendance() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.save(attendance).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendance
        Attendance updatedAttendance = attendanceRepository.findById(attendance.getId()).block();
        updatedAttendance.user(UPDATED_USER).timestamp(UPDATED_TIMESTAMP);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedAttendance.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedAttendance))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAttendanceToMatchAllProperties(updatedAttendance);
    }

    @Test
    void putNonExistingAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, attendance.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateAttendanceWithPatch() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.save(attendance).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendance using partial update
        Attendance partialUpdatedAttendance = new Attendance();
        partialUpdatedAttendance.setId(attendance.getId());

        partialUpdatedAttendance.user(UPDATED_USER);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedAttendance.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedAttendance))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Attendance in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAttendanceUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAttendance, attendance),
            getPersistedAttendance(attendance)
        );
    }

    @Test
    void fullUpdateAttendanceWithPatch() throws Exception {
        // Initialize the database
        insertedAttendance = attendanceRepository.save(attendance).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the attendance using partial update
        Attendance partialUpdatedAttendance = new Attendance();
        partialUpdatedAttendance.setId(attendance.getId());

        partialUpdatedAttendance.user(UPDATED_USER).timestamp(UPDATED_TIMESTAMP);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedAttendance.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedAttendance))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Attendance in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAttendanceUpdatableFieldsEquals(partialUpdatedAttendance, getPersistedAttendance(partialUpdatedAttendance));
    }

    @Test
    void patchNonExistingAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, attendance.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamAttendance() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        attendance.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(attendance))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Attendance in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteAttendance() {
        // Initialize the database
        insertedAttendance = attendanceRepository.save(attendance).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the attendance
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, attendance.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return attendanceRepository.count().block();
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

    protected Attendance getPersistedAttendance(Attendance attendance) {
        return attendanceRepository.findById(attendance.getId()).block();
    }

    protected void assertPersistedAttendanceToMatchAllProperties(Attendance expectedAttendance) {
        assertAttendanceAllPropertiesEquals(expectedAttendance, getPersistedAttendance(expectedAttendance));
    }

    protected void assertPersistedAttendanceToMatchUpdatableProperties(Attendance expectedAttendance) {
        assertAttendanceAllUpdatablePropertiesEquals(expectedAttendance, getPersistedAttendance(expectedAttendance));
    }
}
