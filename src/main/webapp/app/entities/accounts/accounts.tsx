import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './accounts.reducer';

export const Accounts = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const accountsList = useAppSelector(state => state.accounts.entities);
  const loading = useAppSelector(state => state.accounts.loading);
  const totalItems = useAppSelector(state => state.accounts.totalItems);

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
      <h2 id="accounts-heading" data-cy="AccountsHeading">
        Accounts
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/accounts/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Accounts
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {accountsList && accountsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('account_owner')}>
                  Account Owner <FontAwesomeIcon icon={getSortIconByFieldName('account_owner')} />
                </th>
                <th className="hand" onClick={sort('rating')}>
                  Rating <FontAwesomeIcon icon={getSortIconByFieldName('rating')} />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  Phone <FontAwesomeIcon icon={getSortIconByFieldName('phone')} />
                </th>
                <th className="hand" onClick={sort('account_site')}>
                  Account Site <FontAwesomeIcon icon={getSortIconByFieldName('account_site')} />
                </th>
                <th className="hand" onClick={sort('fax')}>
                  Fax <FontAwesomeIcon icon={getSortIconByFieldName('fax')} />
                </th>
                <th className="hand" onClick={sort('website')}>
                  Website <FontAwesomeIcon icon={getSortIconByFieldName('website')} />
                </th>
                <th className="hand" onClick={sort('account_number')}>
                  Account Number <FontAwesomeIcon icon={getSortIconByFieldName('account_number')} />
                </th>
                <th className="hand" onClick={sort('ticket_Symbol')}>
                  Ticket Symbol <FontAwesomeIcon icon={getSortIconByFieldName('ticket_Symbol')} />
                </th>
                <th className="hand" onClick={sort('ownership')}>
                  Ownership <FontAwesomeIcon icon={getSortIconByFieldName('ownership')} />
                </th>
                <th className="hand" onClick={sort('billing_street')}>
                  Billing Street <FontAwesomeIcon icon={getSortIconByFieldName('billing_street')} />
                </th>
                <th className="hand" onClick={sort('billing_city')}>
                  Billing City <FontAwesomeIcon icon={getSortIconByFieldName('billing_city')} />
                </th>
                <th className="hand" onClick={sort('billing_state')}>
                  Billing State <FontAwesomeIcon icon={getSortIconByFieldName('billing_state')} />
                </th>
                <th className="hand" onClick={sort('billing_code')}>
                  Billing Code <FontAwesomeIcon icon={getSortIconByFieldName('billing_code')} />
                </th>
                <th className="hand" onClick={sort('billing_country')}>
                  Billing Country <FontAwesomeIcon icon={getSortIconByFieldName('billing_country')} />
                </th>
                <th className="hand" onClick={sort('shipping_street')}>
                  Shipping Street <FontAwesomeIcon icon={getSortIconByFieldName('shipping_street')} />
                </th>
                <th className="hand" onClick={sort('shipping_city')}>
                  Shipping City <FontAwesomeIcon icon={getSortIconByFieldName('shipping_city')} />
                </th>
                <th className="hand" onClick={sort('shipping_state')}>
                  Shipping State <FontAwesomeIcon icon={getSortIconByFieldName('shipping_state')} />
                </th>
                <th className="hand" onClick={sort('shipping_code')}>
                  Shipping Code <FontAwesomeIcon icon={getSortIconByFieldName('shipping_code')} />
                </th>
                <th className="hand" onClick={sort('shipping_country')}>
                  Shipping Country <FontAwesomeIcon icon={getSortIconByFieldName('shipping_country')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('employees')}>
                  Employees <FontAwesomeIcon icon={getSortIconByFieldName('employees')} />
                </th>
                <th className="hand" onClick={sort('sic_code')}>
                  Sic Code <FontAwesomeIcon icon={getSortIconByFieldName('sic_code')} />
                </th>
                <th>
                  User <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accountsList.map((accounts, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/accounts/${accounts.id}`} color="link" size="sm">
                      {accounts.id}
                    </Button>
                  </td>
                  <td>{accounts.account_owner}</td>
                  <td>{accounts.rating}</td>
                  <td>{accounts.phone}</td>
                  <td>{accounts.account_site}</td>
                  <td>{accounts.fax}</td>
                  <td>{accounts.website}</td>
                  <td>{accounts.account_number}</td>
                  <td>{accounts.ticket_Symbol}</td>
                  <td>{accounts.ownership}</td>
                  <td>{accounts.billing_street}</td>
                  <td>{accounts.billing_city}</td>
                  <td>{accounts.billing_state}</td>
                  <td>{accounts.billing_code}</td>
                  <td>{accounts.billing_country}</td>
                  <td>{accounts.shipping_street}</td>
                  <td>{accounts.shipping_city}</td>
                  <td>{accounts.shipping_state}</td>
                  <td>{accounts.shipping_code}</td>
                  <td>{accounts.shipping_country}</td>
                  <td>{accounts.description}</td>
                  <td>{accounts.employees}</td>
                  <td>{accounts.sic_code}</td>
                  <td>{accounts.user ? accounts.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/accounts/${accounts.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/accounts/${accounts.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/accounts/${accounts.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
          !loading && <div className="alert alert-warning">No Accounts found</div>
        )}
      </div>
      {totalItems ? (
        <div className={accountsList && accountsList.length > 0 ? '' : 'd-none'}>
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

export default Accounts;
