package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Event;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

/**
 * Spring Data MongoDB reactive repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends ReactiveMongoRepository<Event, String> {
    Flux<Event> findAllBy(Pageable pageable);
}
