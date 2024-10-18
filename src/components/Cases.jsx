import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for diseases and states
const data = [
  { state: 'Maharashtra', CoronaryArteryDisease: 230, Stroke: 90, Type2Diabetes: 300, Type1Diabetes: 120, COPD: 80, Asthma: 110, BreastCancer: 50, LungCancer: 45, ParkinsonsDisease: 60, AlzheimersDisease: 40 },
  { state: 'Gujarat', CoronaryArteryDisease: 210, Stroke: 80, Type2Diabetes: 270, Type1Diabetes: 110, COPD: 70, Asthma: 100, BreastCancer: 45, LungCancer: 40, ParkinsonsDisease: 55, AlzheimersDisease: 35 },
  { state: 'Karnataka', CoronaryArteryDisease: 250, Stroke: 100, Type2Diabetes: 320, Type1Diabetes: 130, COPD: 90, Asthma: 120, BreastCancer: 60, LungCancer: 50, ParkinsonsDisease: 70, AlzheimersDisease: 50 },
  { state: 'Tamil Nadu', CoronaryArteryDisease: 200, Stroke: 85, Type2Diabetes: 280, Type1Diabetes: 115, COPD: 75, Asthma: 95, BreastCancer: 55, LungCancer: 48, ParkinsonsDisease: 65, AlzheimersDisease: 45 },
  { state: 'Rajasthan', CoronaryArteryDisease: 190, Stroke: 75, Type2Diabetes: 250, Type1Diabetes: 100, COPD: 60, Asthma: 85, BreastCancer: 50, LungCancer: 43, ParkinsonsDisease: 58, AlzheimersDisease: 40 },
  { state: 'Punjab', CoronaryArteryDisease: 180, Stroke: 70, Type2Diabetes: 240, Type1Diabetes: 95, COPD: 55, Asthma: 80, BreastCancer: 47, LungCancer: 42, ParkinsonsDisease: 57, AlzheimersDisease: 38 },
  { state: 'West Bengal', CoronaryArteryDisease: 170, Stroke: 65, Type2Diabetes: 230, Type1Diabetes: 90, COPD: 50, Asthma: 75, BreastCancer: 48, LungCancer: 44, ParkinsonsDisease: 59, AlzheimersDisease: 39 },
  { state: 'Uttar Pradesh', CoronaryArteryDisease: 160, Stroke: 60, Type2Diabetes: 220, Type1Diabetes: 85, COPD: 45, Asthma: 70, BreastCancer: 46, LungCancer: 41, ParkinsonsDisease: 56, AlzheimersDisease: 36 },
  { state: 'Bihar', CoronaryArteryDisease: 150, Stroke: 55, Type2Diabetes: 210, Type1Diabetes: 80, COPD: 40, Asthma: 65, BreastCancer: 44, LungCancer: 40, ParkinsonsDisease: 55, AlzheimersDisease: 35 },
  { state: 'Madhya Pradesh', CoronaryArteryDisease: 140, Stroke: 50, Type2Diabetes: 200, Type1Diabetes: 75, COPD: 35, Asthma: 60, BreastCancer: 42, LungCancer: 38, ParkinsonsDisease: 52, AlzheimersDisease: 32 }
];

const Case = () => {
  return (
    <div className="pt-14">
      {/* Updated heading with alignment */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-4xl font-bold">Cases</h2>
        <p className="mt-2 text-lg">Diseases in Indian States</p>
      </div>
      
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} margin={{ top: 50, right: 50, bottom: 50, left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CoronaryArteryDisease" stroke="#8884d8" />
          <Line type="monotone" dataKey="Stroke" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Type2Diabetes" stroke="#ff7300" />
          <Line type="monotone" dataKey="Type1Diabetes" stroke="#1f77b4" />
          <Line type="monotone" dataKey="COPD" stroke="#d62728" />
          <Line type="monotone" dataKey="Asthma" stroke="#9467bd" />
          <Line type="monotone" dataKey="BreastCancer" stroke="#8c564b" />
          <Line type="monotone" dataKey="LungCancer" stroke="#e377c2" />
          <Line type="monotone" dataKey="ParkinsonsDisease" stroke="#7f7f7f" />
          <Line type="monotone" dataKey="AlzheimersDisease" stroke="#bcbd22" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Case;
