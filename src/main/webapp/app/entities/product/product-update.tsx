import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { product_cat } from 'app/shared/model/enumerations/product-cat.model';
import { h } from 'app/shared/model/enumerations/h.model';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';

export const ProductUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const productEntity = useAppSelector(state => state.product.entity);
  const loading = useAppSelector(state => state.product.loading);
  const updating = useAppSelector(state => state.product.updating);
  const updateSuccess = useAppSelector(state => state.product.updateSuccess);
  const product_catValues = Object.keys(product_cat);
  const hValues = Object.keys(h);

  const handleClose = () => {
    navigate('/product' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.product_code !== undefined && typeof values.product_code !== 'number') {
      values.product_code = Number(values.product_code);
    }
    values.sales_start_date = convertDateTimeToServer(values.sales_start_date);
    values.sales_Ending_date = convertDateTimeToServer(values.sales_Ending_date);
    values.support_start_date = convertDateTimeToServer(values.support_start_date);
    values.support_end_date = convertDateTimeToServer(values.support_end_date);
    if (values.unit_price !== undefined && typeof values.unit_price !== 'number') {
      values.unit_price = Number(values.unit_price);
    }
    if (values.commission_rate !== undefined && typeof values.commission_rate !== 'number') {
      values.commission_rate = Number(values.commission_rate);
    }

    const entity = {
      ...productEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          sales_start_date: displayDefaultDateTime(),
          sales_Ending_date: displayDefaultDateTime(),
          support_start_date: displayDefaultDateTime(),
          support_end_date: displayDefaultDateTime(),
        }
      : {
          product_category: 'NONE',
          sales_end_date: 'H',
          ...productEntity,
          sales_start_date: convertDateTimeFromServer(productEntity.sales_start_date),
          sales_Ending_date: convertDateTimeFromServer(productEntity.sales_Ending_date),
          support_start_date: convertDateTimeFromServer(productEntity.support_start_date),
          support_end_date: convertDateTimeFromServer(productEntity.support_end_date),
          user: productEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmApp.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
            Create or edit a Product
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="product-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Product Name"
                id="product-product_name"
                name="product_name"
                data-cy="product_name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Product Code" id="product-product_code" name="product_code" data-cy="product_code" type="text" />
              <ValidatedField
                label="Product Category"
                id="product-product_category"
                name="product_category"
                data-cy="product_category"
                type="select"
              >
                {product_catValues.map(product_cat => (
                  <option value={product_cat} key={product_cat}>
                    {product_cat}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Manufacture"
                id="product-manufacture"
                name="manufacture"
                data-cy="manufacture"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Sales Start Date"
                id="product-sales_start_date"
                name="sales_start_date"
                data-cy="sales_start_date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Sales End Date"
                id="product-sales_end_date"
                name="sales_end_date"
                data-cy="sales_end_date"
                type="select"
              >
                {hValues.map(h => (
                  <option value={h} key={h}>
                    {h}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Sales Ending Date"
                id="product-sales_Ending_date"
                name="sales_Ending_date"
                data-cy="sales_Ending_date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Support Start Date"
                id="product-support_start_date"
                name="support_start_date"
                data-cy="support_start_date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Support End Date"
                id="product-support_end_date"
                name="support_end_date"
                data-cy="support_end_date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Unit Price" id="product-unit_price" name="unit_price" data-cy="unit_price" type="text" />
              <ValidatedField
                label="Commission Rate"
                id="product-commission_rate"
                name="commission_rate"
                data-cy="commission_rate"
                type="text"
              />
              <ValidatedField label="Tax" id="product-tax" name="tax" data-cy="tax" type="text" />
              <ValidatedField
                label="Description"
                id="product-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="product-user" name="user" data-cy="user" label="User" type="select" required>
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>This field is required.</FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/product" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductUpdate;
