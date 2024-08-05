package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Accounts;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the Accounts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountsRepository extends ReactiveMongoRepository<Accounts, String> {
    Flux<Accounts> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<Accounts> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Accounts> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Accounts> findOneWithEagerRelationships(String id);
}
