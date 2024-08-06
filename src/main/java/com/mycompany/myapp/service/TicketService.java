package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Ticket;
import com.mycompany.myapp.repository.TicketRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Ticket}.
 */
@Service
public class TicketService {

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    /**
     * Save a ticket.
     *
     * @param ticket the entity to save.
     * @return the persisted entity.
     */
    public Mono<Ticket> save(Ticket ticket) {
        log.debug("Request to save Ticket : {}", ticket);
        return ticketRepository.save(ticket);
    }

    /**
     * Update a ticket.
     *
     * @param ticket the entity to save.
     * @return the persisted entity.
     */
    public Mono<Ticket> update(Ticket ticket) {
        log.debug("Request to update Ticket : {}", ticket);
        return ticketRepository.save(ticket);
    }

    /**
     * Partially update a ticket.
     *
     * @param ticket the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Ticket> partialUpdate(Ticket ticket) {
        log.debug("Request to partially update Ticket : {}", ticket);

        return ticketRepository
            .findById(ticket.getId())
            .map(existingTicket -> {
                if (ticket.getContact_name() != null) {
                    existingTicket.setContact_name(ticket.getContact_name());
                }
                if (ticket.getAccount_name() != null) {
                    existingTicket.setAccount_name(ticket.getAccount_name());
                }
                if (ticket.getEmail() != null) {
                    existingTicket.setEmail(ticket.getEmail());
                }
                if (ticket.getPhone() != null) {
                    existingTicket.setPhone(ticket.getPhone());
                }
                if (ticket.getSubject() != null) {
                    existingTicket.setSubject(ticket.getSubject());
                }
                if (ticket.getDescription() != null) {
                    existingTicket.setDescription(ticket.getDescription());
                }
                if (ticket.getStatus() != null) {
                    existingTicket.setStatus(ticket.getStatus());
                }
                if (ticket.getProduct_name() != null) {
                    existingTicket.setProduct_name(ticket.getProduct_name());
                }
                if (ticket.getDue_date() != null) {
                    existingTicket.setDue_date(ticket.getDue_date());
                }
                if (ticket.getLanguage() != null) {
                    existingTicket.setLanguage(ticket.getLanguage());
                }
                if (ticket.getChannel() != null) {
                    existingTicket.setChannel(ticket.getChannel());
                }
                if (ticket.getClassifications() != null) {
                    existingTicket.setClassifications(ticket.getClassifications());
                }
                if (ticket.getAttachments() != null) {
                    existingTicket.setAttachments(ticket.getAttachments());
                }
                if (ticket.getAttachmentsContentType() != null) {
                    existingTicket.setAttachmentsContentType(ticket.getAttachmentsContentType());
                }

                return existingTicket;
            })
            .flatMap(ticketRepository::save);
    }

    /**
     * Get all the tickets.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Ticket> findAll(Pageable pageable) {
        log.debug("Request to get all Tickets");
        return ticketRepository.findAllBy(pageable);
    }

    /**
     * Get all the tickets with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<Ticket> findAllWithEagerRelationships(Pageable pageable) {
        return ticketRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of tickets available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return ticketRepository.count();
    }

    /**
     * Get one ticket by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Ticket> findOne(String id) {
        log.debug("Request to get Ticket : {}", id);
        return ticketRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the ticket by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Ticket : {}", id);
        return ticketRepository.deleteById(id);
    }
}
