
// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Button, Typography, Card, CardContent, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// export default function GMeet() {
//   const [meetingLink, setMeetingLink] = useState<string | null>(null);
//   const [inputLink, setInputLink] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const [isExtensionInstalled, setIsExtensionInstalled] = useState<boolean>(false);
//   const [showRefreshButton, setShowRefreshButton] = useState<boolean>(false);
//   const [openDialog, setOpenDialog] = useState<boolean>(true);
//   const meetFrameRef = useRef<HTMLIFrameElement>(null);

//   // Use effect to show the dialog if the extension is not installed
//   useEffect(() => {
//     if (!isExtensionInstalled) {
//       setOpenDialog(true);
//     }
//   }, [isExtensionInstalled]);

//   const handleConfirmExtension = () => {
//     setIsExtensionInstalled(true);
//     setError(''); // Clear any previous errors
//     setOpenDialog(false);
//   };

//   const handleCancelExtension = () => {
//     setIsExtensionInstalled(false);
//     setError('Please install and enable the "Ignore X-Frame-Options" extension to join the meeting.');
//     setShowRefreshButton(true);
//     setOpenDialog(false);
//   };

//   const handleJoinMeeting = () => {
//     if (isExtensionInstalled) {
//       // Validate the provided Google Meet link
//       if (inputLink.startsWith('https://meet.google.com/')) {
//         setMeetingLink(inputLink);
//         setError('');
//         localStorage.setItem('userJoinedMeeting', 'true'); // Store flag in local storage
//       } else {
//         setError('Invalid Google Meet link. Please check the link and try again.');
//       }
//     } else {
//       setError('Please install and enable the "Ignore X-Frame-Options" extension to join the meeting.');
//     }
//   };

//   const handleFullScreen = () => {
//     if (meetFrameRef.current) {
//       if (meetFrameRef.current.requestFullscreen) {
//         meetFrameRef.current.requestFullscreen();
//       } else if (meetFrameRef.current.mozRequestFullScreen) { /* Firefox */
//         meetFrameRef.current.mozRequestFullScreen();
//       } else if (meetFrameRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
//         meetFrameRef.current.webkitRequestFullscreen();
//       } else if (meetFrameRef.current.msRequestFullscreen) { /* IE/Edge */
//         meetFrameRef.current.msRequestFullscreen();
//       }
//     }
//   };

//   const handleRetryPrompt = () => {
//     setOpenDialog(true);
//     setShowRefreshButton(false); // Hide refresh button while showing prompt
//   };

//   return (
//     <div className="content">
//       <div className="gmeet-container" style={{ marginTop: '8vh' }}>
//         <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#162c46', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: "#d3e3fdb3" }}>
//               Google Meet
//             </Typography>

//             {error && (
//               <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
//                 {error}
//               </Typography>
//             )}

