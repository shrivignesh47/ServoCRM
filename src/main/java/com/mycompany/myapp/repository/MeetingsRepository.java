package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Meetings;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the Meetings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeetingsRepository extends ReactiveMongoRepository<Meetings, String> {
    Flux<Meetings> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<Meetings> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Meetings> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Meetings> findOneWithEagerRelationships(String id);
}
