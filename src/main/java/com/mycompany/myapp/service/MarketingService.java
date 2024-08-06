package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Marketing;
import com.mycompany.myapp.repository.MarketingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Marketing}.
 */
@Service
public class MarketingService {

    private static final Logger log = LoggerFactory.getLogger(MarketingService.class);

    private final MarketingRepository marketingRepository;

    public MarketingService(MarketingRepository marketingRepository) {
        this.marketingRepository = marketingRepository;
    }

    /**
     * Save a marketing.
     *
     * @param marketing the entity to save.
     * @return the persisted entity.
     */
    public Mono<Marketing> save(Marketing marketing) {
        log.debug("Request to save Marketing : {}", marketing);
        return marketingRepository.save(marketing);
    }

    /**
     * Update a marketing.
     *
     * @param marketing the entity to save.
     * @return the persisted entity.
     */
    public Mono<Marketing> update(Marketing marketing) {
        log.debug("Request to update Marketing : {}", marketing);
        return marketingRepository.save(marketing);
    }

    /**
     * Partially update a marketing.
     *
     * @param marketing the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Marketing> partialUpdate(Marketing marketing) {
        log.debug("Request to partially update Marketing : {}", marketing);

        return marketingRepository
            .findById(marketing.getId())
            .map(existingMarketing -> {
                if (marketing.getCampaign_name() != null) {
                    existingMarketing.setCampaign_name(marketing.getCampaign_name());
                }
                if (marketing.getStart_date() != null) {
                    existingMarketing.setStart_date(marketing.getStart_date());
                }
                if (marketing.getEnd_date() != null) {
                    existingMarketing.setEnd_date(marketing.getEnd_date());
                }
                if (marketing.getType() != null) {
                    existingMarketing.setType(marketing.getType());
                }
                if (marketing.getStatus() != null) {
                    existingMarketing.setStatus(marketing.getStatus());
                }

                return existingMarketing;
            })
            .flatMap(marketingRepository::save);
    }

    /**
     * Get all the marketings.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Marketing> findAll(Pageable pageable) {
        log.debug("Request to get all Marketings");
        return marketingRepository.findAllBy(pageable);
    }

    /**
     * Returns the number of marketings available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return marketingRepository.count();
    }

    /**
     * Get one marketing by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Marketing> findOne(String id) {
        log.debug("Request to get Marketing : {}", id);
        return marketingRepository.findById(id);
    }

    /**
     * Delete the marketing by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Marketing : {}", id);
        return marketingRepository.deleteById(id);
    }
}
