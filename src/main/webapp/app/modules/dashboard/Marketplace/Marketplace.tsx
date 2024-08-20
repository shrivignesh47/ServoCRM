import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import './Marketplace.css'; // Import the CSS file

const extensions = [
  { name: 'HubSpot Sales', description: 'Track email opens and clicks, and automate follow-ups.', icon: 'https://example.com/hubspot-icon.png', installLink: 'https://chrome.google.com/webstore/detail/hubspot-sales/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Salesforce', description: 'Access Salesforce CRM from your browser for quick data access.', icon: 'https://example.com/salesforce-icon.png', installLink: 'https://chrome.google.com/webstore/detail/salesforce/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'LinkedIn Sales Navigator', description: 'Enhance your LinkedIn experience with advanced CRM features.', icon: 'https://example.com/linkedin-icon.png', installLink: 'https://chrome.google.com/webstore/detail/linkedin-sales-navigato/pnnfbpglkmkekfmghckdbaplhflkfhdk' },
  { name: 'Zoom', description: 'Schedule and start Zoom meetings directly from your CRM.', icon: 'https://example.com/zoom-icon.png', installLink: 'https://chrome.google.com/webstore/detail/zoom/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'PandaDoc', description: 'Create, send, and manage documents and contracts.', icon: 'https://example.com/pandadoc-icon.png', installLink: 'https://chrome.google.com/webstore/detail/pandadoc/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Hunter.io', description: 'Find and verify email addresses for lead generation.', icon: 'https://example.com/hunter-icon.png', installLink: 'https://chrome.google.com/webstore/detail/hunterio-email-finder/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Clearbit Connect', description: 'Enrich your CRM with accurate data from Clearbit.', icon: 'https://example.com/clearbit-icon.png', installLink: 'https://chrome.google.com/webstore/detail/clearbit-connect/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Streak', description: 'CRM built into Gmail for managing contacts and tracking emails.', icon: 'https://example.com/streak-icon.png', installLink: 'https://chrome.google.com/webstore/detail/streak-crm-for-gmail/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Mailtrack', description: 'Track email opens and clicks directly from Gmail.', icon: 'https://example.com/mailtrack-icon.png', installLink: 'https://chrome.google.com/webstore/detail/mailtrack/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Boomerang', description: 'Schedule emails and set reminders within Gmail.', icon: 'https://example.com/boomerang-icon.png', installLink: 'https://chrome.google.com/webstore/detail/boomerang-for-gmail/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Zapier', description: 'Automate tasks and integrate CRM with other apps.', icon: 'https://example.com/zapier-icon.png', installLink: 'https://chrome.google.com/webstore/detail/zapier/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Trello', description: 'Organize tasks and projects in boards, and integrate with CRM.', icon: 'https://example.com/trello-icon.png', installLink: 'https://chrome.google.com/webstore/detail/trello/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Slack', description: 'Communicate with your team and integrate CRM updates into Slack channels.', icon: 'https://example.com/slack-icon.png', installLink: 'https://chrome.google.com/webstore/detail/slack/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Google Analytics', description: 'Track website interactions and customer behavior.', icon: 'https://example.com/google-analytics-icon.png', installLink: 'https://chrome.google.com/webstore/detail/google-analytics/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'HubSpot CRM', description: 'Manage contacts, track deals, and analyze performance.', icon: 'https://example.com/hubspot-crm-icon.png', installLink: 'https://chrome.google.com/webstore/detail/hubspot-crm/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Zoho CRM', description: 'Access Zoho CRM data and manage leads and contacts.', icon: 'https://example.com/zoho-crm-icon.png', installLink: 'https://chrome.google.com/webstore/detail/zoho-crm/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'QuickBooks', description: 'Sync CRM data with QuickBooks for financial management.', icon: 'https://example.com/quickbooks-icon.png', installLink: 'https://chrome.google.com/webstore/detail/quickbooks/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Evernote Web Clipper', description: 'Clip web pages and save notes to organize information.', icon: 'https://example.com/evernote-web-clipper-icon.png', installLink: 'https://chrome.google.com/webstore/detail/evernote-web-clipper/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Grammarly', description: 'Ensure your emails and documents are error-free.', icon: 'https://example.com/grammarly-icon.png', installLink: 'https://chrome.google.com/webstore/detail/grammarly/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Evernote', description: 'Keep notes, to-dos, and manage CRM-related information.', icon: 'https://example.com/evernote-icon.png', installLink: 'https://chrome.google.com/webstore/detail/evernote/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'LastPass', description: 'Manage and secure your passwords for CRM and other tools.', icon: 'https://example.com/lastpass-icon.png', installLink: 'https://chrome.google.com/webstore/detail/lastpass/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'DocuSign', description: 'Sign documents electronically and integrate with CRM.', icon: 'https://example.com/docusign-icon.png', installLink: 'https://chrome.google.com/webstore/detail/docusign/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Google Drive', description: 'Store and share files, and integrate with CRM.', icon: 'https://example.com/google-drive-icon.png', installLink: 'https://chrome.google.com/webstore/detail/google-drive/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Dropbox', description: 'Sync and share files with your team, integrate with CRM.', icon: 'https://example.com/dropbox-icon.png', installLink: 'https://chrome.google.com/webstore/detail/dropbox/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Calendly', description: 'Schedule meetings and integrate with your CRM.', icon: 'https://example.com/calendly-icon.png', installLink: 'https://chrome.google.com/webstore/detail/calendly/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Asana', description: 'Track and manage tasks and projects, integrate with CRM.', icon: 'https://example.com/asana-icon.png', installLink: 'https://chrome.google.com/webstore/detail/asana/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'ClickUp', description: 'Manage tasks, projects, and goals, and sync with CRM.', icon: 'https://example.com/clickup-icon.png', installLink: 'https://chrome.google.com/webstore/detail/clickup/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Notion', description: 'Organize notes, tasks, and CRM-related information in one place.', icon: 'https://example.com/notion-icon.png', installLink: 'https://chrome.google.com/webstore/detail/notion/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'AeroLeads', description: 'Find email addresses and phone numbers for lead generation.', icon: 'https://example.com/aeroleads-icon.png', installLink: 'https://chrome.google.com/webstore/detail/aeroleads/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Outreach', description: 'Automate outreach and follow-ups with CRM integration.', icon: 'https://example.com/outreach-icon.png', installLink: 'https://chrome.google.com/webstore/detail/outreach/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Close.io', description: 'Manage sales and CRM interactions directly from your browser.', icon: 'https://example.com/closeio-icon.png', installLink: 'https://chrome.google.com/webstore/detail/closeio/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Freshsales', description: 'Manage leads, contacts, and sales activities with CRM.', icon: 'https://example.com/freshsales-icon.png', installLink: 'https://chrome.google.com/webstore/detail/freshsales/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Pipedrive', description: 'Sales CRM and pipeline management tool accessible from your browser.', icon: 'https://example.com/pipedrive-icon.png', installLink: 'https://chrome.google.com/webstore/detail/pipedrive/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'ActiveCampaign', description: 'Automate marketing and CRM activities to drive sales.', icon: 'https://example.com/activecampaign-icon.png', installLink: 'https://chrome.google.com/webstore/detail/activecampaign/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Intercom', description: 'Manage customer communications and support from your CRM.', icon: 'https://example.com/intercom-icon.png', installLink: 'https://chrome.google.com/webstore/detail/intercom/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Zendesk', description: 'Track and manage customer support tickets and interactions.', icon: 'https://example.com/zendesk-icon.png', installLink: 'https://chrome.google.com/webstore/detail/zendesk/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Chili Piper', description: 'Automate scheduling and lead routing with CRM integration.', icon: 'https://example.com/chili-piper-icon.png', installLink: 'https://chrome.google.com/webstore/detail/chili-piper/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Leadfeeder', description: 'Identify website visitors and enrich CRM data.', icon: 'https://example.com/leadfeeder-icon.png', installLink: 'https://chrome.google.com/webstore/detail/leadfeeder/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Vtiger CRM', description: 'Manage customer relationships and sales activities.', icon: 'https://example.com/vtiger-icon.png', installLink: 'https://chrome.google.com/webstore/detail/vtiger-crm/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'SalesLoft', description: 'Enhance sales engagement and CRM integration.', icon: 'https://example.com/salesloft-icon.png', installLink: 'https://chrome.google.com/webstore/detail/salesloft/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Apollo.io', description: 'Find and manage leads and CRM data with ease.', icon: 'https://example.com/apolloio-icon.png', installLink: 'https://chrome.google.com/webstore/detail/apolloio/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'CleverTap', description: 'Analyze and optimize customer interactions with CRM integration.', icon: 'https://example.com/clevertap-icon.png', installLink: 'https://chrome.google.com/webstore/detail/clevertap/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Klipfolio', description: 'Create dashboards and track CRM performance metrics.', icon: 'https://example.com/klipfolio-icon.png', installLink: 'https://chrome.google.com/webstore/detail/klipfolio/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Nimble', description: 'Manage contacts and social interactions with CRM integration.', icon: 'https://example.com/nimble-icon.png', installLink: 'https://chrome.google.com/webstore/detail/nimble/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'PipeDrive', description: 'Sales pipeline management tool accessible from your browser.', icon: 'https://example.com/pipedrive-icon.png', installLink: 'https://chrome.google.com/webstore/detail/pipedrive/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'GetResponse', description: 'Manage email marketing and integrate with CRM.', icon: 'https://example.com/getresponse-icon.png', installLink: 'https://chrome.google.com/webstore/detail/getresponse/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Mixmax', description: 'Enhance Gmail with CRM integrations and email tracking.', icon: 'https://example.com/mixmax-icon.png', installLink: 'https://chrome.google.com/webstore/detail/mixmax/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Gong.io', description: 'Analyze sales conversations and integrate insights into CRM.', icon: 'https://example.com/gongio-icon.png', installLink: 'https://chrome.google.com/webstore/detail/gongio/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Salesforce Inbox', description: 'Access Salesforce data directly from your email inbox.', icon: 'https://example.com/salesforce-inbox-icon.png', installLink: 'https://chrome.google.com/webstore/detail/salesforce-inbox/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'RingCentral', description: 'Integrate phone and video calls with your CRM.', icon: 'https://example.com/ringcentral-icon.png', installLink: 'https://chrome.google.com/webstore/detail/ringcentral/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'CallRail', description: 'Track and analyze phone call interactions with CRM data.', icon: 'https://example.com/callrail-icon.png', installLink: 'https://chrome.google.com/webstore/detail/callrail/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'HubSpot Email Tracking', description: 'Track email opens and interactions within HubSpot CRM.', icon: 'https://example.com/hubspot-email-tracking-icon.png', installLink: 'https://chrome.google.com/webstore/detail/hubspot-email-tracking/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'LinkedIn Lead Gen Forms', description: 'Capture leads directly from LinkedIn and sync with CRM.', icon: 'https://example.com/linkedin-lead-gen-forms-icon.png', installLink: 'https://chrome.google.com/webstore/detail/linkedin-lead-gen-forms/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Mailchimp', description: 'Automate email marketing and integrate with CRM.', icon: 'https://example.com/mailchimp-icon.png', installLink: 'https://chrome.google.com/webstore/detail/mailchimp/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Outreach.io', description: 'Automate and optimize sales outreach with CRM integration.', icon: 'https://example.com/outreachio-icon.png', installLink: 'https://chrome.google.com/webstore/detail/outreachio/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'EngageBay', description: 'Manage CRM, marketing, and sales activities from one place.', icon: 'https://example.com/engagebay-icon.png', installLink: 'https://chrome.google.com/webstore/detail/engagebay/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Keap', description: 'Automate CRM tasks and manage client relationships.', icon: 'https://example.com/keap-icon.png', installLink: 'https://chrome.google.com/webstore/detail/keap/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Drip', description: 'Automate marketing and sales tasks with CRM integration.', icon: 'https://example.com/drip-icon.png', installLink: 'https://chrome.google.com/webstore/detail/drip/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'AWeber', description: 'Email marketing automation integrated with CRM.', icon: 'https://example.com/aweber-icon.png', installLink: 'https://chrome.google.com/webstore/detail/aweber/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'ConvertKit', description: 'Email marketing and CRM integration for content creators.', icon: 'https://example.com/convertkit-icon.png', installLink: 'https://chrome.google.com/webstore/detail/convertkit/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'HubSpot Marketing', description: 'Manage marketing campaigns and sync with CRM.', icon: 'https://example.com/hubspot-marketing-icon.png', installLink: 'https://chrome.google.com/webstore/detail/hubspot-marketing/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Zoho Campaigns', description: 'Automate email campaigns and integrate with Zoho CRM.', icon: 'https://example.com/zoho-campaigns-icon.png', installLink: 'https://chrome.google.com/webstore/detail/zoho-campaigns/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'ActiveTrail', description: 'Automate email marketing and manage CRM data.', icon: 'https://example.com/activetrail-icon.png', installLink: 'https://chrome.google.com/webstore/detail/activetrail/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Sendinblue', description: 'Manage email marketing and CRM tasks from your browser.', icon: 'https://example.com/sendinblue-icon.png', installLink: 'https://chrome.google.com/webstore/detail/sendinblue/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Ontraport', description: 'Automate CRM and marketing tasks for better client management.', icon: 'https://example.com/ontraport-icon.png', installLink: 'https://chrome.google.com/webstore/detail/ontraport/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Pipeliner CRM', description: 'Visual CRM tool for managing sales pipelines and client relationships.', icon: 'https://example.com/pipeliner-crm-icon.png', installLink: 'https://chrome.google.com/webstore/detail/pipeliner-crm/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Salesmate', description: 'CRM and sales automation tool for managing customer interactions.', icon: 'https://example.com/salesmate-icon.png', installLink: 'https://chrome.google.com/webstore/detail/salesmate/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
  { name: 'Salesforce Lightning', description: 'Access Salesforce Lightning features directly from your browser.', icon: 'https://example.com/salesforce-lightning-icon.png', installLink: 'https://chrome.google.com/webstore/detail/salesforce-lightning/ljfoeoikfnjbpfmknjbmjilcjncocpjj' },
];

export default function Marketplace() {
  const [installedExtensions, setInstalledExtensions] = useState(() => {
    // Load installed extensions from local storage
    const storedExtensions = JSON.parse(localStorage.getItem('installedExtensions')) || [];
    return storedExtensions;
  });

  useEffect(() => {
    // Update local storage whenever installedExtensions changes
    localStorage.setItem('installedExtensions', JSON.stringify(installedExtensions));
  }, [installedExtensions]);

  const handleInstall = (name, link) => {
    // Add extension to local storage and state
    if (!installedExtensions.includes(name)) {
      setInstalledExtensions([...installedExtensions, name]);
      window.open(link, '_blank'); // Open installation link
    }
  };

  const handleUninstall = (name) => {
    // Remove extension from local storage and state
    setInstalledExtensions(installedExtensions.filter(ext => ext !== name));
  };

  return (
    <div className="content">
      <Typography variant="h4" className="mtitle">
        CRM Marketplace Extensions
      </Typography>
      <Grid container spacing={2} className="mgridContainer">
        {extensions.map((extension, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="mcard">
              <CardContent>
                <img src={extension.icon} alt={`${extension.name} icon`} className="mextensionIcon" />
                <Typography variant="h6">{extension.name}</Typography>
                <Typography variant="body2" style={{ color: 'wheat' }}>{extension.description}</Typography>
                {installedExtensions.includes(extension.name) ? (
                  <button className="mbutton uninstall" onClick={() => handleUninstall(extension.name)}>
                    Uninstall
                  </button>
                ) : (
                  <button className="mbutton" onClick={() => handleInstall(extension.name, extension.installLink)}>
                    Install
                  </button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
