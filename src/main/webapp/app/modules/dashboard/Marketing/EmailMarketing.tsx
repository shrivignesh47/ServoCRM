// // import React, { useState, useEffect } from 'react';
// // import {
// //   Typography,
// //   TextField,
// //   Button,
// //   Grid,
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   Divider,
// //   MenuItem,
// //   Select,
// //   FormControl,
// //   InputLabel,
// // } from '@mui/material';

// // const EMAIL_TEMPLATES = {
// //   coldCall: 'Subject: Introduction\n\nDear [Name],\n\nI hope this message finds you well. I am reaching out to introduce you to [Your Company] and explore potential opportunities.\n\nBest regards,\n[Your Name]',
// //   meetingScheduling: 'Subject: Meeting Request\n\nDear [Name],\n\nI would like to schedule a meeting with you to discuss [Topic]. Please let me know your availability.\n\nBest regards,\n[Your Name]',
// //   cancel: 'Subject: Cancellation Notice\n\nDear [Name],\n\nI regret to inform you that [Event/Meeting] has been cancelled. We apologize for any inconvenience.\n\nBest regards,\n[Your Name]',
// //   request: 'Subject: Request for Information\n\nDear [Name],\n\nI am writing to request [Information/Assistance] regarding [Topic]. Your prompt response would be greatly appreciated.\n\nBest regards,\n[Your Name]',
// //   quote: 'Subject: Quote Request\n\nDear [Name],\n\nPlease find below the quote for [Product/Service]. Let me know if you need any further information.\n\nBest regards,\n[Your Name]',
// //   enquire: 'Subject: Inquiry\n\nDear [Name],\n\nI would like to inquire about [Product/Service]. Could you please provide more details?\n\nBest regards,\n[Your Name]',
// //   other: 'Subject: General Inquiry\n\nDear [Name],\n\nI hope this message finds you well. I wanted to reach out regarding [Topic]. Please let me know if you need any further details.\n\nBest regards,\n[Your Name]',
// // };

// // const AUTH_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyMzU3ODU4OSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzIzNDkyMTg5fQ.-UyaxoHxjYJKsWSBwOjaZiqNbdLyJjvBI6bIs74Cty3ZUTLGOu20q_pq2jYzut54R7nNsWk73djoQKofvIdfsw';

// // const EmailMarketing: React.FC = () => {
// //   const [selectedTemplate, setSelectedTemplate] = useState<string>('coldCall');
// //   const [emailID, setEmailID] = useState<string>('');
// //   const [emailPassword, setEmailPassword] = useState<string>('');
// //   const [incomingHost, setIncomingHost] = useState<string>('');
// //   const [outgoingHost, setOutgoingHost] = useState<string>('');
// //   const [recipients, setRecipients] = useState<string>('');
// //   const [emailSubject, setEmailSubject] = useState<string>('');
// //   const [emailBody, setEmailBody] = useState<string>('');

// //   // Load stored settings from localStorage
// //   useEffect(() => {
// //     setEmailID(localStorage.getItem('emailID') || '');
// //     setEmailPassword(localStorage.getItem('emailPassword') || '');
// //     setIncomingHost(localStorage.getItem('incomingHost') || '');
// //     setOutgoingHost(localStorage.getItem('outgoingHost') || '');
// //   }, []);

// //   // Save settings to localStorage
// //   const saveSettings = () => {
// //     localStorage.setItem('emailID', emailID);
// //     localStorage.setItem('emailPassword', emailPassword);
// //     localStorage.setItem('incomingHost', incomingHost);
// //     localStorage.setItem('outgoingHost', outgoingHost);
// //   };

// //   const handleSendEmail = async () => {
// //     try {
// //       const response = await fetch(`http://localhost:9000/api/send-email?to=${encodeURIComponent(recipients)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`, {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${AUTH_TOKEN}`,
// //         },
// //       });

// //       if (response.ok) {
// //         alert('Email sent successfully');
// //       } else {
// //         const errorText = await response.text();
// //         console.error('Failed to send email:', errorText);
// //         alert('Failed to send email. Check console for details.');
// //       }
// //     } catch (error) {
// //       console.error('Error sending email:', error);
// //       alert('Error sending email');
// //     }
// //   };

