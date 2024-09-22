// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { Grid, Typography, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';

// const PowerBi = () => {
//   const [excelData, setExcelData] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [chartType, setChartType] = useState('pie');
//   const [collapsed, setCollapsed] = useState(false);
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const result = e.target.result;
//       if (result instanceof ArrayBuffer) {  // Type check
//         const data = new Uint8Array(result);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
//         setExcelData(jsonData);
//         generateChartData(jsonData);
//       } else {
//         console.error('File reading failed. Expected ArrayBuffer, got something else.');
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const generateChartData = (data) => {
//     if (data.length > 1) {
//       const headers = data[0];
//       const rows = data.slice(1);

//       const barChartData = rows.map((row) => {
//         const obj = {};
//         headers.forEach((header, i) => {
//           obj[header] = row[i];
//         });
//         return obj;
//       });

//       setChartData(barChartData);
//     }
//   };

//   const renderCharts = () => {
//     if (!chartData.length || !Object.keys(chartData[0]).length) {
//       return <Typography variant="h6">No data available for charts</Typography>;
//     }

//     const dataKey1 = Object.keys(chartData[0])[0];
//     const dataKey2 = Object.keys(chartData[0])[1];

//     if (chartType === 'pie') {
//       return (
//         <PieChart width={400} height={400}>
//           <Pie
//             data={chartData}
//             dataKey={dataKey2}
//             nameKey={dataKey1}
//             cx="50%"
//             cy="50%"
//             outerRadius={80}
//             fill="#8884d8"
//             label
//           >
//             {chartData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       );
//     } else if (chartType === 'bar') {
//       return (
//         <BarChart
//           width={500}
//           height={300}
//           data={chartData}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={dataKey1} />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey={dataKey2} fill="#8884d8" />
//         </BarChart>
//       );
//     } else {
//       return <Typography variant="h6">Select a valid chart type</Typography>;
//     }
//   };

//   return (
//     <div className={`main-content ${collapsed ? 'collapsed' : ''}`} style={{ padding: '-1px' }}>
//       <div className={`content ${collapsed ? 'collapsed' : ''}`}>
//         <Typography variant="h4" gutterBottom>
//           Excel Data Visualization
//         </Typography>
//         <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        
//         <FormControl fullWidth style={{ marginTop: '20px' }}>
//           <InputLabel>Chart Type</InputLabel>
//           <Select
//             value={chartType}
//             onChange={(e) => setChartType(e.target.value)}
//             label="Chart Type"
//           >
//             <MenuItem value="pie">Pie Chart</MenuItem>
//             <MenuItem value="bar">Bar Chart</MenuItem>
//           </Select>
//         </FormControl>

//         {renderCharts()}

//         <Button
//           onClick={() => setCollapsed(!collapsed)}
//           style={{ marginTop: '20px' }}
//         >
//           {collapsed ? 'Expand' : 'Collapse'}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PowerBi;


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  RadarChart,
  Radar,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { HelpOutline as HelpIcon } from '@mui/icons-material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#6a0dad', '#008000', '#800080', '#FFD700', '#FF4500'];

const chartTypes = ['Pie', 'Bar', 'Line', 'Area', 'Scatter', 'Radar'];

