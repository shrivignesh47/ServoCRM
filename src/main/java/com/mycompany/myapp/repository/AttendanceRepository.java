package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Attendance;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data MongoDB reactive repository for the Attendance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendanceRepository extends ReactiveMongoRepository<Attendance, String> {
    Flux<Attendance> findAllBy(Pageable pageable);

    @Query("{}")
    Flux<Attendance> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    Flux<Attendance> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Mono<Attendance> findOneWithEagerRelationships(String id);
}
