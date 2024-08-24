// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography, Card, CardContent } from '@mui/material';
// import { ZoomMtg } from '@zoomus/websdk';

// ZoomMtg.setZoomJSLib('https://source.zoom.us/2.8.0/lib', '/av');
// ZoomMtg.preLoadWasm();

// export default function ZoomMeeting() {
//   const [meetingNumber, setMeetingNumber] = useState('');
//   const [userName, setUserName] = useState('');
//   const [meetingPassword, setMeetingPassword] = useState('');
//   const [apiKey] = useState('YOUR_ZOOM_API_KEY'); // Replace with your Zoom API Key
//   const [apiSecret] = useState('YOUR_ZOOM_API_SECRET'); // Replace with your Zoom API Secret
//   const [meetingStarted, setMeetingStarted] = useState(false);
//   const [error, setError] = useState('');

//   const generateSignature = async (meetingNumber, role) => {
//     const timestamp = new Date().getTime() - 30000;
//     const message = `${apiKey}${meetingNumber}${timestamp}${role}`;

//     const encoder = new TextEncoder();
//     const data = encoder.encode(message);
//     const key = await window.crypto.subtle.importKey(
//       'raw',
//       encoder.encode(apiSecret),
//       { name: 'HMAC', hash: 'SHA-256' },
//       false,
//       ['sign']
//     );

//     const signature = await window.crypto.subtle.sign('HMAC', key, data);
//     const hash = btoa(String.fromCharCode(...new Uint8Array(signature)));

//     return btoa(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`);
//   };

//   const startMeeting = async (meetingNumber, userName, password) => {
//     try {
//       const signature = await generateSignature(meetingNumber, 1); // Role 1 is for host

//       await new Promise<void>((resolve, reject) => {
//         ZoomMtg.init({
//           leaveUrl: window.location.href,
//           isSupportAV: true,
//           success: () => {
//             ZoomMtg.join({
//               signature,
//               meetingNumber,
//               userName,
//               sdkKey: apiKey,
//               passWord: password,
//               success: () => {
//                 console.log('Join meeting success');
//                 setMeetingStarted(true);
//                 setError(''); // Clear any previous errors
//                 resolve(); // Explicitly type `resolve` as `void`
//               },
//               error: (error) => {
//                 console.error('Zoom join error:', error);
//                 setError('Failed to join the meeting.');
//                 reject(error);
//               }
//             });
//           },
//           error: (error) => {
//             console.error('Zoom init error:', error);
//             setError('Failed to initialize Zoom.');
//             reject(error);
//           }
//         });
//       });
//     } catch (error) {
//       console.error('Error starting meeting:', error);
//       setError('Error generating signature or starting meeting.');
//     }
//   };

//   const joinMeeting = () => {
//     if (meetingNumber && userName) {
//       startMeeting(meetingNumber, userName, meetingPassword);
//     } else {
//       setError('Meeting number or user name is missing.');
//     }
//   };

//   return (
//     <div className='content'>
//       <div id="zoom-meeting-container" className='zoom-meeting-container'>
//         <Card className='zoom-meeting-card' style={{ padding: '20px', backgroundColor: '#f0f4f8', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: '#1a73e8' }}>
//               Zoom Meeting
//             </Typography>

//             {error && (
//               <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
//                 {error}
//               </Typography>
//             )}

//             {!meetingStarted ? (
//               <>
//                 <Box mb={3} className='zoom-meeting-inputs'>
//                   <TextField
//                     label="Meeting Number"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={meetingNumber}
//                     onChange={(e) => setMeetingNumber(e.target.value)}
//                     className='zoom-meeting-textfield'
//                   />
//                   <TextField
//                     label="Your Name"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     className='zoom-meeting-textfield'
//                   />
//                   <TextField
//                     label="Meeting Password"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     type="password"
//                     value={meetingPassword}
//                     onChange={(e) => setMeetingPassword(e.target.value)}
//                     className='zoom-meeting-textfield'
//                   />
//                 </Box>

