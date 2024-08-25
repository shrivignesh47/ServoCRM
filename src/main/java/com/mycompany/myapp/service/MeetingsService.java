package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Meetings;
import com.mycompany.myapp.repository.MeetingsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Meetings}.
 */
@Service
public class MeetingsService {

    private static final Logger log = LoggerFactory.getLogger(MeetingsService.class);

    private final MeetingsRepository meetingsRepository;

    public MeetingsService(MeetingsRepository meetingsRepository) {
        this.meetingsRepository = meetingsRepository;
    }

    /**
     * Save a meetings.
     *
     * @param meetings the entity to save.
     * @return the persisted entity.
     */
    public Mono<Meetings> save(Meetings meetings) {
        log.debug("Request to save Meetings : {}", meetings);
        return meetingsRepository.save(meetings);
    }

    /**
     * Update a meetings.
     *
     * @param meetings the entity to save.
     * @return the persisted entity.
     */
    public Mono<Meetings> update(Meetings meetings) {
        log.debug("Request to update Meetings : {}", meetings);
        return meetingsRepository.save(meetings);
    }

    /**
     * Partially update a meetings.
     *
     * @param meetings the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Meetings> partialUpdate(Meetings meetings) {
        log.debug("Request to partially update Meetings : {}", meetings);

        return meetingsRepository
            .findById(meetings.getId())
            .map(existingMeetings -> {
                if (meetings.getTitle() != null) {
                    existingMeetings.setTitle(meetings.getTitle());
                }
                if (meetings.getLocation() != null) {
                    existingMeetings.setLocation(meetings.getLocation());
                }
                if (meetings.getLocation_Offline_Detail() != null) {
                    existingMeetings.setLocation_Offline_Detail(meetings.getLocation_Offline_Detail());
                }
                if (meetings.getFrom() != null) {
                    existingMeetings.setFrom(meetings.getFrom());
                }
                if (meetings.getTo() != null) {
                    existingMeetings.setTo(meetings.getTo());
                }
                if (meetings.getGoogle_meet() != null) {
                    existingMeetings.setGoogle_meet(meetings.getGoogle_meet());
                }

                return existingMeetings;
            })
            .flatMap(meetingsRepository::save);
    }

    /**
     * Get all the meetings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Meetings> findAll(Pageable pageable) {
        log.debug("Request to get all Meetings");
        return meetingsRepository.findAllBy(pageable);
    }

    /**
     * Get all the meetings with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<Meetings> findAllWithEagerRelationships(Pageable pageable) {
        return meetingsRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of meetings available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return meetingsRepository.count();
    }

    /**
     * Get one meetings by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Meetings> findOne(String id) {
        log.debug("Request to get Meetings : {}", id);
        return meetingsRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the meetings by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Meetings : {}", id);
        return meetingsRepository.deleteById(id);
    }
}
