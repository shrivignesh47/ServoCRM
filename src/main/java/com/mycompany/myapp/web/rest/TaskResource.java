package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Task;
import com.mycompany.myapp.repository.TaskRepository;
import com.mycompany.myapp.service.TaskService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Task}.
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskResource {

    private static final Logger log = LoggerFactory.getLogger(TaskResource.class);

    private static final String ENTITY_NAME = "task";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskService taskService;

    private final TaskRepository taskRepository;

    public TaskResource(TaskService taskService, TaskRepository taskRepository) {
        this.taskService = taskService;
        this.taskRepository = taskRepository;
    }

    /**
     * {@code POST  /tasks} : Create a new task.
     *
     * @param task the task to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new task, or with status {@code 400 (Bad Request)} if the
     *         task has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<Task>> createTask(@Valid @RequestBody Task task) throws URISyntaxException {
        log.debug("REST request to save Task : {}", task);
        if (task.getId() != null) {
            throw new BadRequestAlertException("A new task cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return taskService
                .save(task)
                .map(result -> {
                    try {
                        return ResponseEntity.created(new URI("/api/tasks/" + result.getId()))
                                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME,
                                        result.getId()))
                                .body(result);
                    } catch (URISyntaxException e) {
                        throw new RuntimeException(e);
                    }
                });
    }

    /**
     * {@code PUT  /tasks/:id} : Updates an existing task.
     *
     * @param id   the id of the task to save.
     * @param task the task to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated task,
     *         or with status {@code 400 (Bad Request)} if the task is not valid,
     *         or with status {@code 500 (Internal Server Error)} if the task
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Task>> updateTask(
            @PathVariable(value = "id", required = false) final String id,
            @Valid @RequestBody Task task) throws URISyntaxException {
        log.debug("REST request to update Task : {}, {}", id, task);
        if (task.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return taskRepository
                .existsById(id)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                    }

                    return taskService
                            .update(task)
                            .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                            .map(
                                    result -> ResponseEntity.ok()
                                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false,
                                                    ENTITY_NAME, result.getId()))
                                            .body(result));
                });
    }

    /**
     * {@code PATCH  /tasks/:id} : Partial updates given fields of an existing task,
     * field will ignore if it is null
     *
     * @param id   the id of the task to save.
     * @param task the task to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated task,
     *         or with status {@code 400 (Bad Request)} if the task is not valid,
     *         or with status {@code 404 (Not Found)} if the task is not found,
     *         or with status {@code 500 (Internal Server Error)} if the task
     *         couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<Task>> partialUpdateTask(
            @PathVariable(value = "id", required = false) final String id,
            @NotNull @RequestBody Task task) throws URISyntaxException {
        log.debug("REST request to partial update Task partially : {}, {}", id, task);
        if (task.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, task.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return taskRepository
                .existsById(id)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                    }

                    Mono<Task> result = taskService.partialUpdate(task);

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
     * {@code GET  /tasks} : get all the tasks.
     *
     * @param pageable  the pagination information.
     * @param request   a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of tasks in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<Task>>> getAllTasks(
            @org.springdoc.core.annotations.ParameterObject Pageable pageable,
            ServerHttpRequest request,
            @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        log.debug("REST request to get a page of Tasks");
        return taskService
                .countAll()
                .zipWith(taskService.findAll(pageable).collectList())
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
     * {@code GET  /tasks/:id} : get the "id" task.
     *
     * @param id the id of the task to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the task, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<Task>> getTask(@PathVariable("id") String id) {
        log.debug("REST request to get Task : {}", id);
        Mono<Task> task = taskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(task);
    }

    /**
     * {@code DELETE  /tasks/:id} : delete the "id" task.
     *
     * @param id the id of the task to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteTask(@PathVariable("id") String id) {
        log.debug("REST request to delete Task : {}", id);
        return taskService
                .delete(id)
                .then(
                        Mono.just(
                                ResponseEntity.noContent()
                                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false,
                                                ENTITY_NAME, id))
                                        .build()));
    }
}
