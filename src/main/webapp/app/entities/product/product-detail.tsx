import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product.reducer';

export const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">Product</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="product_name">Product Name</span>
          </dt>
          <dd>{productEntity.product_name}</dd>
          <dt>
            <span id="product_code">Product Code</span>
          </dt>
          <dd>{productEntity.product_code}</dd>
          <dt>
            <span id="product_category">Product Category</span>
          </dt>
          <dd>{productEntity.product_category}</dd>
          <dt>
            <span id="manufacture">Manufacture</span>
          </dt>
          <dd>{productEntity.manufacture}</dd>
          <dt>
            <span id="sales_start_date">Sales Start Date</span>
          </dt>
          <dd>
            {productEntity.sales_start_date ? (
              <TextFormat value={productEntity.sales_start_date} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="sales_end_date">Sales End Date</span>
          </dt>
          <dd>{productEntity.sales_end_date}</dd>
          <dt>
            <span id="sales_Ending_date">Sales Ending Date</span>
          </dt>
          <dd>
            {productEntity.sales_Ending_date ? (
              <TextFormat value={productEntity.sales_Ending_date} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="support_start_date">Support Start Date</span>
          </dt>
          <dd>
            {productEntity.support_start_date ? (
              <TextFormat value={productEntity.support_start_date} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="support_end_date">Support End Date</span>
          </dt>
          <dd>
            {productEntity.support_end_date ? (
              <TextFormat value={productEntity.support_end_date} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="unit_price">Unit Price</span>
          </dt>
          <dd>{productEntity.unit_price}</dd>
          <dt>
            <span id="commission_rate">Commission Rate</span>
          </dt>
          <dd>{productEntity.commission_rate}</dd>
          <dt>
            <span id="tax">Tax</span>
          </dt>
          <dd>{productEntity.tax}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>User</dt>
          <dd>{productEntity.user ? productEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;
