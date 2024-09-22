package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.EventAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Event;
import com.mycompany.myapp.repository.EventRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link EventResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class EventResourceIT {

    private static final String DEFAULT_EVENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_EVENT_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_EVENT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EVENT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_REGISTRATIONS = 1;
    private static final Integer UPDATED_REGISTRATIONS = 2;

    private static final String ENTITY_API_URL = "/api/events";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private ObjectMapper om;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private WebTestClient webTestClient;

    private Event event;

    private Event insertedEvent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Event createEntity() {
        Event event = new Event().event_name(DEFAULT_EVENT_NAME).event_date(DEFAULT_EVENT_DATE).registrations(DEFAULT_REGISTRATIONS);
        return event;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Event createUpdatedEntity() {
        Event event = new Event().event_name(UPDATED_EVENT_NAME).event_date(UPDATED_EVENT_DATE).registrations(UPDATED_REGISTRATIONS);
        return event;
    }

    @BeforeEach
    public void initTest() {
        event = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedEvent != null) {
            eventRepository.delete(insertedEvent).block();
            insertedEvent = null;
        }
    }

    @Test
    void createEvent() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Event
        var returnedEvent = webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isCreated()
            .expectBody(Event.class)
            .returnResult()
            .getResponseBody();

        // Validate the Event in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertEventUpdatableFieldsEquals(returnedEvent, getPersistedEvent(returnedEvent));

        insertedEvent = returnedEvent;
    }

    @Test
    void createEventWithExistingId() throws Exception {
        // Create the Event with an existing ID
        event.setId("existing_id");

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    void checkEvent_nameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        event.setEvent_name(null);

        // Create the Event, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void checkEvent_dateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        event.setEvent_date(null);

        // Create the Event, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isBadRequest();

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    void getAllEvents() {
        // Initialize the database
        insertedEvent = eventRepository.save(event).block();

        // Get all the eventList
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
            .value(hasItem(event.getId()))
            .jsonPath("$.[*].event_name")
            .value(hasItem(DEFAULT_EVENT_NAME))
            .jsonPath("$.[*].event_date")
            .value(hasItem(DEFAULT_EVENT_DATE.toString()))
            .jsonPath("$.[*].registrations")
            .value(hasItem(DEFAULT_REGISTRATIONS));
    }

    @Test
    void getEvent() {
        // Initialize the database
        insertedEvent = eventRepository.save(event).block();

        // Get the event
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, event.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(event.getId()))
            .jsonPath("$.event_name")
            .value(is(DEFAULT_EVENT_NAME))
            .jsonPath("$.event_date")
            .value(is(DEFAULT_EVENT_DATE.toString()))
            .jsonPath("$.registrations")
            .value(is(DEFAULT_REGISTRATIONS));
    }

    @Test
    void getNonExistingEvent() {
        // Get the event
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingEvent() throws Exception {
        // Initialize the database
        insertedEvent = eventRepository.save(event).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the event
        Event updatedEvent = eventRepository.findById(event.getId()).block();
        updatedEvent.event_name(UPDATED_EVENT_NAME).event_date(UPDATED_EVENT_DATE).registrations(UPDATED_REGISTRATIONS);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedEvent.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(updatedEvent))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedEventToMatchAllProperties(updatedEvent);
    }

    @Test
    void putNonExistingEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        event.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, event.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        event.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        event.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateEventWithPatch() throws Exception {
        // Initialize the database
        insertedEvent = eventRepository.save(event).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the event using partial update
        Event partialUpdatedEvent = new Event();
        partialUpdatedEvent.setId(event.getId());

        partialUpdatedEvent.event_date(UPDATED_EVENT_DATE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedEvent.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedEvent))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Event in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertEventUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedEvent, event), getPersistedEvent(event));
    }

    @Test
    void fullUpdateEventWithPatch() throws Exception {
        // Initialize the database
        insertedEvent = eventRepository.save(event).block();

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the event using partial update
        Event partialUpdatedEvent = new Event();
        partialUpdatedEvent.setId(event.getId());

        partialUpdatedEvent.event_name(UPDATED_EVENT_NAME).event_date(UPDATED_EVENT_DATE).registrations(UPDATED_REGISTRATIONS);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedEvent.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(partialUpdatedEvent))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Event in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertEventUpdatableFieldsEquals(partialUpdatedEvent, getPersistedEvent(partialUpdatedEvent));
    }

    @Test
    void patchNonExistingEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        event.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, event.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        event.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamEvent() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        event.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(om.writeValueAsBytes(event))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Event in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteEvent() {
        // Initialize the database
        insertedEvent = eventRepository.save(event).block();

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the event
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, event.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return eventRepository.count().block();
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

    protected Event getPersistedEvent(Event event) {
        return eventRepository.findById(event.getId()).block();
    }

    protected void assertPersistedEventToMatchAllProperties(Event expectedEvent) {
        assertEventAllPropertiesEquals(expectedEvent, getPersistedEvent(expectedEvent));
    }

    protected void assertPersistedEventToMatchUpdatableProperties(Event expectedEvent) {
        assertEventAllUpdatablePropertiesEquals(expectedEvent, getPersistedEvent(expectedEvent));
    }
}
