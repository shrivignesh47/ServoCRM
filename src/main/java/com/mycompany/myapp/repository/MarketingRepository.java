package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Marketing;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

/**
 * Spring Data MongoDB reactive repository for the Marketing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarketingRepository extends ReactiveMongoRepository<Marketing, String> {
    Flux<Marketing> findAllBy(Pageable pageable);
}
