import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './product.reducer';

export const Product = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const productList = useAppSelector(state => state.product.entities);
  const loading = useAppSelector(state => state.product.loading);
  const totalItems = useAppSelector(state => state.product.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="product-heading" data-cy="ProductHeading">
        Products
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/product/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Product
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {productList && productList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('product_name')}>
                  Product Name <FontAwesomeIcon icon={getSortIconByFieldName('product_name')} />
                </th>
                <th className="hand" onClick={sort('product_code')}>
                  Product Code <FontAwesomeIcon icon={getSortIconByFieldName('product_code')} />
                </th>
                <th className="hand" onClick={sort('product_category')}>
                  Product Category <FontAwesomeIcon icon={getSortIconByFieldName('product_category')} />
                </th>
                <th className="hand" onClick={sort('manufacture')}>
                  Manufacture <FontAwesomeIcon icon={getSortIconByFieldName('manufacture')} />
                </th>
                <th className="hand" onClick={sort('sales_start_date')}>
                  Sales Start Date <FontAwesomeIcon icon={getSortIconByFieldName('sales_start_date')} />
                </th>
                <th className="hand" onClick={sort('sales_end_date')}>
                  Sales End Date <FontAwesomeIcon icon={getSortIconByFieldName('sales_end_date')} />
                </th>
                <th className="hand" onClick={sort('sales_Ending_date')}>
                  Sales Ending Date <FontAwesomeIcon icon={getSortIconByFieldName('sales_Ending_date')} />
                </th>
                <th className="hand" onClick={sort('support_start_date')}>
                  Support Start Date <FontAwesomeIcon icon={getSortIconByFieldName('support_start_date')} />
                </th>
                <th className="hand" onClick={sort('support_end_date')}>
                  Support End Date <FontAwesomeIcon icon={getSortIconByFieldName('support_end_date')} />
                </th>
                <th className="hand" onClick={sort('unit_price')}>
                  Unit Price <FontAwesomeIcon icon={getSortIconByFieldName('unit_price')} />
                </th>
                <th className="hand" onClick={sort('commission_rate')}>
                  Commission Rate <FontAwesomeIcon icon={getSortIconByFieldName('commission_rate')} />
                </th>
                <th className="hand" onClick={sort('tax')}>
                  Tax <FontAwesomeIcon icon={getSortIconByFieldName('tax')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th>
                  User <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productList.map((product, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/product/${product.id}`} color="link" size="sm">
                      {product.id}
                    </Button>
                  </td>
                  <td>{product.product_name}</td>
                  <td>{product.product_code}</td>
                  <td>{product.product_category}</td>
                  <td>{product.manufacture}</td>
                  <td>
                    {product.sales_start_date ? <TextFormat type="date" value={product.sales_start_date} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{product.sales_end_date}</td>
                  <td>
                    {product.sales_Ending_date ? (
                      <TextFormat type="date" value={product.sales_Ending_date} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {product.support_start_date ? (
                      <TextFormat type="date" value={product.support_start_date} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {product.support_end_date ? <TextFormat type="date" value={product.support_end_date} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{product.unit_price}</td>
                  <td>{product.commission_rate}</td>
                  <td>{product.tax}</td>
                  <td>{product.description}</td>
                  <td>{product.user ? product.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/product/${product.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/product/${product.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/product/${product.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Products found</div>
        )}
      </div>
      {totalItems ? (
        <div className={productList && productList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Product;
