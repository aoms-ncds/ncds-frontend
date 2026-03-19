/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApexCharts from 'apexcharts';
import { useEffect } from 'react';


const CHART4 = () => {
  const options = {
    series: [{
      name: 'Bounce Rate',
      data: [414, 555, 257, 901, 613, 727, 414, 555, 257],
    }],
    chart: {
      type: 'bar',
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
        color: '#0dcaf0',
      },
      sparkline: {
        enabled: true,
      },
    },
    markers: {
      size: 0,
      colors: ['#0dcaf0'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2.4,
      curve: 'smooth',
    },
    colors: ['#0dcaf0'],
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
          formatter: function(seriesName : any) {
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
    const chart = new ApexCharts(document.querySelector('#chart4'), options);
    chart.render();
  }, []);
  return (
    <div id="chart4"></div>
  );
};

export default CHART4;
