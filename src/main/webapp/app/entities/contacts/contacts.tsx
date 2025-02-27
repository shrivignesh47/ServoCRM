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

import { getEntities } from './contacts.reducer';

export const Contacts = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const contactsList = useAppSelector(state => state.contacts.entities);
  const loading = useAppSelector(state => state.contacts.loading);
  const totalItems = useAppSelector(state => state.contacts.totalItems);

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
      <h2 id="contacts-heading" data-cy="ContactsHeading">
        Contacts
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/contacts/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Contacts
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {contactsList && contactsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('first_name')}>
                  First Name <FontAwesomeIcon icon={getSortIconByFieldName('first_name')} />
                </th>
                <th className="hand" onClick={sort('last_name')}>
                  Last Name <FontAwesomeIcon icon={getSortIconByFieldName('last_name')} />
                </th>
                <th className="hand" onClick={sort('account_name')}>
                  Account Name <FontAwesomeIcon icon={getSortIconByFieldName('account_name')} />
                </th>
                <th className="hand" onClick={sort('vendor_name')}>
                  Vendor Name <FontAwesomeIcon icon={getSortIconByFieldName('vendor_name')} />
                </th>
                <th className="hand" onClick={sort('lead_source')}>
                  Lead Source <FontAwesomeIcon icon={getSortIconByFieldName('lead_source')} />
                </th>
                <th className="hand" onClick={sort('email')}>
                  Email <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                </th>
                <th className="hand" onClick={sort('title')}>
                  Title <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  Phone <FontAwesomeIcon icon={getSortIconByFieldName('phone')} />
                </th>
                <th className="hand" onClick={sort('department')}>
                  Department <FontAwesomeIcon icon={getSortIconByFieldName('department')} />
                </th>
                <th className="hand" onClick={sort('mobile')}>
                  Mobile <FontAwesomeIcon icon={getSortIconByFieldName('mobile')} />
                </th>
                <th className="hand" onClick={sort('fax')}>
                  Fax <FontAwesomeIcon icon={getSortIconByFieldName('fax')} />
                </th>
                <th className="hand" onClick={sort('date_of_birth')}>
                  Date Of Birth <FontAwesomeIcon icon={getSortIconByFieldName('date_of_birth')} />
                </th>
                <th className="hand" onClick={sort('social_media_handle')}>
                  Social Media Handle <FontAwesomeIcon icon={getSortIconByFieldName('social_media_handle')} />
                </th>
                <th className="hand" onClick={sort('street')}>
                  Street <FontAwesomeIcon icon={getSortIconByFieldName('street')} />
                </th>
                <th className="hand" onClick={sort('city')}>
                  City <FontAwesomeIcon icon={getSortIconByFieldName('city')} />
                </th>
                <th className="hand" onClick={sort('state')}>
                  State <FontAwesomeIcon icon={getSortIconByFieldName('state')} />
                </th>
                <th className="hand" onClick={sort('zip')}>
                  Zip <FontAwesomeIcon icon={getSortIconByFieldName('zip')} />
                </th>
                <th className="hand" onClick={sort('country')}>
                  Country <FontAwesomeIcon icon={getSortIconByFieldName('country')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contactsList.map((contacts, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/contacts/${contacts.id}`} color="link" size="sm">
                      {contacts.id}
                    </Button>
                  </td>
                  <td>{contacts.first_name}</td>
                  <td>{contacts.last_name}</td>
                  <td>{contacts.account_name}</td>
                  <td>{contacts.vendor_name}</td>
                  <td>{contacts.lead_source}</td>
                  <td>{contacts.email}</td>
                  <td>{contacts.title}</td>
                  <td>{contacts.phone}</td>
                  <td>{contacts.department}</td>
                  <td>{contacts.mobile}</td>
                  <td>{contacts.fax}</td>
                  <td>
                    {contacts.date_of_birth ? (
                      <TextFormat type="date" value={contacts.date_of_birth} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{contacts.social_media_handle}</td>
                  <td>{contacts.street}</td>
                  <td>{contacts.city}</td>
                  <td>{contacts.state}</td>
                  <td>{contacts.zip}</td>
                  <td>{contacts.country}</td>
                  <td>{contacts.description}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/contacts/${contacts.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/contacts/${contacts.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/contacts/${contacts.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
          !loading && <div className="alert alert-warning">No Contacts found</div>
        )}
      </div>
      {totalItems ? (
        <div className={contactsList && contactsList.length > 0 ? '' : 'd-none'}>
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

export default Contacts;
