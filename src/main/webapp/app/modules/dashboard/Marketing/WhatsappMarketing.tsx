// import React, { useState } from 'react';
// import { Container, Box, Typography, Button, Grid, Card, CardContent, TextField } from '@mui/material';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// export default function WhatsappMarketing() {
//   const [businessNumber, setBusinessNumber] = useState('');
//   const [recipientNumber, setRecipientNumber] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSendMessage = () => {
//     if (businessNumber && recipientNumber && message) {
//       const whatsappURL = `https://api.whatsapp.com/send?phone=${recipientNumber}&text=${encodeURIComponent(message)}`;
//       window.open(whatsappURL, '_blank');
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   return (
//     <div className="main-content" style={{ backgroundColor: '#162c46', color: '#d3e3fdb3' }}>
//       <div className="content">
//         <Container maxWidth="lg" sx={{ mt: 5 }}>
//           <Box sx={{ textAlign: 'center', mb: 5 }}>
//             <Typography variant="h2"  color='#d3e3fdb3' component="h1" gutterBottom>
//               WhatsApp Marketing
//             </Typography>
//             <Typography variant="h5"  color='#d3e3fdb3' >
//               Engage with your customers directly on WhatsApp and boost your marketing efforts.
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={12} sm={6} md={4}>
//               <Card sx={{ backgroundColor: '#25D366', color: '#fff' }}>
//                 <CardContent>
//                   <WhatsAppIcon style={{ fontSize: 60 }} />
//                   <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
//                     Instant Communication
//                   </Typography>
//                   <Typography variant="body1"  color='#d3e3fdb3'>
//                     Send personalized messages, promotions, and updates directly to your customers' WhatsApp.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={6} md={4}>
//               <Card sx={{ backgroundColor: '#25D366', color: '#fff' }}>
//                 <CardContent>
//                   <WhatsAppIcon style={{ fontSize: 60 }} />
//                   <Typography variant="h6" component="h2" sx={{ mt: 2 }}  >
//                     High Engagement Rates
//                   </Typography>
//                   <Typography variant="body1"  color='#fff' >
//                     WhatsApp messages have an open rate of over 90%, ensuring your message is seen.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} sm={6} md={4}>
//               <Card sx={{ backgroundColor: '#25D366', color: '#fff' }}>
//                 <CardContent>
//                   <WhatsAppIcon style={{ fontSize: 60 }} />
//                   <Typography variant="h6"  component="h2" sx={{ mt: 2 }}>
//                     Easy Integration
//                   </Typography>
//                   <Typography variant="body1"  color='#d3e3fdb3'>
//                     Seamlessly integrate WhatsApp marketing into your existing CRM and marketing systems.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Box sx={{ textAlign: 'center', mt: 5 }}>
//             <Typography variant="h6" color='#d3e3fdb3' gutterBottom>
//               Send a WhatsApp Message
//             </Typography>
//             <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
//               <TextField
//                 label="Your WhatsApp Business Number"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={businessNumber}
//                 onChange={(e) => setBusinessNumber(e.target.value)}
//                 InputProps={{ style: { color: 'white' } }}
//               />
//               <TextField
//                 label="Recipient's Number"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={recipientNumber}
//                 onChange={(e) => setRecipientNumber(e.target.value)}
//                 InputProps={{ style: { color: '#d3e3fdb3' } }}
//               />
//               <TextField
//                 label="Message"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={4}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 InputProps={{ style: { color: '#d3e3fdb3' } }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 startIcon={<WhatsAppIcon />}
//                 sx={{ mt: 3 }}
//                 onClick={handleSendMessage}
//               >
//                 Send Message
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function WhatsappMarketing() {
  const [recipientNumber, setRecipientNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (recipientNumber && message) {
      const url = 'https://graph.facebook.com/v20.0/382339461637191/messages';
      const accessToken = 'EAA2cAi3crwoBO0tfNZBIzAFzxRu2xqLeP0ES4ZAlEy8zDO8PwZBNMxhlWfhtqTzn99se30rtTRq849vNiK2p8k7OnjjTXNPzaOowsIPrT51PFdE5OXATYhAOsZBYn33YWLmZBrTqyMZCHBuKU2Kb1GaOmRQGxVpUbE9ZBQa7WgQDBeXqEwZAxW1m9ifEgsew5NSitTeVvJhq9noZB1ZC8kCI8ZD';

      const data = {
        messaging_product: 'whatsapp',
        to: recipientNumber,
        type: 'template',
        template: {
          name: 'hello_world',
          language: {
            code: 'en_US'
          }
        }
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Message sent successfully');
        } else {
          alert('Failed to send message');
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="main-content" style={{ backgroundColor: '#162c46', color: '#d3e3fdb3' }}>
      <div className="content">
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Send a WhatsApp Message
            </Typography>
          </Box>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              label="Recipient's Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={recipientNumber}
              onChange={(e) => setRecipientNumber(e.target.value)}
              InputProps={{ style: { color: '#d3e3fdb3' } }}
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
              InputProps={{ style: { color: '#d3e3fdb3' } }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={{ mt: 3 }}
              onClick={handleSendMessage}
            >
              Send Message
            </Button>
          </Box>
        </Container>
      </div>
    </div>
  );
}
