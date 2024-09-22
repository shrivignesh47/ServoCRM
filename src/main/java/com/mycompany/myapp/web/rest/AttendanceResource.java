package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Attendance;
import com.mycompany.myapp.repository.AttendanceRepository;
import com.mycompany.myapp.service.AttendanceService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.ForwardedHeaderUtils;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Attendance}.
 */
@RestController
@RequestMapping("/api/attendances")
public class AttendanceResource {

    private static final Logger log = LoggerFactory.getLogger(AttendanceResource.class);

    private static final String ENTITY_NAME = "attendance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttendanceService attendanceService;

    private final AttendanceRepository attendanceRepository;

    public AttendanceResource(AttendanceService attendanceService, AttendanceRepository attendanceRepository) {
        this.attendanceService = attendanceService;
        this.attendanceRepository = attendanceRepository;
    }

    /**
     * {@code POST  /attendances} : Create a new attendance.
     *
     * @param attendance the attendance to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attendance, or with status {@code 400 (Bad Request)} if the attendance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Attendance>> createAttendance(@Valid @RequestBody Attendance attendance) throws URISyntaxException {
        log.debug("REST request to save Attendance : {}", attendance);
        if (attendance.getId() != null) {
            throw new BadRequestAlertException("A new attendance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return attendanceService
            .save(attendance)
            .map(result -> {
                try {
                    return ResponseEntity.created(new URI("/api/attendances/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /attendances/:id} : Updates an existing attendance.
     *
     * @param id the id of the attendance to save.
     * @param attendance the attendance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attendance,
     * or with status {@code 400 (Bad Request)} if the attendance is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attendance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Attendance>> updateAttendance(
        @PathVariable(value = "id", required = false) final String id,
        @Valid @RequestBody Attendance attendance
    ) throws URISyntaxException {
        log.debug("REST request to update Attendance : {}, {}", id, attendance);
        if (attendance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, attendance.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return attendanceRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return attendanceService
                    .update(attendance)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        result ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, result.getId()))
                                .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /attendances/:id} : Partial updates given fields of an existing attendance, field will ignore if it is null
     *
     * @param id the id of the attendance to save.
     * @param attendance the attendance to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attendance,
     * or with status {@code 400 (Bad Request)} if the attendance is not valid,
     * or with status {@code 404 (Not Found)} if the attendance is not found,
     * or with status {@code 500 (Internal Server Error)} if the attendance couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Attendance>> partialUpdateAttendance(
        @PathVariable(value = "id", required = false) final String id,
        @NotNull @RequestBody Attendance attendance
    ) throws URISyntaxException {
        log.debug("REST request to partial update Attendance partially : {}, {}", id, attendance);
        if (attendance.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, attendance.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return attendanceRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<Attendance> result = attendanceService.partialUpdate(attendance);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(
                        res ->
                            ResponseEntity.ok()
                                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, res.getId()))
                                .body(res)
                    );
            });
    }

    /**
     * {@code GET  /attendances} : get all the attendances.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attendances in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<Attendance>>> getAllAttendances(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Attendances");
        return attendanceService
            .countAll()
            .zipWith(attendanceService.findAll(pageable).collectList())
            .map(
                countWithEntities ->
                    ResponseEntity.ok()
                        .headers(
                            PaginationUtil.generatePaginationHttpHeaders(
                                ForwardedHeaderUtils.adaptFromForwardedHeaders(request.getURI(), request.getHeaders()),
                                new PageImpl<>(countWithEntities.getT2(), pageable, countWithEntities.getT1())
                            )
                        )
                        .body(countWithEntities.getT2())
            );
    }

    /**
     * {@code GET  /attendances/:id} : get the "id" attendance.
     *
     * @param id the id of the attendance to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attendance, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Attendance>> getAttendance(@PathVariable("id") String id) {
        log.debug("REST request to get Attendance : {}", id);
        Mono<Attendance> attendance = attendanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attendance);
    }

    /**
     * {@code DELETE  /attendances/:id} : delete the "id" attendance.
     *
     * @param id the id of the attendance to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteAttendance(@PathVariable("id") String id) {
        log.debug("REST request to delete Attendance : {}", id);
        return attendanceService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity.noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id))
                        .build()
                )
            );
    }
}
