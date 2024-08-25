package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Ticket;
import com.mycompany.myapp.repository.TicketRepository;
import com.mycompany.myapp.service.TicketService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Ticket}.
 */
@RestController
@RequestMapping("/api/tickets")
public class TicketResource {

    private static final Logger log = LoggerFactory.getLogger(TicketResource.class);

    private static final String ENTITY_NAME = "ticket";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TicketService ticketService;

    private final TicketRepository ticketRepository;

    public TicketResource(TicketService ticketService, TicketRepository ticketRepository) {
        this.ticketService = ticketService;
        this.ticketRepository = ticketRepository;
    }

    /**
     * {@code POST  /tickets} : Create a new ticket.
     *
     * @param ticket the ticket to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new ticket, or with status {@code 400 (Bad Request)} if the
     *         ticket has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Ticket>> createTicket(@Valid @RequestBody Ticket ticket) throws URISyntaxException {
        log.debug("REST request to save Ticket : {}", ticket);
        if (ticket.getId() != null) {
            throw new BadRequestAlertException("A new ticket cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return ticketService
                .save(ticket)
                .map(result -> {
                    try {
                        return ResponseEntity.created(new URI("/api/tickets/" + result.getId()))
                                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME,
                                        result.getId()))
                                .body(result);
                    } catch (URISyntaxException e) {
                        throw new RuntimeException(e);
                    }
                });
    }

    /**
     * {@code PUT  /tickets/:id} : Updates an existing ticket.
     *
     * @param id     the id of the ticket to save.
     * @param ticket the ticket to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated ticket,
     *         or with status {@code 400 (Bad Request)} if the ticket is not valid,
     *         or with status {@code 500 (Internal Server Error)} if the ticket
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Ticket>> updateTicket(
            @PathVariable(value = "id", required = false) final String id,
            @Valid @RequestBody Ticket ticket) throws URISyntaxException {
        log.debug("REST request to update Ticket : {}, {}", id, ticket);
        if (ticket.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ticket.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return ticketRepository
                .existsById(id)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                    }

                    return ticketService
                            .update(ticket)
                            .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                            .map(
                                    result -> ResponseEntity.ok()
                                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false,
                                                    ENTITY_NAME, result.getId()))
                                            .body(result));
                });
    }

    /**
     * {@code PATCH  /tickets/:id} : Partial updates given fields of an existing
     * ticket, field will ignore if it is null
     *
     * @param id     the id of the ticket to save.
     * @param ticket the ticket to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated ticket,
     *         or with status {@code 400 (Bad Request)} if the ticket is not valid,
     *         or with status {@code 404 (Not Found)} if the ticket is not found,
     *         or with status {@code 500 (Internal Server Error)} if the ticket
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Ticket>> partialUpdateTicket(
            @PathVariable(value = "id", required = false) final String id,
            @NotNull @RequestBody Ticket ticket) throws URISyntaxException {
        log.debug("REST request to partial update Ticket partially : {}, {}", id, ticket);
        if (ticket.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ticket.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return ticketRepository
                .existsById(id)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                    }

                    Mono<Ticket> result = ticketService.partialUpdate(ticket);

                    return result
                            .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                            .map(
                                    res -> ResponseEntity.ok()
                                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false,
                                                    ENTITY_NAME, res.getId()))
                                            .body(res));
                });
    }

    /**
     * {@code GET  /tickets} : get all the tickets.
     *
     * @param pageable  the pagination information.
     * @param request   a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of tickets in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<Ticket>>> getAllTickets(
            @org.springdoc.core.annotations.ParameterObject Pageable pageable,
            ServerHttpRequest request,
            @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        log.debug("REST request to get a page of Tickets");
        return ticketService
                .countAll()
                .zipWith(ticketService.findAll(pageable).collectList())
                .map(
                        countWithEntities -> ResponseEntity.ok()
                                .headers(
                                        PaginationUtil.generatePaginationHttpHeaders(
                                                ForwardedHeaderUtils.adaptFromForwardedHeaders(request.getURI(),
                                                        request.getHeaders()),
                                                new PageImpl<>(countWithEntities.getT2(), pageable,
                                                        countWithEntities.getT1())))
                                .body(countWithEntities.getT2()));
    }

    /**
     * {@code GET  /tickets/:id} : get the "id" ticket.
     *
     * @param id the id of the ticket to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the ticket, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Ticket>> getTicket(@PathVariable("id") String id) {
        log.debug("REST request to get Ticket : {}", id);
        Mono<Ticket> ticket = ticketService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ticket);
    }

    /**
     * {@code DELETE  /tickets/:id} : delete the "id" ticket.
     *
     * @param id the id of the ticket to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteTicket(@PathVariable("id") String id) {
        log.debug("REST request to delete Ticket : {}", id);
        return ticketService
                .delete(id)
                .then(
                        Mono.just(
                                ResponseEntity.noContent()
                                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false,
                                                ENTITY_NAME, id))
                                        .build()));
    }
}
