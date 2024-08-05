import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Spinner, Alert, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(lead => lead.lead_status === 'New').length;
  const closedLeadsCount = leads.filter(lead => lead.lead_status === 'Closed').length;
  const totalContacts = contacts.length;
  const totalAccounts = accounts.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsResponse, contactsResponse, accountsResponse] = await Promise.all([
          axios.get('/api/leads'),
          axios.get('/api/contacts'),
          axios.get('/api/accounts'),
        ]);
        setLeads(leadsResponse.data);
        setContacts(contactsResponse.data);
        setAccounts(accountsResponse.data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleModal = (item) => {
    setSelectedItem(item);
    setModal(!modal);
  };

  const renderModalContent = (item) => {
    if (!item) return null;

    return Object.keys(item).map(key => {
      const value = item[key];
      return (
        <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {typeof value === 'object' ? '[Object]' : value}</p>
      );
    });
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`dashboard-container ${collapsed ? 'collapsed' : ''}`}>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <Button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={collapsed ? faArrowRight : faArrowLeft} />
        </Button>
        <h2>CRM Dashboard</h2>
        <ul>
          <li><a href="#leads">Leads</a></li>
          <li><a href="#contacts">Contacts</a></li>
          <li><a href="#accounts">Accounts</a></li>
        </ul>
      </div>

      <div className="content">
        <h1>User Dashboard</h1>
        <p>Welcome to your dashboard</p>

        <Row className="card-container">
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Total Leads</CardTitle>
                <CardText>{totalLeads}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">New Leads</CardTitle>
                <CardText>{newLeadsCount}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Closed Leads</CardTitle>
                <CardText>{closedLeadsCount}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Total Contacts</CardTitle>
                <CardText>{totalContacts}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
                <CardTitle tag="h5">Total Accounts</CardTitle>
                <CardText>{totalAccounts}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <h2 id="leads">Leads</h2>

        {loading && <Spinner color="primary" />}
        {error && <Alert color="danger">{error}</Alert>}
        {leads.length > 0 ? (
          <Row className="data-grid">
            {leads.map((lead) => (
              <Col md="6" lg="4" key={lead.id} className="mb-4">
                <Card className="data-card">
                  <CardBody>
                    <CardTitle tag="h5">{lead.first_name} {lead.last_name}</CardTitle>
                    <CardText><strong>Company:</strong> {lead.company}</CardText>
                    <CardText><strong>Website:</strong> {lead.website}</CardText>
                    <CardText><strong>Email:</strong> {lead.email}</CardText>
                    <CardText><strong>Source:</strong> {lead.lead_source}</CardText>
                    <Button color="primary" size="sm" onClick={() => toggleModal(lead)}>View More</Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          !loading && <p>No leads available.</p>
        )}

        <h2 id="contacts">Contacts</h2>
        {contacts.length > 0 ? (
          <Row className="data-grid">
            {contacts.map((contact) => (
              <Col md="6" lg="4" key={contact.id} className="mb-4">
                <Card className="data-card">
                  <CardBody>
                    <CardTitle tag="h5">{contact.first_name} {contact.last_name}</CardTitle>
                    <CardText><strong>Phone:</strong> {contact.phone}</CardText>
                    <CardText><strong>Email:</strong> {contact.email}</CardText>
                    <Button color="primary" size="sm" onClick={() => toggleModal(contact)}>View More</Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          !loading && <p>No contacts available.</p>
        )}

        <h2 id="accounts">Accounts</h2>
        {accounts.length > 0 ? (
          <Row className="data-grid">
            {accounts.map((account) => (
              <Col md="6" lg="4" key={account.id} className="mb-4">
                <Card className="data-card">
                  <CardBody>
                    <CardTitle tag="h5">{account.account_name}</CardTitle>
                    <CardText><strong>Phone:</strong> {account.phone}</CardText>
                    <CardText><strong>Email:</strong> {account.email}</CardText>
                    <CardText><strong>Website:</strong> {account.website}</CardText>
                    <Button color="primary" size="sm" onClick={() => toggleModal(account)}>View More</Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          !loading && <p>No accounts available.</p>
        )}

        {selectedItem && (
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Details</ModalHeader>
            <ModalBody>
              {renderModalContent(selectedItem)}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>Close</Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
