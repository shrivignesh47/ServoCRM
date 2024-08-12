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
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, LineChart, Line, RadarChart, Radar, ScatterChart, Scatter, AreaChart, Area, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { HelpOutline as HelpIcon } from '@mui/icons-material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#6a0dad', '#008000', '#800080', '#FFD700', '#FF4500'];

const PowerBi: React.FC = () => {
  const [excelData, setExcelData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedChartType, setSelectedChartType] = useState<string>('Pie');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
          setSelectedColumns((jsonData as any[])[0] || []);
          generateChartData(jsonData as any[], (jsonData as any[])[0] || []);
        } else {
          setError('File reading failed. Expected ArrayBuffer, got something else.');
        }
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const generateChartData = (data: any[], headers: string[]) => {
    if (data.length > 1) {
      const rows = data.slice(1);
      const barChartData = rows.map((row: any[]) => {
        const obj: any = {};
        headers.forEach((header, i) => {
          obj[header] = row[i];
        });
        return obj;
      });
      setChartData(barChartData);
    }
  };

  const handleColumnSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedCols = event.target.value as string[];
    setSelectedColumns(selectedCols);
    generateChartData(excelData, selectedCols);
  };

  const handleChartTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedChartType(event.target.value as string);
  };

  const renderCharts = () => {
    if (!chartData.length || !Object.keys(chartData[0]).length) {
      return <Typography variant="h6">No data available for charts</Typography>;
    }

    const dataKey1 = Object.keys(chartData[0])[0];
    const dataKey2 = Object.keys(chartData[0])[1];

    return (
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Pie Chart"
              action={
                <Tooltip title="A Pie chart represents data in a circular format. Each segment represents a proportion of the whole.">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <PieChart width={500} height={400}>
                <Pie
                  data={chartData}
                  dataKey={dataKey2}
                  nameKey={dataKey1}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Bar Chart"
              action={
                <Tooltip title="A Bar chart shows data with rectangular bars. The length of each bar represents the value of the data.">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <BarChart width={500} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dataKey1} />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey={dataKey2} fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Line Chart"
              action={
                <Tooltip title="A Line chart displays information as a series of data points connected by straight line segments.">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <LineChart width={500} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dataKey1} />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey={dataKey2} stroke="#8884d8" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Radar Chart"
              action={
                <Tooltip title="A Radar chart displays data on a 2D plane with multiple axes starting from the same point.">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <RadarChart outerRadius={150} width={500} height={400} data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey={dataKey1} />
                <PolarRadiusAxis />
                <Radar name={dataKey1} dataKey={dataKey2} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Scatter Chart"
              action={
                <Tooltip title="A Scatter chart shows data points plotted on a horizontal and vertical axis to determine relationships.">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <ScatterChart width={500} height={400} data={chartData}>
                <CartesianGrid />
                <XAxis dataKey={dataKey1} name="X Axis" />
                <YAxis dataKey={dataKey2} name="Y Axis" />
                <RechartsTooltip />
                <Scatter name="Scatter" data={chartData} fill="#8884d8" />
              </ScatterChart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Area Chart"
              action={
                <Tooltip title="An Area chart shows quantitative data with the area under the line filled in.">
                  <IconButton>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <AreaChart width={500} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dataKey1} />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey={dataKey2} stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className='main-content'>
<div className='content' >
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
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
      <div style={{ marginTop: '20px' }}>
        {renderCharts()}
      </div>
    </div>
        </div>
        </div>
  );
};


export default PowerBi;