//                 <Box display="flex" justifyContent="space-between" className='zoom-meeting-buttons'>
//                   <Button variant="contained" color="primary" onClick={joinMeeting} style={{ width: '48%' }}>
//                     Join Meeting
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={joinMeeting} style={{ width: '48%' }}>
//                     Create Meeting
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Typography variant="h6" component="h3" style={{ textAlign: 'center', color: '#34a853' }}>
//                 Meeting Started! Check your Zoom client.
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { Box, Button, Typography, Card, CardContent } from '@mui/material';
// import axios from 'axios';

// export default function GMeet() {
//   const [meetingLink, setMeetingLink] = useState<string | null>(null);
//   const [error, setError] = useState<string>('');

//   const createMeeting = async () => {
//     try {
//       // Use the Google Calendar API to create a new event with a Meet link
//       const response = await axios.post(
//         'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//         {
//           summary: 'Google Meet Meeting',
//           description: 'Meeting generated by GMeet component',
//           start: {
//             dateTime: new Date().toISOString(),
//             timeZone: 'America/Los_Angeles',
//           },
//           end: {
//             dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
//             timeZone: 'America/Los_Angeles',
//           },
//           conferenceData: {
//             createRequest: {
//               requestId: "sample123",
//               conferenceSolutionKey: { type: "hangoutsMeet" },
//               status: { statusCode: "success" },
//             },
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer YOUR_ACCESS_TOKEN`,
//             'Content-Type': 'application/json',
//             'X-Api-Key': 'YOUR_API_KEY', // Added API key here
//           },
//           params: {
//             sendUpdates: 'all',
//             conferenceDataVersion: 1,
//           },
//         }
//       );

//       const meetLink = response.data.hangoutLink;
//       setMeetingLink(meetLink);
//       setError('');
//     } catch (error) {
//       console.error('Error creating Google Meet link:', error);
//       setError('Failed to create Google Meet link.');
//     }
//   };

//   return (
//     <div className="content">
//       <div className="gmeet-container">
//         <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#f0f4f8', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: '#34a853' }}>
//               Google Meet
//             </Typography>

//             {error && (
//               <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
//                 {error}
//               </Typography>
//             )}

//             {meetingLink ? (
//               <Box mt={3}>
//                 <Typography variant="body1">Meeting created successfully!</Typography>
//                 <Typography variant="body2">
//                   <a href={meetingLink} target="_blank" rel="noopener noreferrer">
//                     Join Google Meet
//                   </a>
//                 </Typography>
//               </Box>
//             ) : (
//               <Button variant="contained" color="primary" onClick={createMeeting}>
//                 Create Google Meet
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { Box, Button, Typography, Card, CardContent } from '@mui/material';
// import axios from 'axios';

// export default function GMeet() {
//   const [meetingLink, setMeetingLink] = useState<string | null>(null);
//   const [error, setError] = useState<string>('');

//   const createMeeting = async () => {
//     try {
//       // Use the Google Calendar API to create a new event with a Meet link
//       const response = await axios.post(
//         'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//         {
//           summary: 'Google Meet Meeting',
//           description: 'Meeting generated by GMeet component',
//           start: {
//             dateTime: new Date().toISOString(),
//             timeZone: 'America/Los_Angeles',
//           },
//           end: {
//             dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
//             timeZone: 'America/Los_Angeles',
//           },
//           conferenceData: {
//             createRequest: {
//               requestId: "sample123",
//               conferenceSolutionKey: { type: "hangoutsMeet" },
//               status: { statusCode: "success" },
//             },
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer YOUR_ACCESS_TOKEN`,
//             'Content-Type': 'application/json',
//             'X-Api-Key': 'AIzaSyApHHttdhovZZeqRbLILLBbjH1bH-3qms0', // Added API key here
//           },
//           params: {
//             sendUpdates: 'all',
//             conferenceDataVersion: 1,
//           },
//         }
//       );

//       const meetLink = response.data.hangoutLink;
//       setMeetingLink(meetLink);
//       setError('');
//     } catch (error) {
//       console.error('Error creating Google Meet link:', error);
//       setError('Failed to create Google Meet link.');
//     }
//   };

//   return (
//     <div className="content">
//       <div className="gmeet-container">
//         <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#f0f4f8', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: '#34a853' }}>
//               Google Meet
//             </Typography>