// //   return (
// //     <div className='maincontent'>
// //       <div className='content'>
// //         <Typography variant="h4" gutterBottom>
// //           Email Marketing
// //         </Typography>
// //         <Grid container spacing={3}>
// //           <Grid item xs={12} md={6}>
// //             <Card style={{ backgroundColor: '#162c46' }}>
// //               <CardHeader title="Email Templates" style={{ color: '#d3e3fdb3' }} />
// //               <Divider />
// //               <CardContent>
// //                 <FormControl fullWidth style={{ marginBottom: '20px' }}>
// //                   <InputLabel style={{ color: '#d3e3fdb3' }}>Template Type</InputLabel>
// //                   <Select
// //                     value={selectedTemplate}
// //                     onChange={(e) => {
// //                       const template = e.target.value as string;
// //                       setSelectedTemplate(template);
// //                       const [subject, body] = EMAIL_TEMPLATES[template].split('\n\n', 2);
// //                       setEmailSubject(subject.replace('Subject: ', ''));
// //                       setEmailBody(body);
// //                     }}
// //                     style={{ color: '#d3e3fdb3' }}
// //                   >
// //                     {Object.keys(EMAIL_TEMPLATES).map((key) => (
// //                       <MenuItem key={key} value={key}>
// //                         {key.charAt(0).toUpperCase() + key.slice(1)}
// //                       </MenuItem>
// //                     ))}
// //                   </Select>
// //                 </FormControl>
// //                 <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', color: '#d3e3fdb3' }}>
// //                   {EMAIL_TEMPLATES[selectedTemplate]}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //           <Grid item xs={12} md={6}>
// //             <Card style={{ backgroundColor: '#162c46' }}>
// //               <CardHeader title="Email Settings" style={{ color: '#d3e3fdb3' }} />
// //               <Divider />
// //               <CardContent>
// //                 <TextField
// //                   label="Email Marketing ID"
// //                   variant="outlined"
// //                   fullWidth
// //                   value={emailID}
// //                   onChange={(e) => setEmailID(e.target.value)}
// //                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
// //                 />
// //                 <TextField
// //                   label="Email Password"
// //                   type="password"
// //                   variant="outlined"
// //                   fullWidth
// //                   value={emailPassword}
// //                   onChange={(e) => setEmailPassword(e.target.value)}
// //                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
// //                 />
// //                 <TextField
// //                   label="Incoming Email Host"
// //                   variant="outlined"
// //                   fullWidth
// //                   value={incomingHost}
// //                   onChange={(e) => setIncomingHost(e.target.value)}
// //                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
// //                 />
// //                 <TextField
// //                   label="Outgoing Email Host"
// //                   variant="outlined"
// //                   fullWidth
// //                   value={outgoingHost}
// //                   onChange={(e) => setOutgoingHost(e.target.value)}
// //                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
// //                 />
// //                 <TextField
// //                   label="Recipients (comma-separated)"
// //                   variant="outlined"
// //                   fullWidth
// //                   value={recipients}
// //                   onChange={(e) => setRecipients(e.target.value)}
// //                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
// //                 />
// //                 <TextField
// //                   label="Subject"
// //                   variant="outlined"
// //                   fullWidth
// //                   value={emailSubject}
// //                   onChange={(e) => setEmailSubject(e.target.value)}
// //                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
// //                 />
// //                 <TextField
// //                   label="Body"
// //                   variant="outlined"
// //                   fullWidth
// //                   multiline
// //                   rows={4}
// //                   value={emailBody}
// //                   onChange={(e) => setEmailBody(e.target.value)}
// //                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
// //                 />
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   onClick={handleSendEmail}
// //                 >
// //                   Send Email
// //                 </Button>
// //                 <Button
// //                   variant="contained"
// //                   color="secondary"
// //                   onClick={saveSettings}
// //                   style={{ marginLeft: '10px' }}
// //                 >
// //                   Save Settings
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         </Grid>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EmailMarketing;
// import React, { useState, useEffect } from 'react';
// import {
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   CircularProgress,
// } from '@mui/material';

