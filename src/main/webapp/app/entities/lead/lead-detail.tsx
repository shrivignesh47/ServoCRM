// import React, { useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Button, Row, Col } from 'reactstrap';
// import { openFile, byteSize } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { useAppDispatch, useAppSelector } from 'app/config/store';

// import { getEntity } from './lead.reducer';

// export const LeadDetail = () => {
//   const dispatch = useAppDispatch();

//   const { id } = useParams<'id'>();

//   useEffect(() => {
//     dispatch(getEntity(id));
//   }, []);

//   const leadEntity = useAppSelector(state => state.lead.entity);
//   return (
//     <Row>
//       <Col md="8">
//         <h2 data-cy="leadDetailsHeading">Lead</h2>
//         <dl className="jh-entity-details">
//           <dt>
//             <span id="id">ID</span>
//           </dt>
//           <dd>{leadEntity.id}</dd>
//           <dt>
//             <span id="first_name">First Name</span>
//           </dt>
//           <dd>{leadEntity.first_name}</dd>
//           <dt>
//             <span id="last_name">Last Name</span>
//           </dt>
//           <dd>{leadEntity.last_name}</dd>
//           <dt>
//             <span id="company">Company</span>
//           </dt>
//           <dd>{leadEntity.company}</dd>
//           <dt>
//             <span id="title">Title</span>
//           </dt>
//           <dd>{leadEntity.title}</dd>
//           <dt>
//             <span id="email">Email</span>
//           </dt>
//           <dd>{leadEntity.email}</dd>
//           <dt>
//             <span id="fax">Fax</span>
//           </dt>
//           <dd>{leadEntity.fax}</dd>
//           <dt>
//             <span id="website">Website</span>
//           </dt>
//           <dd>{leadEntity.website}</dd>
//           <dt>
//             <span id="lead_source">Lead Source</span>
//           </dt>
//           <dd>{leadEntity.lead_source}</dd>
//           <dt>
//             <span id="lead_status">Lead Status</span>
//           </dt>
//           <dd>{leadEntity.lead_status}</dd>
//           <dt>
//             <span id="industry">Industry</span>
//           </dt>
//           <dd>{leadEntity.industry}</dd>
//           <dt>
//             <span id="no_of_emp">No Of Emp</span>
//           </dt>
//           <dd>{leadEntity.no_of_emp}</dd>
//           <dt>
//             <span id="annual_revenue">Annual Revenue</span>
//           </dt>
//           <dd>{leadEntity.annual_revenue}</dd>
//           <dt>
//             <span id="rating">Rating</span>
//           </dt>
//           <dd>{leadEntity.rating}</dd>
//           <dt>
//             <span id="social_media">Social Media</span>
//           </dt>
//           <dd>{leadEntity.social_media}</dd>
//           <dt>
//             <span id="media_handle_id">Media Handle Id</span>
//           </dt>
//           <dd>{leadEntity.media_handle_id}</dd>
//           <dt>
//             <span id="street">Street</span>
//           </dt>
//           <dd>{leadEntity.street}</dd>
//           <dt>
//             <span id="city">City</span>
//           </dt>
//           <dd>{leadEntity.city}</dd>
//           <dt>
//             <span id="state">State</span>
//           </dt>
//           <dd>{leadEntity.state}</dd>
//           <dt>
//             <span id="zipcode">Zipcode</span>
//           </dt>
//           <dd>{leadEntity.zipcode}</dd>
//           <dt>
//             <span id="country">Country</span>
//           </dt>
//           <dd>{leadEntity.country}</dd>
//           <dt>
//             <span id="description">Description</span>
//           </dt>
//           <dd>{leadEntity.description}</dd>
//           <dt>
//             <span id="lead_image">Lead Image</span>
//           </dt>
//           <dd>
//             {leadEntity.lead_image ? (
//               <div>
//                 {leadEntity.lead_imageContentType ? (
//                   <a onClick={openFile(leadEntity.lead_imageContentType, leadEntity.lead_image)}>Open&nbsp;</a>
//                 ) : null}
//                 <span>
//                   {leadEntity.lead_imageContentType}, {byteSize(leadEntity.lead_image)}
//                 </span>
//               </div>
//             ) : null}
//           </dd>
//           <dt>
//             <span id="phone">Phone</span>
//           </dt>
//           <dd>{leadEntity.phone}</dd>
//         </dl>
//         <Button tag={Link} to="/lead" replace color="info" data-cy="entityDetailsBackButton">
//           <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
//         </Button>
//         &nbsp;
//         <Button tag={Link} to={`/lead/${leadEntity.id}/edit`} replace color="primary">
//           <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
//         </Button>
//       </Col>
//     </Row>
//   );
// };

// export default LeadDetail;


import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { openFile, byteSize } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './lead.reducer';

export const LeadDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, [dispatch, id]);

  const leadEntity = useAppSelector(state => state.lead.entity);

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ backgroundColor: '#162c46', color: '#d3e3fdb3', p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom style={{color:'#d3e3fdb3'}}>
            Lead Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">ID:</Typography>
              <Typography>{leadEntity.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">First Name:</Typography>
              <Typography>{leadEntity.first_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Last Name:</Typography>
              <Typography>{leadEntity.last_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Company:</Typography>
              <Typography>{leadEntity.company}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Title:</Typography>
              <Typography>{leadEntity.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email:</Typography>
              <Typography>{leadEntity.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Fax:</Typography>
              <Typography>{leadEntity.fax}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Website:</Typography>
              <Typography>{leadEntity.website}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Lead Source:</Typography>
              <Typography>{leadEntity.lead_source}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Lead Status:</Typography>
              <Typography>{leadEntity.lead_status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Industry:</Typography>
              <Typography>{leadEntity.industry}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">No Of Emp:</Typography>
              <Typography>{leadEntity.no_of_emp}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Annual Revenue:</Typography>
              <Typography>{leadEntity.annual_revenue}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Rating:</Typography>
              <Typography>{leadEntity.rating}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Social Media:</Typography>
              <Typography>{leadEntity.social_media}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Media Handle Id:</Typography>
              <Typography>{leadEntity.media_handle_id}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Street:</Typography>
              <Typography>{leadEntity.street}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">City:</Typography>
              <Typography>{leadEntity.city}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">State:</Typography>
              <Typography>{leadEntity.state}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Zipcode:</Typography>
              <Typography>{leadEntity.zipcode}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Country:</Typography>
              <Typography>{leadEntity.country}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Description:</Typography>
              <Typography>{leadEntity.description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Lead Image:</Typography>
              {leadEntity.lead_image ? (
                <Box>
                  {leadEntity.lead_imageContentType ? (
                    <a onClick={openFile(leadEntity.lead_imageContentType, leadEntity.lead_image)}>
                      Open&nbsp;
                    </a>
                  ) : null}
                  <Typography>
                    {leadEntity.lead_imageContentType}, {byteSize(leadEntity.lead_image)}
                  </Typography>
                </Box>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Phone:</Typography>
              <Typography>{leadEntity.phone}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button
              component={Link}
              to="/lead"
              color="info"
              sx={{ mr: 2 }}
            >
              <FontAwesomeIcon icon="arrow-left" /> Back
            </Button>
            <Button
              component={Link}
              to={`/lead/${leadEntity.id}/edit`}
              color="primary"
            >
              <FontAwesomeIcon icon="pencil-alt" /> Edit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LeadDetail;
