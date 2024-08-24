// import React, { useState } from 'react';
// import { Container, Box, Typography, Button, TextField, Card, CardContent, CircularProgress } from '@mui/material';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import DoneIcon from '@mui/icons-material/Done';
// import ErrorIcon from '@mui/icons-material/Error';

// export default function WhatsappMarketing() {
//   const [recipientNumber, setRecipientNumber] = useState('');
//   const [message, setMessage] = useState('');
//   const [sendingStatus, setSendingStatus] = useState('idle'); // idle, sending, success, error
//   const [messageHistory, setMessageHistory] = useState([]);

//   const handleSendMessage = async () => {
//     if (recipientNumber && message) {
//       setSendingStatus('sending');

//       const accountSid = 'AC244619baac59144203db600381dd4d46'; // Replace with your Twilio Account SID
//       const authToken = 'e3b793637aa8067316f9aa1f0f8ecd28'; // Replace with your Twilio Auth Token
//       const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Replace with your Twilio WhatsApp number
//       const toWhatsAppNumber = `whatsapp:${recipientNumber}`;
      
//       const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

//       const data = new URLSearchParams({
//         From: fromWhatsAppNumber,
//         To: toWhatsAppNumber,
//         Body: message,
//       });

//       try {
//         const response = await fetch(url, {
//           method: 'POST',
//           headers: {
//             'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
//             'Content-Type': 'application/x-www-form-urlencoded'
//           },
//           body: data.toString(),
//         });

