package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Whatsappmarketing;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the Whatsappmarketing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WhatsappmarketingRepository extends ReactiveMongoRepository<Whatsappmarketing, String> {
    Flux<Whatsappmarketing> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<Whatsappmarketing> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Whatsappmarketing> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Whatsappmarketing> findOneWithEagerRelationships(String id);
}