//             {meetingLink ? (
//               <Box mt={3} style={{ textAlign: 'center' }}>
//                 <Box mt={3} style={{ textAlign: 'center' }}>
//                   <iframe
//                     ref={meetFrameRef}
//                     src={meetingLink}
//                     allow="camera; microphone; fullscreen; display-capture"
//                     style={{ width: '100%', height: '70vh', border: 'none' }}
//                     title="Google Meet"
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleFullScreen}
//                     style={{ marginTop: '16px' }}
//                   >
//                     Full Screen
//                   </Button>
//                 </Box>
//                 <Typography variant="body2" style={{ textAlign: 'center', marginTop: '20px' }}>
//                   Remember to disable the "Ignore X-Frame-Options" extension after your meeting.
//                 </Typography>
//               </Box>
//             ) : (
//               <Box mt={3} style={{ textAlign: 'center' }}>
//                 <TextField
//                   label="Google Meet Link"
//                   variant="outlined"
//                   fullWidth
//                   value={inputLink}
//                   onChange={(e) => setInputLink(e.target.value)}
//                   placeholder="Paste your Google Meet link here"
//                 />
//                 <Button variant="contained" color="primary" onClick={handleJoinMeeting} style={{ marginTop: '16px' }}>
//                   Join Meeting
//                 </Button>
//                 {!isExtensionInstalled && (
//                   <>
//                     <Typography variant="body2" color="error" style={{ marginTop: '16px', textAlign: 'center' }}>
//                       Please install and enable the{' '}
//                       <a href="https://chrome.google.com/webstore/detail/ignore-x-frame-options/ammjifkhlacaphegobaekhnapdjmeclo?hl=en" target="_blank" rel="noopener noreferrer">
//                         "Ignore X-Frame-Options" extension
//                       </a>{' '}
//                       to join the meeting.
//                     </Typography>
//                     {showRefreshButton && (
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         onClick={handleRetryPrompt}
//                         style={{ marginTop: '16px' }}
//                       >
//                         Refresh
//                       </Button>
//                     )}
//                   </>
//                 )}
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Extension Check</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Do you have the "Ignore X-Frame-Options" extension installed and enabled? Click "OK" if yes, "Cancel" if no.
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleConfirmExtension} color="primary">OK</Button>
//           <Button onClick={handleCancelExtension} color="secondary">Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function ManageMeeting() {
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [inputLink, setInputLink] = useState<string>('');
  const [zoomMeetingId, setZoomMeetingId] = useState<string>('');
  const [zoomPasscode, setZoomPasscode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isExtensionInstalled, setIsExtensionInstalled] = useState<boolean>(false);
  const [showRefreshButton, setShowRefreshButton] = useState<boolean>(false);
  const [openExtensionDialog, setOpenExtensionDialog] = useState<boolean>(true);
  const [openServiceDialog, setOpenServiceDialog] = useState<boolean>(true);
  const [service, setService] = useState<'gmeet' | 'zoom'>('gmeet');
  const meetFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isExtensionInstalled && service === 'gmeet') {
      setOpenExtensionDialog(true);
    }
  }, [isExtensionInstalled, service]);

  const handleConfirmExtension = () => {
    setIsExtensionInstalled(true);
    setError('');
    setOpenExtensionDialog(false);
  };

  const handleCancelExtension = () => {
    setIsExtensionInstalled(false);
    setError('Please install and enable the "Ignore X-Frame-Options" extension to join the meeting.');
    setShowRefreshButton(true);
    setOpenExtensionDialog(false);
  };

  const handleJoinMeeting = () => {
    if (service === 'gmeet') {
      if (isExtensionInstalled) {
        if (inputLink.startsWith('https://meet.google.com/')) {
          setMeetingLink(inputLink);
          setError('');
          localStorage.setItem('userJoinedMeeting', 'true');
        } else {
          setError('Invalid Google Meet link. Please check the link and try again.');
        }
      } else {
        setError('Please install and enable the "Ignore X-Frame-Options" extension to join the meeting.');
      }
    } else if (service === 'zoom') {
      if (zoomMeetingId) {
        // Construct the Zoom URL for embedding
        const zoomUrl = `https://zoom.us/wc/${zoomMeetingId}/join?from=browser&pwd=${zoomPasscode}`;
        setMeetingLink(zoomUrl);
        setError('');
        localStorage.setItem('userJoinedMeeting', 'true');
      } else {
        setError('Please enter a valid Zoom Meeting ID.');
      }
    }
  };

  const handleFullScreen = () => {
    if (meetFrameRef.current) {
      if (meetFrameRef.current.requestFullscreen) {
        meetFrameRef.current.requestFullscreen();
      } else if (meetFrameRef.current.mozRequestFullScreen) { /* Firefox */
        meetFrameRef.current.mozRequestFullScreen();
      } else if (meetFrameRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        meetFrameRef.current.webkitRequestFullscreen();
      } else if (meetFrameRef.current.msRequestFullscreen) { /* IE/Edge */
        meetFrameRef.current.msRequestFullscreen();
      }
    }
  };

  const handleRetryPrompt = () => {
    setOpenExtensionDialog(true);
    setShowRefreshButton(false);
  };

  const handleSelectService = (selectedService: 'gmeet' | 'zoom') => {
    setService(selectedService);
    setOpenServiceDialog(false);
  };

  return (
    <div className="content">
      <div className="gmeet-container" style={{ marginTop: '8vh' }}>
        <Card className="gmeet-card" style={{ padding: '20px', backgroundColor: '#162c46', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom style={{ textAlign: 'center', color: "#d3e3fdb3" }}>
              {service === 'gmeet' ? 'Google Meet' : 'Zoom Meeting'}
            </Typography>

            {error && (
              <Typography variant="body1" color="error" style={{ textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            {meetingLink ? (
              <Box mt={3} style={{ textAlign: 'center' }}>
                <Box mt={3} style={{ textAlign: 'center' }}>
                  <iframe
                    ref={meetFrameRef}
                    src={meetingLink}
                    allow="camera; microphone; fullscreen; display-capture"
                    style={{ width: '100%', height: '70vh', border: 'none' }}
                    title={service === 'gmeet' ? 'Google Meet' : 'Zoom Meeting'}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFullScreen}
                    style={{ marginTop: '16px' }}
                  >
                    Full Screen
                  </Button>
                </Box>
                <Typography variant="body2" style={{ textAlign: 'center', marginTop: '20px' }}>
                  {service === 'gmeet' && 'Remember to disable the "Ignore X-Frame-Options" extension after your meeting.'}
                </Typography>
              </Box>
            ) : (
              <Box mt={3} style={{ textAlign: 'center' }}>
                {service === 'zoom' ? (
                  <>
                    <TextField
                      label="Meeting ID"
                      variant="outlined"
                      fullWidth
                      value={zoomMeetingId}
                      onChange={(e) => setZoomMeetingId(e.target.value)}
                      placeholder="Enter Zoom Meeting ID"
                      style={{ marginBottom: '16px' }}
                    />
                    <TextField
                      label="Passcode (Optional)"
                      variant="outlined"
                      fullWidth
                      value={zoomPasscode}
                      onChange={(e) => setZoomPasscode(e.target.value)}
                      placeholder="Enter Zoom Passcode (if required)"
                      style={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleJoinMeeting}>
                      Join Zoom Meeting
                    </Button>
                  </>
                ) : (
                  <>
                    <TextField
                      label="Google Meet Link"
                      variant="outlined"
                      fullWidth
                      value={inputLink}
                      onChange={(e) => setInputLink(e.target.value)}
                      placeholder="Paste your Google Meet link here"
                    />
                    <Button variant="contained" color="primary" onClick={handleJoinMeeting} style={{ marginTop: '16px' }}>
                      Join Google Meet
                    </Button>
                  </>
                )}
                {!isExtensionInstalled && service === 'gmeet' && (
                  <>
                    <Typography variant="body2" color="error" style={{ marginTop: '16px', textAlign: 'center' }}>
                      Please install and enable the{' '}
                      <a href="https://chrome.google.com/webstore/detail/ignore-x-frame-options/ammjifkhlacaphegobaekhnapdjmeclo?hl=en" target="_blank" rel="noopener noreferrer">
                        "Ignore X-Frame-Options" extension
                      </a>{' '}
                      to join the meeting.
                    </Typography>
                    {showRefreshButton && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRetryPrompt}
                        style={{ marginTop: '16px' }}
                      >
                        Retry Prompt
                      </Button>
                    )}
                  </>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={openServiceDialog} onClose={() => setOpenServiceDialog(false)} style={{ backgroundColor: '#162c46'}}>
        <DialogTitle style={{color:"#d3e3fdb3", backgroundColor: 'black'}}>Select Meeting Service</DialogTitle>
        <DialogContent  style={{color:"#d3e3fdb3", backgroundColor: '#162c46'}}>
          <Typography style={{color:"#d3e3fdb3", backgroundColor: '#162c46'}}>
            Please choose the meeting service you want to use:
          </Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#162c46'}}>
          <Button onClick={() => handleSelectService('gmeet')} color="primary">Google Meet</Button>
          <Button onClick={() => handleSelectService('zoom')} color="secondary">Zoom</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openExtensionDialog} onClose={() => setOpenExtensionDialog(false)} style={{ backgroundColor: '#162c46'}}>
        <DialogTitle style={{color:"#d3e3fdb3" , backgroundColor: 'black'}}>Extension Check</DialogTitle>
        <DialogContent style={{ backgroundColor: '#162c46'}}>
          <Typography style={{color:"#d3e3fdb3"}}>
            Do you have the "Ignore X-Frame-Options" extension installed and enabled? Click "OK" if yes, "Cancel" if no.
          </Typography>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#162c46'}}>
          <Button onClick={handleConfirmExtension} color="primary">OK</Button>
          <Button onClick={handleCancelExtension} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