//         if (response.ok) {
//           setSendingStatus('success');
//           setMessageHistory([
//             ...messageHistory,
//             { recipient: recipientNumber, message, status: 'Sent', timestamp: new Date().toLocaleString() },
//           ]);
//           setMessage(''); // Clear message after sending
//         } else {
//           setSendingStatus('error');
//           setMessageHistory([
//             ...messageHistory,
//             { recipient: recipientNumber, message, status: 'Failed', timestamp: new Date().toLocaleString() },
//           ]);
//         }
//       } catch (error) {
//         setSendingStatus('error');
//         setMessageHistory([
//           ...messageHistory,
//           { recipient: recipientNumber, message, status: 'Failed', timestamp: new Date().toLocaleString() },
//         ]);
//       }
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   const renderSendingStatus = () => {
//     switch (sendingStatus) {
//       case 'sending':
//         return <CircularProgress color="inherit" size={24} />;
//       case 'success':
//         return <DoneIcon color="success" />;
//       case 'error':
//         return <ErrorIcon color="error" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="main-content" style={{ backgroundColor: '#162c46', color: '#d3e3fdb3', minHeight: '100vh' }}>
//       <div className="content">
//         <Container maxWidth="md" sx={{ pt: 5 }}>
//           <Box sx={{ textAlign: 'center', mb: 5 }}>
//             <Typography variant="h4" component="h1" style={{ color: '#d3e3fdb3' }} gutterBottom>
//               WhatsApp Marketing CRM
//             </Typography>
//             <Typography variant="subtitle1" component="p" gutterBottom style={{ color: '#d3e3fdb3' }}>
//               Send messages, track status, and manage your customer communication.
//             </Typography>
//           </Box>
//           <Card sx={{ p: 3, backgroundColor: '#1e3c61', boxShadow: 3 }}>
//             <CardContent>
//               <Box component="form" noValidate autoComplete="off" sx={{ mb: 3 }}>
//                 <TextField
//                   label="Recipient's Number"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={recipientNumber}
//                   onChange={(e) => setRecipientNumber(e.target.value)}
//                   InputProps={{ style: { color: '#d3e3fdb3' } }}
//                 />
//                 <TextField
//                   label="Message"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   multiline
//                   rows={4}
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   InputProps={{ style: { color: '#d3e3fdb3' } }}
//                 />
//                 <Box sx={{ textAlign: 'center', mt: 3 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                     startIcon={renderSendingStatus() || <WhatsAppIcon />}
//                     onClick={handleSendMessage}
//                     disabled={sendingStatus === 'sending'}
//                   >
//                     {sendingStatus === 'sending' ? 'Sending...' : 'Send Message'}
//                   </Button>
//                 </Box>
//               </Box>
//               {messageHistory.length > 0 && (
//                 <Box sx={{ mt: 5 }}>
//                   <Typography variant="h6" component="h2" gutterBottom style={{ color: '#d3e3fdb3' }}>
//                     Message History
//                   </Typography>
//                   {messageHistory.map((entry, index) => (
//                     <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: '#223b5e' }}>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>To:</strong> {entry.recipient}
//                       </Typography>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>Message:</strong> {entry.message}
//                       </Typography>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>Status:</strong> {entry.status}
//                       </Typography>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>Timestamp:</strong> {entry.timestamp}
//                       </Typography>
//                     </Card>
//                   ))}
//                 </Box>
//               )}
//             </CardContent>
//           </Card>
//         </Container>
//       </div>
//     </div>
//   );
// // }
// import React, { useState, useEffect } from 'react';
// import { Container, Box, Typography, Button, TextField, Card, CardContent, CircularProgress } from '@mui/material';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import DoneIcon from '@mui/icons-material/Done';
// import ErrorIcon from '@mui/icons-material/Error';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import jsPDF from 'jspdf';

// export default function WhatsappMarketing() {
//   const [recipientNumber, setRecipientNumber] = useState('');
//   const [message, setMessage] = useState('');
//   const [sendingStatus, setSendingStatus] = useState('idle'); // idle, sending, success, error
//   const [messageHistory, setMessageHistory] = useState([]);

//   // Load message history from local storage on initial render
//   useEffect(() => {
//     const savedHistory = localStorage.getItem('messageHistory');
//     if (savedHistory) {
//       setMessageHistory(JSON.parse(savedHistory));
//     }
//   }, []);

//   // Save message history to local storage when it changes
//   useEffect(() => {
//     localStorage.setItem('messageHistory', JSON.stringify(messageHistory));
//   }, [messageHistory]);

//   const handleSendMessage = async () => {
//     if (recipientNumber && message) {
//       setSendingStatus('sending');

//       const accountSid = 'AC244619baac59144203db600381dd4d46'; // Replace with your Twilio Account SID
//       const authToken = 'e3b793637aa8067316f9aa1f0f8ecd28'; // Replace with your Twilio Auth Token
//       const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Replace with your Twilio WhatsApp number
//       let toWhatsAppNumber = recipientNumber.startsWith('+')
//         ? `whatsapp:${recipientNumber}`
//         : `whatsapp:+1${recipientNumber}`; // Default country code prefix for the US

//       const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

//       const data = new URLSearchParams({
//         From: fromWhatsAppNumber,
//         To: toWhatsAppNumber,
//         Body: message,
//       });

//       try {
//         const response = await fetch(url, {
//           method: 'POST',
//           headers: {
//             Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`),
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: data.toString(),
//         });

//         if (response.ok) {
//           setSendingStatus('success');
//           setMessageHistory([
//             ...messageHistory,
//             { recipient: recipientNumber, message, status: 'Sent', timestamp: new Date().toLocaleString() },
//           ]);
//           setMessage(''); // Clear message after sending
//         } else {
//           setSendingStatus('error');
//           setMessageHistory([
//             ...messageHistory,
//             { recipient: recipientNumber, message, status: 'Failed', timestamp: new Date().toLocaleString() },
//           ]);
//         }
//       } catch (error) {
//         setSendingStatus('error');
//         setMessageHistory([
//           ...messageHistory,
//           { recipient: recipientNumber, message, status: 'Failed', timestamp: new Date().toLocaleString() },
//         ]);
//       }
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   const renderSendingStatus = () => {
//     switch (sendingStatus) {
//       case 'sending':
//         return <CircularProgress color="inherit" size={24} />;
//       case 'success':
//         return <DoneIcon color="success" />;
//       case 'error':
//         return <ErrorIcon color="error" />;
//       default:
//         return null;
//     }
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.text('WhatsApp Marketing CRM - Message History', 14, 22);
//     doc.setFontSize(12);

//     let yPos = 30;
//     messageHistory.forEach((entry, index) => {
//       doc.text(`Message ${index + 1}:`, 14, yPos);
//       doc.text(`To: ${entry.recipient}`, 14, yPos + 6);
//       doc.text(`Message: ${entry.message}`, 14, yPos + 12);
//       doc.text(`Status: ${entry.status}`, 14, yPos + 18);
//       doc.text(`Timestamp: ${entry.timestamp}`, 14, yPos + 24);
//       yPos += 36;
//     });

//     doc.save('Message_History.pdf');
//   };

//   const getTotalMessagesSent = () => {
//     return messageHistory.length;
//   };

//   const getTotalRecipients = () => {
//     const recipients = messageHistory.map((entry) => entry.recipient);
//     return [...new Set(recipients)].length;
//   };

//   const getMessagesPerUser = () => {
//     const messagesPerUser = messageHistory.reduce((acc, entry) => {
//       acc[entry.recipient] = (acc[entry.recipient] || 0) + 1;
//       return acc;
//     }, {});
//     return messagesPerUser;
//   };

//   return (
//     <div className="main-content" style={{ backgroundColor: '#162c46', color: '#d3e3fdb3', minHeight: '100vh' }}>
//       <div className="content">
//         <Container maxWidth="md" sx={{ pt: 5 }}>
//           <Box sx={{ textAlign: 'center', mb: 5 }}>
//             <Typography variant="h4" component="h1" style={{ color: '#d3e3fdb3' }} gutterBottom>
//               WhatsApp Marketing CRM
//             </Typography>
//             <Typography variant="subtitle1" component="p" gutterBottom style={{ color: '#d3e3fdb3' }}>
//               Send messages, track status, and manage your customer communication.
//             </Typography>
//           </Box>
//           <Card sx={{ p: 3, backgroundColor: '#1e3c61', boxShadow: 3 }}>
//             <CardContent>
//               <Box component="form" noValidate autoComplete="off" sx={{ mb: 3 }}>
//                 <TextField
//                   label="Recipient's Number"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={recipientNumber}
//                   onChange={(e) => setRecipientNumber(e.target.value)}
//                   InputProps={{ style: { color: '#d3e3fdb3' } }}
//                 />
//                 <TextField
//                   label="Message"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   multiline
//                   rows={4}
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   InputProps={{ style: { color: '#d3e3fdb3' } }}
//                 />
//                 <Box sx={{ textAlign: 'center', mt: 3 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="large"
//                     startIcon={renderSendingStatus() || <WhatsAppIcon />}
//                     onClick={handleSendMessage}
//                     disabled={sendingStatus === 'sending'}
//                   >
//                     {sendingStatus === 'sending' ? 'Sending...' : 'Send Message'}
//                   </Button>
//                 </Box>
//               </Box>
//               {messageHistory.length > 0 && (
//                 <Box sx={{ mt: 5 }}>
//                   <Typography variant="h6" component="h2" gutterBottom style={{ color: '#d3e3fdb3' }}>
//                     Message History
//                   </Typography>
//                   {messageHistory.map((entry, index) => (
//                     <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: '#223b5e' }}>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>To:</strong> {entry.recipient}
//                       </Typography>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>Message:</strong> {entry.message}
//                       </Typography>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>Status:</strong> {entry.status}
//                       </Typography>
//                       <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                         <strong>Timestamp:</strong> {entry.timestamp}
//                       </Typography>
//                     </Card>
//                   ))}
//                   <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3', marginTop: '20px' }}>
//                     <strong>Total Messages Sent:</strong> {getTotalMessagesSent()}
//                   </Typography>
//                   <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                     <strong>Total Recipients:</strong> {getTotalRecipients()}
//                   </Typography>
//                   <Typography variant="body2" component="p" style={{ color: '#d3e3fdb3' }}>
//                     <strong>Messages Per User:</strong> {JSON.stringify(getMessagesPerUser())}
//                   </Typography>
//                 </Box>
//               )}
//               <Box sx={{ textAlign: 'center', mt: 3 }}>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   size="large"
//                   startIcon={<PictureAsPdfIcon />}
//                   onClick={handleDownloadPDF}
//                 >
//                   Download as PDF
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Container>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, TextField, Card, CardContent, CircularProgress, Grid, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import jsPDF from 'jspdf';

export default function WhatsappMarketing() {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sendingStatus, setSendingStatus] = useState('idle'); // idle, sending, success, error
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const messageTemplates = [
    'Hello, how can I assist you today?',
    'Thank you for your purchase!',
    'Your order has been shipped.',
    'Please provide your feedback.',
  ];

  // Load message history from local storage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('messageHistory');
    if (savedHistory) {
      setMessageHistory(JSON.parse(savedHistory));
      setMessageCount(JSON.parse(savedHistory).length);
    }
  }, []);

  // Save message history to local storage when it changes
  useEffect(() => {
    localStorage.setItem('messageHistory', JSON.stringify(messageHistory));
    setMessageCount(messageHistory.length);
  }, [messageHistory]);

  const handleSendMessage = async () => {
    if (recipientNumber && message) {
      setSendingStatus('sending');

      const accountSid = 'AC244619baac59144203db600381dd4d46'; // Replace with your Twilio Account SID
      const authToken = 'e3b793637aa8067316f9aa1f0f8ecd28'; // Replace with your Twilio Auth Token
      const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Replace with your Twilio WhatsApp number
      let toWhatsAppNumber = recipientNumber.startsWith('+')
        ? `whatsapp:${recipientNumber}`
        : `whatsapp:+1${recipientNumber}`; // Default country code prefix for the US

      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

      const data = new URLSearchParams({
        From: fromWhatsAppNumber,
        To: toWhatsAppNumber,
        Body: message,
      });

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: 'Basic ' + btoa(`${accountSid}:${authToken}`),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data.toString(),
        });

        if (response.ok) {
          setSendingStatus('success');
          setMessageHistory([
            ...messageHistory,
            { recipient: recipientNumber, message, status: 'Sent', timestamp: new Date().toLocaleString() },
          ]);
          setMessage(''); // Clear message after sending
        } else {
          setSendingStatus('error');
          setMessageHistory([
            ...messageHistory,
            { recipient: recipientNumber, message, status: 'Failed', timestamp: new Date().toLocaleString() },
          ]);
        }
      } catch (error) {
        setSendingStatus('error');
        setMessageHistory([
          ...messageHistory,
          { recipient: recipientNumber, message, status: 'Failed', timestamp: new Date().toLocaleString() },
        ]);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('WhatsApp Marketing CRM - Message History', 14, 22);
    doc.setFontSize(12);

    let yPos = 30;
    messageHistory.forEach((entry, index) => {
      doc.text(`Message ${index + 1}:`, 14, yPos);
      doc.text(`To: ${entry.recipient}`, 14, yPos + 6);
      doc.text(`Message: ${entry.message}`, 14, yPos + 12);
      doc.text(`Status: ${entry.status}`, 14, yPos + 18);
      doc.text(`Timestamp: ${entry.timestamp}`, 14, yPos + 24);
      yPos += 36;
    });

    doc.save('Message_History.pdf');
  };

  const renderSendingStatus = () => {
    switch (sendingStatus) {
      case 'sending':
        return <CircularProgress color="inherit" size={24} />;
      case 'success':
        return <DoneIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  const handleTemplateSelect = (template) => {
    setMessage(template);
    setSelectedTemplate(template);
  };

  const getTotalMessagesSent = () => {
    return messageHistory.length;
  };

  const getTotalRecipients = () => {
    const recipients = messageHistory.map((entry) => entry.recipient);
    return [...new Set(recipients)].length;
  };

  const getMessagesPerUser = () => {
    const messagesPerUser = messageHistory.reduce((acc, entry) => {
      acc[entry.recipient] = (acc[entry.recipient] || 0) + 1;
      return acc;
    }, {});
    return messagesPerUser;
  };

  return (
        <div className='content' >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1"  style={{ color: '#d3e3fdb3' }} gutterBottom>
            WhatsApp Marketing CRM
          </Typography>
          <Typography variant="subtitle1" component="p"  style={{ color: '#d3e3fdb3' }}gutterBottom>
            Streamline your customer communication with ease
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3,  backgroundColor: '#162c46' , boxShadow: 3 }}>
              <CardContent>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    label="Recipient's Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={recipientNumber}
                    onChange={(e) => setRecipientNumber(e.target.value)}
                    InputProps={{ style: { color: '#f3f6f9' } }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    InputProps={{ style: { color: '#f3f6f9' } }}
                  />
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={renderSendingStatus() || <SendIcon />}
                      onClick={handleSendMessage}
                      disabled={sendingStatus === 'sending'}
                    >
                      {sendingStatus === 'sending' ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3,  backgroundColor: '#162c46' , boxShadow: 3 }}  style={{height:'55.1vh'}}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom  style={{ color: '#d3e3fdb3' }}>
                  Message Templates
                </Typography>
                <Grid container spacing={2}>
                  {messageTemplates.map((template, index) => (
                    <Grid item xs={12} key={index}>
                      <Button
                        variant={template === selectedTemplate ? 'contained' : 'outlined'}
                        color="secondary"
                        fullWidth
                        startIcon={<MessageIcon />}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        {template}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3,  backgroundColor: '#162c46' , boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom  style={{ color: '#d3e3fdb3' }}>
                  Message History
                </Typography>
                {messageHistory.length > 0 ? (
                  messageHistory.map((entry, index) => (
                    <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: '#1c2a35' }}>
                      <Typography variant="body2" component="p" style={{ color: '#f3f6f9' }}>
                        <strong>To:</strong> {entry.recipient}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ color: '#f3f6f9' }}>
                        <strong>Message:</strong> {entry.message}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ color: '#f3f6f9' }}>
                        <strong>Status:</strong> {entry.status}
                      </Typography>
                      <Typography variant="body2" component="p" style={{ color: '#f3f6f9' }}>
                        <strong>Timestamp:</strong> {entry.timestamp}
                      </Typography>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" component="p" style={{ color: '#f3f6f9' }}>
                    No messages sent yet.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={14} md={4} style={{height:'200px'}}>
            <Card sx={{ p: 3,  backgroundColor: '#162c46' , boxShadow: 3 }} style={{height:'55.1vh'}}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom  style={{ color: '#d3e3fdb3' }}>
                  Statistics
                </Typography>
                <Typography variant="body2" component="p" style={{ color: '#f3f6f9', marginBottom: '10px' }}>
                  <strong>Total Messages Sent:</strong> {getTotalMessagesSent()}
                </Typography>
                <Typography variant="body2" component="p" style={{ color: '#f3f6f9', marginBottom: '10px' }}>
                  <strong>Total Recipients:</strong> {getTotalRecipients()}
                </Typography>
                <Typography variant="body2" component="p" style={{ color: '#f3f6f9' }}>
                  <strong>Messages Per User:</strong> {JSON.stringify(getMessagesPerUser())}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleDownloadPDF}
                >
                  Download as PDF
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      </div>
  );
}