//             {error && (
//               <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
//                 {error}
//               </Typography>
//             )}

//             {meetingLink ? (
//               <Box mt={3}>
//                 <Typography variant="body1">Meeting created successfully!</Typography>
//                 <Typography variant="body2">
//                   <a href={meetingLink} target="_blank" rel="noopener noreferrer">
//                     Join Google Meet
//                   </a>
//                 </Typography>
//               </Box>
//             ) : (
//               <Button variant="contained" color="primary" onClick={createMeeting}>
//                 Create Google Meet
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// // }
// import React, { useState } from 'react';
// import { Box, Button, Typography, Card, CardContent } from '@mui/material';
// import axios from 'axios';

// export default function GMeet() {
//   const [meetingLink, setMeetingLink] = useState<string | null>(null);
//   const [error, setError] = useState<string>('');

//   const createMeeting = async () => {
//     try {
//       // Request Google OAuth 2.0 token
//       const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
//         client_id: '87427524546-uq532ofv66f68jnsgrucongn49feoflm.apps.googleusercontent.com',
//         client_secret: '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',
//         refresh_token: '1//05xKnIGCnSpJ-CgYIARAAGAUSNwF-L9IrfD_rSl0lfQ65tSMdwvDBH2TGgse_97TZ4khUBxIdSDyRilufMt-KtWzHs4FXEqqsZfw', // Replace with your actual refresh token
//         grant_type: 'refresh_token',
//       });

//       const { access_token } = tokenResponse.data;

//       // Use the Google Calendar API to create a new event with a Meet link
//       const response = await axios.post(
//         'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//         {
//           summary: 'Google Meet Meeting',
//           description: 'Meeting generated by GMeet component',
//           start: {
//             dateTime: new Date().toISOString(),
//             timeZone: 'America/Los_Angeles',
//           },
//           end: {
//             dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
//             timeZone: 'America/Los_Angeles',
//           },
//           conferenceData: {
//             createRequest: {
//               requestId: "sample123",
//               conferenceSolutionKey: { type: "hangoutsMeet" },
//               status: { statusCode: "success" },
//             },
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//           },
//           params: {
//             sendUpdates: 'all',
//             conferenceDataVersion: 1,
//           },
//         }
//       );

//       const meetLink = response.data.hangoutLink;
//       setMeetingLink(meetLink);
//       setError('');
//     } catch (error) {
//       console.error('Error creating Google Meet link:', error);
//       setError('Failed to create Google Meet link.');
//     }
//   };

//   return (
//     <div className="content">
//       <div className="gmeet-container">
//         <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#f0f4f8', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: '#34a853' }}>
//               Google Meet
//             </Typography>

//             {error && (
//               <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
//                 {error}
//               </Typography>
//             )}

//             {meetingLink ? (
//               <Box mt={3}>
//                 <Typography variant="body1">Meeting created successfully!</Typography>
//                 <Typography variant="body2">
//                   <a href={meetingLink} target="_blank" rel="noopener noreferrer">
//                     Join Google Meet
//                   </a>
//                 </Typography>
//               </Box>
//             ) : (
//               <Button variant="contained" color="primary" onClick={createMeeting}>
//                 Create Google Meet
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// // }
// import React, { useState } from 'react';
// import { Box, Button, Typography, Card, CardContent } from '@mui/material';
// import axios from 'axios';

// export default function GMeet() {
//   const [meetingLink, setMeetingLink] = useState<string | null>(null);
//   const [error, setError] = useState<string>('');

//   const createMeeting = async () => {
//     try {
//       // Request Google OAuth 2.0 token
//       const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
//         client_id: '87427524546-uq532ofv66f68jnsgrucongn49feoflm.apps.googleusercontent.com',
//         client_secret: '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',
//         refresh_token: '1//05xKnIGCnSpJ-CgYIARAAGAUSNwF-L9IrfD_rSl0lfQ65tSMdwvDBH2TGgse_97TZ4khUBxIdSDyRilufMt-KtWzHs4FXEqqsZfw', // Replace with your actual refresh token
//         grant_type: 'refresh_token',
//       });