const ExcelToDashboard: React.FC = () => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChartType, setSelectedChartType] = useState<string>('Bar');
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result instanceof ArrayBuffer) {
          const data = new Uint8Array(result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          setExcelData(jsonData as any[]);
          generateChartData(jsonData as any[]);
        } else {
          setError('File reading failed. Expected ArrayBuffer, got something else.');
        }
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const summarizeData = (data: any[]): any => {
    // Example of summarizing data: calculate averages for numeric fields
    const headers = Object.keys(data[0] || {});
    const summary = headers.reduce((acc: any, header: string) => {
      const values = data.map(row => row[header]).filter(value => typeof value === 'number');
      if (values.length > 0) {
        const average = values.reduce((sum: number, value: number) => sum + value, 0) / values.length;
        acc[header] = average;
      }
      return acc;
    }, {});
    return summary;
  };

  // const analyzeDataWithAI = async (data: any[]) => {
  //   setIsAnalyzing(true);
  //   const summarizedData = summarizeData(data);

  //   try {
  //     const response = await axios.post(
  //       'https://servocrm.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview',
  //       {
  //         messages: [
  //           {
  //             role: 'system',
  //             content: 'You are an expert data analyst. Provide insights based on the summarized data below.',
  //           },
  //           {
  //             role: 'user',
  //             content: `Analyze this summarized data and provide a Detailed report neat and clean : ${JSON.stringify(summarizedData)}`
  //           }
  //         ] 
  //       },
  //       {
  //         headers: {
  //           'api-key': '9351ca19204e49a09ddb691f79867420',
  //           'Content-Type': 'application/json',
  //         }
          
  //       }
  //     );
  //     const reportContent = response.data.choices[0]?.message?.content;
  //     setReport(reportContent || 'No report available.');
  //   } catch (error) {
  //     console.error('Error fetching AI analysis:', error);
  //     setError('Error analyzing data with AI.');
  //   } finally {
  //     setIsAnalyzing(false);
  //   }
  // };
  const analyzeDataWithAI = async (data: any[]) => {
    setIsAnalyzing(true);
    const summarizedData = summarizeData(data);
    const retryLimit = 3;
    let attempts = 0;
  
    while (attempts < retryLimit) {
      try {
        const response = await axios.post(
          'https://servocrm.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-02-15-preview',
          {
            messages: [
              {
                role: 'system',
                content: 'You are an expert data analyst. Provide insights based on the summarized data below.',
              },
              {
                role: 'user',
                content: `Analyze this summarized data and provide a report: ${JSON.stringify(summarizedData)}`
              }
            ]
          },
          {
            headers: {
              'api-key': '9351ca19204e49a09ddb691f79867420',
              'Content-Type': 'application/json',
            },
            timeout: 120000 
          }
        );
        const reportContent = response.data.choices[0]?.message?.content;
        setReport(reportContent || 'No report available.');
        break; 
      } catch (error) {
        attempts++;
        console.error(`Error fetching AI analysis (attempt ${attempts}):`, error);
        if (attempts >= retryLimit) {
          setError('Error analyzing data with AI after multiple attempts.');
        }
      }
    }
    setIsAnalyzing(false);
  };
  
  const generateChartData = (data: any[]) => {
    if (data.length > 1) {
      const headers = data[0]; // First row as headers
      const rows = data.slice(1); // Remaining rows as data

      const formattedData = rows.map((row: any[]) => {
        const rowData: any = {};
        headers.forEach((header: string, index: number) => {
          rowData[header] = row[index];
        });
        return rowData;
      });
      setChartData(formattedData);
      analyzeDataWithAI(formattedData);
    }
  };

  const renderChart = (header: string, chartType: string) => {
    const commonProps = {
      width: 400,
      height: 400,
      data: chartData,
    };

    switch (chartType) {
      case 'Bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(chartData[0])[0]} />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey={header} fill="#8884d8" />
          </BarChart>
        );
        case 'Pie':
          return (
            <PieChart {...commonProps}>
              <Pie
                dataKey={header}
                nameKey={Object.keys(chartData[0])[0]}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          );
      case 'Line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(chartData[0])[0]} />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line type="monotone" dataKey={header} stroke="#8884d8" />
          </LineChart>
        );
      case 'Area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(chartData[0])[0]} />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Area type="monotone" dataKey={header} stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        );
      case 'Scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid />
            <XAxis dataKey={Object.keys(chartData[0])[0]} />
            <YAxis />
            <RechartsTooltip />
            <Scatter dataKey={header} fill="#8884d8" />
          </ScatterChart>
        );
      case 'Radar':
        return (
          <RadarChart {...commonProps}>
            <PolarGrid />
            <PolarAngleAxis dataKey={Object.keys(chartData[0])[0]} />
            <PolarRadiusAxis />
            <Radar name={header} dataKey={header} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        );
      default:
        return <Typography variant="h6" style={{color:'#d3e3fdb3'}}>Unsupported chart type</Typography>;
    }
  };

  const renderCharts = () => {
    if (!chartData.length || !Object.keys(chartData[0]).length) {
      return <Typography variant="h6" style={{color:'#d3e3fdb3'}}>No data available for charts</Typography>;
    }

    const headers = Object.keys(chartData[0]);

    return (
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {headers.map((header, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card  style={{backgroundColor:'#162c46'}}>
              <CardHeader 
                title={`${header} Chart`}
                action={
                  <Tooltip title={`Displays data for ${header} in a chart format`}>
                    <IconButton>
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
              <Divider />
              <CardContent  style={{backgroundColor:'#162c46'}}>
                <FormControl fullWidth style={{ marginBottom: '20px' }}>
                  <InputLabel style={{color:'#d3e3fdb3'}}>Chart Type</InputLabel>
                  <Select
                    value={selectedChartType}
                    onChange={(e) => setSelectedChartType(e.target.value as string)}
                  >
                    {chartTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {renderChart(header, selectedChartType)}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div className='main-content'>
      <div className='content'>
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" style={{color:'#d3e3fdb3'}} gutterBottom>
            Excel to Dashboard
          </Typography>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ marginBottom: '20px' }}
          />
          {loading && <CircularProgress />}
          {error && <Typography color="error">Error: {error}</Typography>}
          {report && (
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor:'#162c46' }}>
              <Typography variant="h6" style={{color:'#d3e3fdb3'}}>AI Analysis Report</Typography>
              <Typography variant="body1"  style={{color:'wheat'}}>{report}</Typography>
            </div>
          )}
          {isAnalyzing && <CircularProgress />}
          <div style={{ marginTop: '20px' }}>
            {renderCharts()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelToDashboard;