// const EMAIL_TEMPLATES = {
//   coldCall: 'Subject: Introduction\n\nDear [Name],\n\nI hope this message finds you well. I am reaching out to introduce you to [Your Company] and explore potential opportunities.\n\nBest regards,\n[Your Name]',
//   meetingScheduling: 'Subject: Meeting Request\n\nDear [Name],\n\nI would like to schedule a meeting with you to discuss [Topic]. Please let me know your availability.\n\nBest regards,\n[Your Name]',
//   cancel: 'Subject: Cancellation Notice\n\nDear [Name],\n\nI regret to inform you that [Event/Meeting] has been cancelled. We apologize for any inconvenience.\n\nBest regards,\n[Your Name]',
//   request: 'Subject: Request for Information\n\nDear [Name],\n\nI am writing to request [Information/Assistance] regarding [Topic]. Your prompt response would be greatly appreciated.\n\nBest regards,\n[Your Name]',
//   quote: 'Subject: Quote Request\n\nDear [Name],\n\nPlease find below the quote for [Product/Service]. Let me know if you need any further information.\n\nBest regards,\n[Your Name]',
//   enquire: 'Subject: Inquiry\n\nDear [Name],\n\nI would like to inquire about [Product/Service]. Could you please provide more details?\n\nBest regards,\n[Your Name]',
//   other: 'Subject: General Inquiry\n\nDear [Name],\n\nI hope this message finds you well. I wanted to reach out regarding [Topic]. Please let me know if you need any further details.\n\nBest regards,\n[Your Name]',
// };

// const AUTH_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyMzU3ODU4OSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzIzNDkyMTg5fQ.-UyaxoHxjYJKsWSBwOjaZiqNbdLyJjvBI6bIs74Cty3ZUTLGOu20q_pq2jYzut54R7nNsWk73djoQKofvIdfsw';
// const API_KEY = '9351ca19204e49a09ddb691f79867420';
// const API_ENDPOINT = 'https://servocrm.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview';

// const EmailMarketing: React.FC = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState<string>('coldCall');
//   const [emailID, setEmailID] = useState<string>('');
//   const [emailPassword, setEmailPassword] = useState<string>('');
//   const [incomingHost, setIncomingHost] = useState<string>('');
//   const [outgoingHost, setOutgoingHost] = useState<string>('');
//   const [recipients, setRecipients] = useState<string>('');
//   const [emailSubject, setEmailSubject] = useState<string>('');
//   const [emailBody, setEmailBody] = useState<string>('');
//   const [loadingAI, setLoadingAI] = useState<boolean>(false);

//   // Load stored settings from localStorage
//   useEffect(() => {
//     setEmailID(localStorage.getItem('emailID') || '');
//     setEmailPassword(localStorage.getItem('emailPassword') || '');
//     setIncomingHost(localStorage.getItem('incomingHost') || '');
//     setOutgoingHost(localStorage.getItem('outgoingHost') || '');
//   }, []);

//   // Save settings to localStorage
//   const saveSettings = () => {
//     localStorage.setItem('emailID', emailID);
//     localStorage.setItem('emailPassword', emailPassword);
//     localStorage.setItem('incomingHost', incomingHost);
//     localStorage.setItem('outgoingHost', outgoingHost);
//   };

//   const handleSendEmail = async () => {
//     try {
//       const response = await fetch(`http://localhost:9000/api/send-email?to=${encodeURIComponent(recipients)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${AUTH_TOKEN}`,
//         },
//       });

//       if (response.ok) {
//         alert('Email sent successfully');
//       } else {
//         const errorText = await response.text();
//         console.error('Failed to send email:', errorText);
//         alert('Failed to send email. Check console for details.');
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('Error sending email');
//     }
//   };

//   const handleAISuggestion = async () => {
//     setLoadingAI(true);
//     try {
//       const response = await fetch(`${API_ENDPOINT}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${API_KEY}`,
//         },
//         body: JSON.stringify({messages: [
//           {
//             role: 'user',
//             content: `Please provide an email template for: ${selectedTemplate}`,
//           },
//         ],
//         }),
//       });

