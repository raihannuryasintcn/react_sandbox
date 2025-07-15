import React from 'react';
import ReactECharts from 'echarts-for-react';

function MarketShareComponent() {
    const option = {
      title: {
        text: 'Market Share FTTH',
        subtext: '2025',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: '0%',
        left: 'center',
      },
      series: [
        {
          name: 'Users',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 54.2, name: 'IndiHome' },
            { value: 3.2, name: 'First Media' },
            { value: 2.9, name: 'MyRepublic' },
            { value: 2.7, name: 'ICONNET' },
            { value: 2.5, name: 'Vision' },
            { value: 2.3, name: 'Biznet Home' },
            { value: 1.5, name: 'CBN Fiber' },
            { value: 1.5, name: 'XL Home' },
            { value: 29, name: 'Others' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  
    return <ReactECharts option={option} style={{ height: '400px' }} />;
  }
  
  export default Ma;