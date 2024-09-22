package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Attendance;
import com.mycompany.myapp.repository.AttendanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Attendance}.
 */
@Service
public class AttendanceService {

    private static final Logger log = LoggerFactory.getLogger(AttendanceService.class);

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    /**
     * Save a attendance.
     *
     * @param attendance the entity to save.
     * @return the persisted entity.
     */
    public Mono<Attendance> save(Attendance attendance) {
        log.debug("Request to save Attendance : {}", attendance);
        return attendanceRepository.save(attendance);
    }

    /**
     * Update a attendance.
     *
     * @param attendance the entity to save.
     * @return the persisted entity.
     */
    public Mono<Attendance> update(Attendance attendance) {
        log.debug("Request to update Attendance : {}", attendance);
        return attendanceRepository.save(attendance);
    }

    /**
     * Partially update a attendance.
     *
     * @param attendance the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Attendance> partialUpdate(Attendance attendance) {
        log.debug("Request to partially update Attendance : {}", attendance);

        return attendanceRepository
            .findById(attendance.getId())
            .map(existingAttendance -> {
                if (attendance.getUser() != null) {
                    existingAttendance.setUser(attendance.getUser());
                }
                if (attendance.getTimestamp() != null) {
                    existingAttendance.setTimestamp(attendance.getTimestamp());
                }

                return existingAttendance;
            })
            .flatMap(attendanceRepository::save);
    }

    /**
     * Get all the attendances.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Attendance> findAll(Pageable pageable) {
        log.debug("Request to get all Attendances");
        return attendanceRepository.findAllBy(pageable);
    }

    /**
     * Get all the attendances with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<Attendance> findAllWithEagerRelationships(Pageable pageable) {
        return attendanceRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of attendances available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return attendanceRepository.count();
    }

    /**
     * Get one attendance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Attendance> findOne(String id) {
        log.debug("Request to get Attendance : {}", id);
        return attendanceRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the attendance by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Attendance : {}", id);
        return attendanceRepository.deleteById(id);
    }
}
