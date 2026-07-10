import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#60a5fa', '#93c5fd', '#3b82f6', '#818cf8', '#a78bfa', '#38bdf8'];

const SubjectChart = ({ data, SUBJECTS }) => {
  const [chartType, setChartType] = useState('bar');

  const subjectData = useMemo(() => {
    const counts = SUBJECTS.reduce((acc, s) => ({ ...acc, [s]: 0 }), {});
    data.forEach(book => {
      if (counts[book.subject] !== undefined) counts[book.subject] += 1;
    });
    return SUBJECTS.map(s => ({
      subject: s.charAt(0).toUpperCase() + s.slice(1),
      count: counts[s]
    }));
  }, [data, SUBJECTS]);

  const topSubject = useMemo(() => {
    if (subjectData.length === 0) return null;
    return subjectData.reduce((max, curr) => (curr.count > max.count ? curr : max), subjectData[0]);
  }, [subjectData]);

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3>Books by Subject</h3>
        <div className="chart-toggle">
          <button
            className={`chart-toggle-btn${chartType === 'bar' ? ' active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            Bar
          </button>
          <button
            className={`chart-toggle-btn${chartType === 'pie' ? ' active' : ''}`}
            onClick={() => setChartType('pie')}
          >
            Pie
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        {chartType === 'bar' ? (
          <BarChart data={subjectData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="subject" stroke="#e4f0ff" fontSize={12} />
            <YAxis stroke="#e4f0ff" fontSize={12} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {subjectData.map((entry, index) => (
                <Cell key={entry.subject} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={subjectData}
              dataKey="count"
              nameKey="subject"
              cx="50%"
              cy="50%"
              outerRadius={95}
              label={({ subject, percent }) => `${subject} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {subjectData.map((entry, index) => (
                <Cell key={entry.subject} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#e4f0ff' }} />
          </PieChart>
        )}
      </ResponsiveContainer>

      {topSubject && topSubject.count > 0 && (
        <p className="chart-annotation">
          <strong>{topSubject.subject}</strong> is currently the largest category in your filtered
          selection, with {topSubject.count} of {data.length} matching books. Try narrowing the
          Subject filter to compare categories more directly.
        </p>
      )}
    </div>
  );
};

export default SubjectChart;