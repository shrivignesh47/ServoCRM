import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

export default function PowerBi() {
  const [config, setConfig] = useState({
    workspaceId: '',
    reportId: '',
    embedToken: '',
  });

  const [isConfigured, setIsConfigured] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: value,
    });
  };

  const handleConfigure = () => {
    setIsConfigured(true);
  };

  return (
    <div className={`main-content ${isConfigured ? 'collapsed' : ''}`}>
      <div className={`content ${isConfigured ? 'collapsed' : ''}`}>
        <Typography variant="h4" color="#d3e3fdb3" gutterBottom>
          Power BI Integration
        </Typography>
        
        {!isConfigured ? (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6" color="#d3e3fdb3"  gutterBottom>
              Enter Power BI Configuration Details
            </Typography>
            <TextField
              color="primary"
              label ="Workspace_ID"
              name="workspaceId"
              fullWidth
              margin="normal"
              value={config.workspaceId}
              onChange={handleInputChange}
            />
            <TextField
              label="Report ID"
              name="reportId"
              fullWidth
              margin="normal"
              value={config.reportId}
              onChange={handleInputChange}
            />
            <TextField
              label="Embed Token"
              name="embedToken"
              fullWidth
              margin="normal"
              value={config.embedToken}
              onChange={handleInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfigure}
              style={{ marginTop: '20px' }}
            >
              Load Power BI Report
            </Button>
          </div>
        ) : (
          <div style={{ marginTop: '20px' }} className='content'>
            <PowerBIEmbed
              embedConfig={{
                type: 'report', // Supported types: report, dashboard, tile, visual, qna
                id: config.reportId,
                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${config.reportId}&groupId=${config.workspaceId}`,
                accessToken: config.embedToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    },
                    pageNavigation: {
                      visible: false
                    }
                  },
                  background: models.BackgroundType.Transparent,
                }
              }}
              cssClassName="powerbi-embed"
              getEmbeddedComponent={(embeddedReport) => {
                console.log('Embedded Report:', embeddedReport);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
