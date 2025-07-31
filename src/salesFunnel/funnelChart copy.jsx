import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const FunnelChart = () => {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const rawData = [
    { name: 'F0', value: 249, color: '#f0fdf4' },
    { name: 'F1', value: 167, color: '#ccf3d5' },
    { name: 'F2', value: 143, color: '#a8e9b6' },
    { name: 'F3', value: 128, color: '#85dfa0' },
    { name: 'F4', value: 102, color: '#66d48a' },
    { name: 'F5', value: 72, color: '#4cca72' },
    { name: 'Delivery', value: 45, color: '#34be61' },
    { name: 'BillCo', value: 0, color: '#28b158' },
    { name: 'Assurance', value: 0, color: '#1da44f' },
  ];

  useEffect(() => {
    let chartInstance = null;
    let timeoutId = null;

    const initChart = () => {
      try {
        if (!chartRef.current) return;

        chartInstance = echarts.init(chartRef.current);

        const option = {
          title: {
            text: 'Actual Funnel Chart',
            left: 'center',
            top: 0,
            textStyle: {
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: 'Funnel',
              type: 'funnel',
              left: '10%',
              top: '10%',
              width: '80%',
              height: '80%',
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'inside',
                fontSize: 14,
                color: '#333',
                fontWeight: 'bold',
                formatter: '{b} ({c})' // {b} = name, {c} = value
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#808080ff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 16
                }
              },
              data: rawData.map(item => ({
                value: item.value,
                name: item.name,
                itemStyle: {
                  color: item.color
                }
              }))
            }
          ]
        };

        chartInstance.setOption(option);

        // Handle resize
        const handleResize = () => {
          if (chartInstance) {
            chartInstance.resize();
          }
        };

        window.addEventListener('resize', handleResize);

        // Mark as loaded
        setIsLoading(false);
        setIsError(false);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (chartInstance) {
            chartInstance.dispose();
          }
        };
      } catch (error) {
        console.error('Error initializing chart:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    // Add timeout delay for chart initialization
    timeoutId = setTimeout(() => {
      initChart();
    }, 50); // 500ms delay

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, []);

  return (
    <div className="">
      <div
        ref={chartRef}
        className=""
        style={{ minHeight: '70vh' }}
      />

      {/* Legend */}
      <div className="grid grid-cols-4 gap-3">
        {rawData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded border border-gray-400"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-gray-600">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelChart;