package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Event;
import com.mycompany.myapp.repository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Event}.
 */
@Service
public class EventService {

    private static final Logger log = LoggerFactory.getLogger(EventService.class);

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Save a event.
     *
     * @param event the entity to save.
     * @return the persisted entity.
     */
    public Mono<Event> save(Event event) {
        log.debug("Request to save Event : {}", event);
        return eventRepository.save(event);
    }

    /**
     * Update a event.
     *
     * @param event the entity to save.
     * @return the persisted entity.
     */
    public Mono<Event> update(Event event) {
        log.debug("Request to update Event : {}", event);
        return eventRepository.save(event);
    }

    /**
     * Partially update a event.
     *
     * @param event the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Event> partialUpdate(Event event) {
        log.debug("Request to partially update Event : {}", event);

        return eventRepository
            .findById(event.getId())
            .map(existingEvent -> {
                if (event.getEvent_name() != null) {
                    existingEvent.setEvent_name(event.getEvent_name());
                }
                if (event.getEvent_date() != null) {
                    existingEvent.setEvent_date(event.getEvent_date());
                }
                if (event.getRegistrations() != null) {
                    existingEvent.setRegistrations(event.getRegistrations());
                }

                return existingEvent;
            })
            .flatMap(eventRepository::save);
    }

    /**
     * Get all the events.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Event> findAll(Pageable pageable) {
        log.debug("Request to get all Events");
        return eventRepository.findAllBy(pageable);
    }

    /**
     * Returns the number of events available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return eventRepository.count();
    }

    /**
     * Get one event by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Event> findOne(String id) {
        log.debug("Request to get Event : {}", id);
        return eventRepository.findById(id);
    }

    /**
     * Delete the event by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Event : {}", id);
        return eventRepository.deleteById(id);
    }
}