//       const data = await response.json();
//       const aiSuggestion = data.choices?.[0]?.text.trim();
//       if (aiSuggestion) {
//         setEmailBody(aiSuggestion);
//       } else {
//         alert('AI could not generate a suggestion. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error fetching AI suggestion:', error);
//       alert('Error fetching AI suggestion');
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   return (
//     <div className='maincontent'>
//       <div className='content'>
//         <Typography variant="h4" gutterBottom>
//           Email Marketing
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Card style={{ backgroundColor: '#162c46' }}>
//               <CardHeader title="Email Templates" style={{ color: '#d3e3fdb3' }} />
//               <Divider />
//               <CardContent>
//                 <FormControl fullWidth style={{ marginBottom: '20px' }}>
//                   <InputLabel style={{ color: '#d3e3fdb3' }}>Template Type</InputLabel>
//                   <Select
//                     value={selectedTemplate}
//                     onChange={(e) => {
//                       const template = e.target.value as string;
//                       setSelectedTemplate(template);
//                       const [subject, body] = EMAIL_TEMPLATES[template].split('\n\n', 2);
//                       setEmailSubject(subject.replace('Subject: ', ''));
//                       setEmailBody(body);
//                     }}
//                     style={{ color: '#d3e3fdb3' }}
//                   >
//                     {Object.keys(EMAIL_TEMPLATES).map((key) => (
//                       <MenuItem key={key} value={key}>
//                         {key.charAt(0).toUpperCase() + key.slice(1)}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', color: '#d3e3fdb3' }}>
//                   {EMAIL_TEMPLATES[selectedTemplate]}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleAISuggestion}
//                   disabled={loadingAI}
//                   style={{ marginTop: '10px' }}
//                 >
//                   {loadingAI ? <CircularProgress size={24} /> : 'Get AI Suggestion'}
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card style={{ backgroundColor: '#162c46' }}>
//               <CardHeader title="Email Settings" style={{ color: '#d3e3fdb3' }} />
//               <Divider />
//               <CardContent>
//                 <TextField
//                   label="Email Marketing ID"
//                   variant="outlined"
//                   fullWidth
//                   value={emailID}
//                   onChange={(e) => setEmailID(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Email Password"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   value={emailPassword}
//                   onChange={(e) => setEmailPassword(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Incoming Email Host"
//                   variant="outlined"
//                   fullWidth
//                   value={incomingHost}
//                   onChange={(e) => setIncomingHost(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Outgoing Email Host"
//                   variant="outlined"
//                   fullWidth
//                   value={outgoingHost}
//                   onChange={(e) => setOutgoingHost(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Recipients (comma-separated)"
//                   variant="outlined"
//                   fullWidth
//                   value={recipients}
//                   onChange={(e) => setRecipients(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Subject"
//                   variant="outlined"
//                   fullWidth
//                   value={emailSubject}
//                   onChange={(e) => setEmailSubject(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Body"
//                   variant="outlined"
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={emailBody}
//                   onChange={(e) => setEmailBody(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSendEmail}
//                 >
//                   Send Email
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={saveSettings}
//                   style={{ marginLeft: '10px' }}
//                 >
//                   Save Settings
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default EmailMarketing;

// import React, { useState, useEffect } from 'react';
// import {
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   CircularProgress,
// } from '@mui/material';

// const EMAIL_TEMPLATES = {
//   coldCall: 'Subject: Introduction\n\nDear [Name],\n\nI hope this message finds you well. I am reaching out to introduce you to [Your Company] and explore potential opportunities.\n\nBest regards,\n[Your Name]',
//   meetingScheduling: 'Subject: Meeting Request\n\nDear [Name],\n\nI would like to schedule a meeting with you to discuss [Topic]. Please let me know your availability.\n\nBest regards,\n[Your Name]',
//   cancel: 'Subject: Cancellation Notice\n\nDear [Name],\n\nI regret to inform you that [Event/Meeting] has been cancelled. We apologize for any inconvenience.\n\nBest regards,\n[Your Name]',
//   request: 'Subject: Request for Information\n\nDear [Name],\n\nI am writing to request [Information/Assistance] regarding [Topic]. Your prompt response would be greatly appreciated.\n\nBest regards,\n[Your Name]',
//   quote: 'Subject: Quote Request\n\nDear [Name],\n\nPlease find below the quote for [Product/Service]. Let me know if you need any further information.\n\nBest regards,\n[Your Name]',
//   enquire: 'Subject: Inquiry\n\nDear [Name],\n\nI would like to inquire about [Product/Service]. Could you please provide more details?\n\nBest regards,\n[Your Name]',
//   other: 'Subject: General Inquiry\n\nDear [Name],\n\nI hope this message finds you well. I wanted to reach out regarding [Topic]. Please let me know if you need any further details.\n\nBest regards,\n[Your Name]',
// };

// const AUTH_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDk1NTIxMiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0ODY4ODEyfQ.7kZbxXVIRQGeUTFV2ypBJdkXKnsUD5dwz-sSgNAbhNuZjPvcgNLKdkhDAxfMRwRFZNIaRXNj-ezI9USMb_pN8A'; 
// const API_KEY = '9351ca19204e49a09ddb691f79867420';
// const API_ENDPOINT = 'https://servocrm.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview';

// const EmailMarketing: React.FC = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState<string>('coldCall');
//   const [emailID, setEmailID] = useState<string>('');
//   const [emailPassword, setEmailPassword] = useState<string>('');
//   const [incomingHost, setIncomingHost] = useState<string>('');
//   const [outgoingHost, setOutgoingHost] = useState<string>('');
//   const [recipients, setRecipients] = useState<string>('');
//   const [emailSubject, setEmailSubject] = useState<string>('');
//   const [emailBody, setEmailBody] = useState<string>('');
//   const [loadingAI, setLoadingAI] = useState<boolean>(false);

//   // Load stored settings from localStorage
//   useEffect(() => {
//     setEmailID(localStorage.getItem('emailID') || '');
//     setEmailPassword(localStorage.getItem('emailPassword') || '');
//     setIncomingHost(localStorage.getItem('incomingHost') || '');
//     setOutgoingHost(localStorage.getItem('outgoingHost') || '');
//   }, []);

//   // Save settings to localStorage
//   const saveSettings = () => {
//     localStorage.setItem('emailID', emailID);
//     localStorage.setItem('emailPassword', emailPassword);
//     localStorage.setItem('incomingHost', incomingHost);
//     localStorage.setItem('outgoingHost', outgoingHost);
//   };

//   const handleSendEmail = async () => {
//     try {
//       const response = await fetch(`http://localhost:9000/api/send-email?to=${encodeURIComponent(recipients)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${AUTH_TOKEN}`,
//         },
//       });

//       if (response.ok) {
//         alert('Email sent successfully');
//       } else {
//         const errorText = await response.text();
//         console.error('Failed to send email:', errorText);
//         alert('Failed to send email. Check console for details.');
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       alert('Error sending email');
//     }
//   };

//   const fetchAiSuggestions = async () => {
//     setLoadingAI(true);
//     try {
//       const response = await fetch(API_ENDPOINT, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'api-key': API_KEY,
//         },
//         body: JSON.stringify({
//           messages: [
//             {
//               role: 'user',
//               content: `Please provide an email template for: ${selectedTemplate}`,
//             },
//           ],
//         }),
//       });

//       const data = await response.json();
//       const aiSuggestion = data.choices?.[0]?.message?.content.trim();
//       if (aiSuggestion) {
//         setEmailBody(aiSuggestion);
//       } else {
//         alert('AI could not generate a suggestion. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error fetching AI suggestions:', error);
//       alert('Error fetching AI suggestion');
//     } finally {
//       setLoadingAI(false);
//     }
//   };

//   return (
//     <div className='maincontent'>
//       <div className='content'>
//         <Typography variant="h4"  style={{ color: '#d3e3fdb3' }}gutterBottom>
//           Email Marketing
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Card style={{ backgroundColor: '#162c46' }}>
//               <CardHeader title="Email Templates" style={{ color: '#d3e3fdb3' }} />
//               <Divider />
//               <CardContent>
//                 <FormControl fullWidth style={{ marginBottom: '20px' }}>
//                   <InputLabel style={{ color: '#d3e3fdb3' }}>Template Type</InputLabel>
//                   <Select
//                     value={selectedTemplate}
//                     onChange={(e) => {
//                       const template = e.target.value as string;
//                       setSelectedTemplate(template);
//                       const [subject, body] = EMAIL_TEMPLATES[template].split('\n\n', 2);
//                       setEmailSubject(subject.replace('Subject: ', ''));
//                       setEmailBody(body);
//                     }}
//                     style={{ color: '#d3e3fdb3' }}
//                   >
//                     {Object.keys(EMAIL_TEMPLATES).map((key) => (
//                       <MenuItem key={key} value={key}>
//                         {key.charAt(0).toUpperCase() + key.slice(1)}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', color: '#d3e3fdb3' }}>
//                   {EMAIL_TEMPLATES[selectedTemplate]}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={fetchAiSuggestions}
//                   disabled={loadingAI}
//                   style={{ marginTop: '10px' }}
//                 >
//                   {loadingAI ? <CircularProgress size={24} /> : 'Get AI Suggestion'}
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Card style={{ backgroundColor: '#162c46' }}>
//               <CardHeader title="Email Settings" style={{ color: '#d3e3fdb3' }} />
//               <Divider />
//               <CardContent>
//                 <TextField
//                   label="Email Marketing ID"
//                   variant="outlined"
//                   fullWidth
//                   value={emailID}
//                   onChange={(e) => setEmailID(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Email Password"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   value={emailPassword}
//                   onChange={(e) => setEmailPassword(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Incoming Email Host"
//                   variant="outlined"
//                   fullWidth
//                   value={incomingHost}
//                   onChange={(e) => setIncomingHost(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Outgoing Email Host"
//                   variant="outlined"
//                   fullWidth
//                   value={outgoingHost}
//                   onChange={(e) => setOutgoingHost(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Recipients (comma-separated)"
//                   variant="outlined"
//                   fullWidth
//                   value={recipients}
//                   onChange={(e) => setRecipients(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Subject"
//                   variant="outlined"
//                   fullWidth
//                   value={emailSubject}
//                   onChange={(e) => setEmailSubject(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <TextField
//                   label="Email Body"
//                   variant="outlined"
//                   multiline
//                   rows={8}
//                   fullWidth
//                   value={emailBody}
//                   onChange={(e) => setEmailBody(e.target.value)}
//                   style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSendEmail}
//                 >
//                   Send Email
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={saveSettings}
//                   style={{ marginLeft: '10px' }}
//                 >
//                   Save Settings
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

// export default EmailMarketing;


import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';

// Predefined email templates
const EMAIL_TEMPLATES = {
  coldCall: 'Subject: Introduction\n\nDear [Name],\n\nI hope this message finds you well. I am reaching out to introduce you to [Your Company] and explore potential opportunities.\n\nBest regards,\n[Your Name]',
  meetingScheduling: 'Subject: Meeting Request\n\nDear [Name],\n\nI would like to schedule a meeting with you to discuss [Topic]. Please let me know your availability.\n\nBest regards,\n[Your Name]',
  cancel: 'Subject: Cancellation Notice\n\nDear [Name],\n\nI regret to inform you that [Event/Meeting] has been cancelled. We apologize for any inconvenience.\n\nBest regards,\n[Your Name]',
  request: 'Subject: Request for Information\n\nDear [Name],\n\nI am writing to request [Information/Assistance] regarding [Topic]. Your prompt response would be greatly appreciated.\n\nBest regards,\n[Your Name]',
  quote: 'Subject: Quote Request\n\nDear [Name],\n\nPlease find below the quote for [Product/Service]. Let me know if you need any further information.\n\nBest regards,\n[Your Name]',
  enquire: 'Subject: Inquiry\n\nDear [Name],\n\nI would like to inquire about [Product/Service]. Could you please provide more details?\n\nBest regards,\n[Your Name]',
  other: 'Subject: General Inquiry\n\nDear [Name],\n\nI hope this message finds you well. I wanted to reach out regarding [Topic]. Please let me know if you need any further details.\n\nBest regards,\n[Your Name]',
};

// Replace these with your actual values
const AUTH_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNzA3NTA2MiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI2OTg4NjYyfQ.XGi94t1J80qRAAZL2FX7x4IJW4ng1OxL1GVbGQeupwe5Jln4dn-xvlpYkjk1hhUCBU1No43xapqWrX1YO6JX8Q';
const API_KEY = '9351ca19204e49a09ddb691f79867420';
const API_ENDPOINT = 'https://servocrm.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview';

const EmailMarketing: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('coldCall');
  const [recipients, setRecipients] = useState<string>(''); // Comma-separated emails
  const [emailSubject, setEmailSubject] = useState<string>(''); // Email subject
  const [emailBody, setEmailBody] = useState<string>(''); // Email body
  const [loadingAI, setLoadingAI] = useState<boolean>(false); // Loading indicator for AI suggestion

  // Load the email template based on the selected template type
  useEffect(() => {
    const [subject, body] = EMAIL_TEMPLATES[selectedTemplate].split('\n\n', 2);
    setEmailSubject(subject.replace('Subject: ', '')); // Set subject
    setEmailBody(body); // Set body
  }, [selectedTemplate]);

  // Handle sending an email via API
  const handleSendEmail = async () => {
    if (!recipients || !emailSubject || !emailBody) {
      alert('Please fill out all fields');
      return;
    }

    const recipientList = recipients.split(',').map(email => email.trim()); // Split emails by comma

    for (const recipient of recipientList) {
      try {
        // Encode the email parameters to pass them as query params
        const response = await fetch(`http://localhost:9000/api/send-email?to=${encodeURIComponent(recipient)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
          },
        });

        if (response.ok) {
          console.log(`Email sent successfully to ${recipient}`);
        } else {
          const errorText = await response.text();
          console.error(`Failed to send email to ${recipient}:`, errorText);
        }
      } catch (error) {
        console.error(`Error sending email to ${recipient}:`, error);
      }
    }

    alert('Emails sent. Check console for details.');
  };

  // Fetch AI suggestion based on the selected template type
  const fetchAiSuggestions = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Please provide an email template for: ${selectedTemplate}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const aiSuggestion = data.choices?.[0]?.message?.content.trim();
      if (aiSuggestion) {
        setEmailBody(aiSuggestion);
      } else {
        alert('AI could not generate a suggestion. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      alert('Error fetching AI suggestion');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className='maincontent'>
      <div className='content'>
        <Typography variant="h4" style={{ color: '#d3e3fdb3' }} gutterBottom>
          Email Marketing
        </Typography>
        <Grid container spacing={3}>
          {/* Template Selection */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#162c46' }}>
              <CardHeader title="Email Templates" style={{ color: '#d3e3fdb3' }} />
              <Divider />
              <CardContent>
                <FormControl fullWidth style={{ marginBottom: '20px' }}>
                  <InputLabel style={{ color: '#d3e3fdb3' }}>Template Type</InputLabel>
                  <Select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value as string)}
                    style={{ color: '#d3e3fdb3' }}
                  >
                    {Object.keys(EMAIL_TEMPLATES).map((key) => (
                      <MenuItem key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Show the selected email template */}
                <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', color: '#d3e3fdb3' }}>
                  {EMAIL_TEMPLATES[selectedTemplate]}
                </Typography>

                {/* Button to fetch AI-generated email suggestion */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchAiSuggestions}
                  disabled={loadingAI}
                  style={{ marginTop: '10px' }}
                >
                  {loadingAI ? <CircularProgress size={24} /> : 'Get AI Suggestion'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Email Fields */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: '#162c46' }}>
              <CardHeader title="Compose Email" style={{ color: '#d3e3fdb3' }} />
              <Divider />
              <CardContent>
                <TextField
                  label="Recipients (comma-separated)"
                  variant="outlined"
                  fullWidth
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
                />
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
                />
                <TextField
                  label="Email Body"
                  variant="outlined"
                  multiline
                  rows={8}
                  fullWidth
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  style={{ marginBottom: '20px', backgroundColor: '#d3e3fdb3' }}
                />

                {/* Button to send the email */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendEmail}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EmailMarketing;