//       console.log('Token Response:', tokenResponse.data);

//       const { access_token } = tokenResponse.data;

//       // Check if access token is valid
//       if (!access_token) {
//         setError('Failed to retrieve access token');
//         return;
//       }

//       // Use the Google Calendar API to create a new event with a Meet link
//       const response = await axios.post(
//         'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//         {
//           summary: 'Google Meet Meeting',
//           description: 'Meeting generated by GMeet component',
//           start: {
//             dateTime: new Date().toISOString(),
//             timeZone: 'America/Los_Angeles',
//           },
//           end: {
//             dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
//             timeZone: 'America/Los_Angeles',
//           },
//           conferenceData: {
//             createRequest: {
//               requestId: "sample123",
//               conferenceSolutionKey: { type: "hangoutsMeet" },
//               status: { statusCode: "success" },
//             },
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//           },
//           params: {
//             sendUpdates: 'all',
//             conferenceDataVersion: 1,
//           },
//         }
//       );

//       console.log('Google Meet Response:', response.data);

//       const meetLink = response.data.hangoutLink;

//       if (meetLink) {
//         setMeetingLink(meetLink);
//         setError('');
//       } else {
//         setError('Failed to retrieve the Google Meet link.');
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('Axios Error:', error.response?.data || error.message);
//         setError(`Failed to create Google Meet link: ${error.response?.data?.error?.message || error.message}`);
//       } else {
//         console.error('Error creating Google Meet link:', error);
//         setError('Failed to create Google Meet link. Check the console for details.');
//       }
//     }
//   };

//   return (
//     <div className="content">
//       <div className="gmeet-container">
//         <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#f0f4f8', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: '#34a853' }}>
//               Google Meet
//             </Typography>

//             {error && (
//               <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
//                 {error}
//               </Typography>
//             )}

//             {meetingLink ? (
//               <Box mt={3}>
//                 <Typography variant="body1">Meeting created successfully!</Typography>
//                 <Typography variant="body2">
//                   <a href={meetingLink} target="_blank" rel="noopener noreferrer">
//                     Join Google Meet
//                   </a>
//                 </Typography>
//               </Box>
//             ) : (
//               <Button variant="contained" color="primary" onClick={createMeeting}>
//                 Create Google Meet
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// // }
// import React, { useState } from 'react';
// import { Box, Button, Typography, Card, CardContent } from '@mui/material';
// import axios from 'axios';

// const AUTH_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyMzU3ODU4OSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzIzNDkyMTg5fQ.-UyaxoHxjYJKsWSBwOjaZiqNbdLyJjvBI6bIs74Cty3ZUTLGOu20q_pq2jYzut54R7nNsWk73djoQKofvIdfsw';

// export default function GMeet() {
//   const [meetingLink, setMeetingLink] = useState<string | null>(null);
//   const [error, setError] = useState<string>('');

//   const createMeeting = async () => {
//     try {
//       // Authenticate your application with its JWT
//       const appAuthResponse = await axios.get('/api/authenticate', {
//         headers: {
//           Authorization: `Bearer ${AUTH_TOKEN}`,
//         },
//       });

//       if (appAuthResponse.status !== 200) {
//         throw new Error('Failed to authenticate the application');
//       }

//       // Request Google OAuth 2.0 token
//       const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
//         client_id: '87427524546-uq532ofv66f68jnsgrucongn49feoflm.apps.googleusercontent.com',
//         client_secret: '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',
//         refresh_token: '1//05xKnIGCnSpJ-CgYIARAAGAUSNwF-L9IrfD_rSl0lfQ65tSMdwvDBH2TGgse_97TZ4khUBxIdSDyRilufMt-KtWzHs4FXEqqsZfw', // Replace with your actual refresh token
//         grant_type: 'refresh_token',
//       });

//       console.log('Token Response:', tokenResponse.data);

//       const { access_token } = tokenResponse.data;

//       // Check if access token is valid
//       if (!access_token) {
//         setError('Failed to retrieve access token');
//         return;
//       }

