import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { getGraphicElements } from './chartGraphic';

const FunnelChart = () => {
  const chartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  //isError belum dihandle

  const rawData = [
    { name: 'F0', value: 249, color: '#f0fdf4' },
    { name: 'F1', value: 167, color: '#ccf3d5' },
    { name: 'F2', value: 143, color: '#a8e9b6' },
    { name: 'F3', value: 128, color: '#85dfa0' },
    { name: 'F4', value: 102, color: '#66d48a' },
    { name: 'F5', value: 72, color: '#4cca72' },

  ];

  const textData = [
    { top: 60, text: 'Customer Internal Review: ...\n\nDrop: …' },
    { top: 132, text: 'Scheduled for / OGP POC: ...\n\nDrop: …' },
    { top: 200, text: 'Scheduled for / OGP JPS: ...\n\nDrop: …' },
    { top: 265, text: 'OGP Contract Development: ...\nOGP Legal Review:\nDrop: …' },
    { top: 350, text: 'OGP Agreement: …' },
    { top: 402, text: 'OGP Integration: ...\n\nOGP Fulfillment: …' }
  ]

  const textHeader = [
    { left:"38%" , text: "Activity"},
    { left:"55%" , text: "Volume Commitment"},
    { left:"80%" , text: "Potential Revenue(Rp)"}
  ]

  const lineTops = [114, 182, 250, 318, 386, 452];

  useEffect(() => {
    let chartInstance = null;

    const initChart = () => {
      try {
        if (!chartRef.current) return;

        chartInstance = echarts.init(chartRef.current);

        const option = {
          graphic: getGraphicElements(textData, lineTops, textHeader),
          title: {
            text: 'Funnel Chart',
            left: '8%',
            top: 0,
            textStyle: {
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '({d}%)'
          },
          series: [
            {
              name: 'Funnel',
              type: 'funnel',
              left: '0%',
              top: '10%',
              width: '30%',
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

        // Mark as loaded
        setIsLoading(false);
        setIsError(false);

      } catch (error) {
        console.error('Error initializing chart:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    setTimeout(() => initChart(), 500)
  }, []);

  return (
    <div className="">
      <div
        ref={chartRef}
        className=""
        style={{ minHeight: '85vh' }}
      />
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

    </div>
  );
};

export default FunnelChart;