package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Product}.
 */
@Service
public class ProductService {

    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Save a product.
     *
     * @param product the entity to save.
     * @return the persisted entity.
     */
    public Mono<Product> save(Product product) {
        log.debug("Request to save Product : {}", product);
        return productRepository.save(product);
    }

    /**
     * Update a product.
     *
     * @param product the entity to save.
     * @return the persisted entity.
     */
    public Mono<Product> update(Product product) {
        log.debug("Request to update Product : {}", product);
        return productRepository.save(product);
    }

    /**
     * Partially update a product.
     *
     * @param product the entity to update partially.
     * @return the persisted entity.
     */
    public Mono<Product> partialUpdate(Product product) {
        log.debug("Request to partially update Product : {}", product);

        return productRepository
            .findById(product.getId())
            .map(existingProduct -> {
                if (product.getProduct_name() != null) {
                    existingProduct.setProduct_name(product.getProduct_name());
                }
                if (product.getProduct_code() != null) {
                    existingProduct.setProduct_code(product.getProduct_code());
                }
                if (product.getProduct_category() != null) {
                    existingProduct.setProduct_category(product.getProduct_category());
                }
                if (product.getManufacture() != null) {
                    existingProduct.setManufacture(product.getManufacture());
                }
                if (product.getSales_start_date() != null) {
                    existingProduct.setSales_start_date(product.getSales_start_date());
                }
                if (product.getSales_end_date() != null) {
                    existingProduct.setSales_end_date(product.getSales_end_date());
                }
                if (product.getSales_Ending_date() != null) {
                    existingProduct.setSales_Ending_date(product.getSales_Ending_date());
                }
                if (product.getSupport_start_date() != null) {
                    existingProduct.setSupport_start_date(product.getSupport_start_date());
                }
                if (product.getSupport_end_date() != null) {
                    existingProduct.setSupport_end_date(product.getSupport_end_date());
                }
                if (product.getUnit_price() != null) {
                    existingProduct.setUnit_price(product.getUnit_price());
                }
                if (product.getCommission_rate() != null) {
                    existingProduct.setCommission_rate(product.getCommission_rate());
                }
                if (product.getTax() != null) {
                    existingProduct.setTax(product.getTax());
                }
                if (product.getDescription() != null) {
                    existingProduct.setDescription(product.getDescription());
                }

                return existingProduct;
            })
            .flatMap(productRepository::save);
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Flux<Product> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAllBy(pageable);
    }

    /**
     * Get all the products with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Flux<Product> findAllWithEagerRelationships(Pageable pageable) {
        return productRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Returns the number of products available.
     * @return the number of entities in the database.
     *
     */
    public Mono<Long> countAll() {
        return productRepository.count();
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Mono<Product> findOne(String id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    public Mono<Void> delete(String id) {
        log.debug("Request to delete Product : {}", id);
        return productRepository.deleteById(id);
    }
}