//       // Use the Google Calendar API to create a new event with a Meet link
//       const response = await axios.post(
//         'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//         {
//           summary: 'Google Meet Meeting',
//           description: 'Meeting generated by GMeet component',
//           start: {
//             dateTime: new Date().toISOString(),
//             timeZone: 'America/Los_Angeles',
//           },
//           end: {
//             dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
//             timeZone: 'America/Los_Angeles',
//           },
//           conferenceData: {
//             createRequest: {
//               requestId: "sample123",
//               conferenceSolutionKey: { type: "hangoutsMeet" },
//               status: { statusCode: "success" },
//             },
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//             'Content-Type': 'application/json',
//           },
//           params: {
//             sendUpdates: 'all',
//             conferenceDataVersion: 1,
//           },
//         }
//       );

//       console.log('Google Meet Response:', response.data);

//       const meetLink = response.data.hangoutLink;

//       if (meetLink) {
//         setMeetingLink(meetLink);
//         setError('');
//       } else {
//         setError('Failed to retrieve the Google Meet link.');
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('Axios Error:', error.response?.data || error.message);
//         setError(`Failed to create Google Meet link: ${error.response?.data?.error?.message || error.message}`);
//       } else {
//         console.error('Error creating Google Meet link:', error);
//         setError('Failed to create Google Meet link. Check the console for details.');
//       }
//     }
//   };

//   return (
//     <div className="content">
//       <div className="gmeet-container">
//         <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#f0f4f8', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: '#34a853' }}>
//               Google Meet
//             </Typography>

//             {error && (
//               <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
//                 {error}
//               </Typography>
//             )}

//             {meetingLink ? (
//               <Box mt={3}>
//                 <Typography variant="body1">Meeting created successfully!</Typography>
//                 <Typography variant="body2">
//                   <a href={meetingLink} target="_blank" rel="noopener noreferrer">
//                     Join Google Meet
//                   </a>
//                 </Typography>
//               </Box>
//             ) : (
//               <Button variant="contained" color="primary" onClick={createMeeting}>
//                 Create Google Meet
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';

export default function GMeet() {
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const createMeeting = async () => {
    try {
      // Request Google OAuth 2.0 token
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: '87427524546-uq532ofv66f68jnsgrucongn49feoflm.apps.googleusercontent.com',
          client_secret: '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',
          refresh_token: '1//05xKnIGCnSpJ-CgYIARAAGAUSNwF-L9IrfD_rSl0lfQ65tSMdwvDBH2TGgse_97TZ4khUBxIdSDyRilufMt-KtWzHs4FXEqqsZfw', // Replace with your actual refresh token
          grant_type: 'refresh_token',
        }).toString(),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to retrieve access token');
      }

      const tokenData = await tokenResponse.json();
      const { access_token } = tokenData;

      if (!access_token) {
        setError('Failed to retrieve access token');
        return;
      }

      // Use the Google Calendar API to create a new event with a Meet link
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all&conferenceDataVersion=1', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: 'Google Meet Meeting',
          description: 'Meeting generated by GMeet component',
          start: {
            dateTime: new Date().toISOString(),
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
            timeZone: 'America/Los_Angeles',
          },
          conferenceData: {
            createRequest: {
              requestId: "sample123", // Unique identifier for the request
              conferenceSolutionKey: { type: "hangoutsMeet" },
              status: { statusCode: "success" },
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Google Meet link');
      }

      const data = await response.json();
      const meetLink = data.hangoutLink;

      if (meetLink) {
        setMeetingLink(meetLink);
        setError('');
      } else {
        setError('Failed to retrieve the Google Meet link.');
      }
    } catch (error) {
      console.error('Error creating Google Meet link:', error);
      setError('Failed to create Google Meet link. Check the console for details.');
    }
  };

  return (
    <div className="content">
      <div className="gmeet-container">
        <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#f0f4f8', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: '#34a853' }}>
              Google Meet
            </Typography>

            {error && (
              <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            {meetingLink ? (
              <Box mt={3}>
                <Typography variant="body1">Meeting created successfully!</Typography>
                <Typography variant="body2">
                  <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                    Join Google Meet
                  </a>
                </Typography>
              </Box>
            ) : (
              <Button variant="contained" color="primary" onClick={createMeeting}>
                Create Google Meet
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
