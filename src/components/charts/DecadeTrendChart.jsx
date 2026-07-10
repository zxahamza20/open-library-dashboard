import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip
} from 'recharts';

const DecadeTrendChart = ({ data }) => {
  const [chartType, setChartType] = useState('line');

  const decadeData = useMemo(() => {
    const buckets = {};

    data.forEach(book => {
      if (book.pages === null) return; 
      const decade = Math.floor(book.publishYear / 10) * 10;
      if (!buckets[decade]) buckets[decade] = { totalPages: 0, count: 0 };
      buckets[decade].totalPages += book.pages;
      buckets[decade].count += 1;
    });

    return Object.keys(buckets)
      .map(Number)
      .filter(decade => buckets[decade].count >= 2) 
      .sort((a, b) => a - b)
      .map(decade => ({
        decade: `${decade}s`,
        avgPages: Math.round(buckets[decade].totalPages / buckets[decade].count),
        count: buckets[decade].count
      }));
  }, [data]);

  const peakDecade = useMemo(() => {
    if (decadeData.length === 0) return null;
    return decadeData.reduce((max, curr) => (curr.avgPages > max.avgPages ? curr : max), decadeData[0]);
  }, [decadeData]);

  const lowDecade = useMemo(() => {
    if (decadeData.length < 2) return null;
    return decadeData.reduce((min, curr) => (curr.avgPages < min.avgPages ? curr : min), decadeData[0]);
  }, [decadeData]);

  const overallAvgPages = useMemo(() => {
    if (decadeData.length === 0) return null;
    const totalPages = decadeData.reduce((sum, d) => sum + d.avgPages * d.count, 0);
    const totalCount = decadeData.reduce((sum, d) => sum + d.count, 0);
    return totalCount > 0 ? Math.round(totalPages / totalCount) : null;
  }, [decadeData]);

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3>Average Page Length by Decade</h3>
        <div className="chart-toggle">
          <button
            className={`chart-toggle-btn${chartType === 'line' ? ' active' : ''}`}
            onClick={() => setChartType('line')}
          >
            Line
          </button>
          <button
            className={`chart-toggle-btn${chartType === 'bar' ? ' active' : ''}`}
            onClick={() => setChartType('bar')}
          >
            Bar
          </button>
        </div>
      </div>

      {decadeData.length === 0 ? (
        <p className="chart-empty">Not enough decade-level data in this selection to chart a trend.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={280}>
            {chartType === 'line' ? (
              <LineChart data={decadeData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="decade" stroke="#e4f0ff" fontSize={12} />
                <YAxis stroke="#e4f0ff" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="avgPages" stroke="#60a5fa" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            ) : (
              <BarChart data={decadeData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="decade" stroke="#e4f0ff" fontSize={12} />
                <YAxis stroke="#e4f0ff" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="avgPages" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>

          {peakDecade && (
            <div className="chart-stat-row">
              <div className="chart-stat">
                <span className="chart-stat-label">Longest average</span>
                <span className="chart-stat-value">{peakDecade.decade}</span>
                <span className="chart-stat-sub">{peakDecade.avgPages} pages ({peakDecade.count} books)</span>
              </div>
              {lowDecade && (
                <div className="chart-stat">
                  <span className="chart-stat-label">Shortest average</span>
                  <span className="chart-stat-value">{lowDecade.decade}</span>
                  <span className="chart-stat-sub">{lowDecade.avgPages} pages ({lowDecade.count} books)</span>
                </div>
              )}
              {overallAvgPages !== null && (
                <div className="chart-stat">
                  <span className="chart-stat-label">Overall average</span>
                  <span className="chart-stat-value">{overallAvgPages}</span>
                  <span className="chart-stat-sub">pages, across all decades shown</span>
                </div>
              )}
            </div>
          )}
          <p className="chart-footnote">
            Decades with fewer than 2 matching books are excluded to avoid noisy single-book averages.
          </p>
        </>
      )}
    </div>
  );
};

export default DecadeTrendChart;