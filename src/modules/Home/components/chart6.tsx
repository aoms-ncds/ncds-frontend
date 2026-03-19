/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApexCharts from 'apexcharts';
import { useEffect } from 'react';


const CHART6 = () => {
  const options = {
    series: [{
      name: 'Sessions',
      data: [414, 555, 257, 901, 613, 727, 414, 555, 257],
    }],
    chart: {
      type: 'area',
      height: 60,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
        top: 3,
        left: 14,
        blur: 4,
        opacity: 0.12,
        color: '#17a00e',
      },
      sparkline: {
        enabled: true,
      },
    },
    markers: {
      size: 0,
      colors: ['#17a00e'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 3,
      // curve: 'smooth'
    },
    colors: ['#17a00e'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function(seriesName: any) {
            return '';
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };


  useEffect(() => {
    const chart = new ApexCharts(document.querySelector('#chart6'), options);
    chart.render();
  }, []);
  return (
    <div id="chart6"></div>
  );
};

export default CHART6;
