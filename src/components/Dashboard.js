import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import gradient from 'chartjs-plugin-gradient';
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
ChartJS.register(
   [ LineElement, CategoryScale, LinearScale, PointElement, Filler, annotationPlugin, gradient]
)

function Dashboard() {
    const chartdata=[50, 20, 30, 42, 51, 82];
    const [data, setData]= useState({
        labels:["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"],
        datasets:[{
            data:chartdata,
            borderColor:'#0085FF',
            tension:0.6,
            // backgroundColor: 'rgba(16, 140, 255,0.2)',
            fill:true,
            gradient: {
                backgroundColor: {
                    axis: 'y',
                    colors: {
                      0: 'rgba(255, 255, 255,0.2)',
                      100: 'rgba(0, 133, 255,0.2)'
                    }
                },          
            }
        }]
    })

    const options = {
        legend: { display: false },
        title: { display: false },
        elements: {
            point:{
                radius: 0
            }
        },
        responsive: true,
        scales: {
            y: {
                position:"right",
                grid:{
                    drawTicks:false
                },
                ticks:{
                    beginAtZero:true,
                    // color: 'red',
                    callback: (value, index) => {
                        return Math.abs(value) > 999 ? Math.sign(value)*((Math.abs(value)/1000).toFixed(1)) + 'k' : Math.sign(value)*Math.abs(value)
                    },
                    color:function(index){
                        if(index.index %2===0)
                            return '#ffffff'
                    }
                }
             },
            x:{
                grid:{
                    drawTicks:false,
                    borderDash: [8, 4]
                }
            }
        },
        plugins: {
            annotation: {
              annotations: {
                line1: {
                    type: "line",
                    scaleID: "y",
                    borderWidth: 1,
                    borderColor: "#fb923c",
                    borderDash: [6, 4],
                    value: (data.datasets[0].data.reduce((a, b) => a + b, 0))/data.datasets[0].data.length,
                    label: {
                        position: "end",
                        // yAdjust: -20,
                        backgroundColor: "#fb923c",
                        content: "AVG",
                        enabled: true
                      },
                  }
              }
            }
          }
    };

    function changeChart(e) {
        e.preventDefault();
        let tabs = document.getElementById('chartTab').getElementsByTagName('p')
        for (let i = 0; i <= tabs.length - 1; i++) {
            tabs[i].style.backgroundColor='#ffffff'
        }
        document.getElementById(e.target.id).style.backgroundColor='#e7e5e4'
        if(e.target.id === "day"){
            setData({
                labels:["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM"],
                datasets: [
                  {
                    data:[50, 20, 30, 42, 51, 82],
                  }
                ],
              })
        } else if(e.target.id === "week"){
            setData({
                labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets: [
                  {
                    data:[5, 20, 50, 42, 80, 82,20],
                  }
                ],
              })
        } else if(e.target.id === "month"){
            setData({
                labels:['January', 'February', 'March', 'April','May'],
                datasets: [
                  {
                    data:[50, 20, 30, 42, 51, 82],
                  }
                ],
              })
        }
      }
    return (
        <>
            <div className="bg-white shadow overflow-hidden container w-2/5 grid grid-cols-2 gap-0 rounded-xl divide-x divide-y divide-gray-200 my-auto">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="capitalize font-semibold text-base">new users</h5>
                            <span className="font-semibold text-3xl uppercase">1.39K</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-red-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="font-semibold text-emerald-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                        147%</span>
                        <span className="text-gray-400 whitespace-nowrap uppercase">vs prev. 28 days</span>
                    </p>
                </div>
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="capitalize font-semibold text-base">unique users</h5>
                            <span className="font-semibold text-3xl uppercase">1.52k</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="font-semibold text-emerald-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                        53%</span>
                        <span className="text-gray-400 whitespace-nowrap uppercase">vs prev. 28 days</span>
                    </p>
                </div>
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="capitalize font-semibold text-base">week 1 retention</h5>
                            <span className="font-semibold text-3xl uppercase">4.53%</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                            </svg>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="font-semibold text-red-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                            </svg>
                        10.7%</span>
                        <span className="text-gray-400 whitespace-nowrap uppercase">vs prev. 28 days</span>
                    </p>
                </div>
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="capitalize font-semibold text-base">session</h5>
                            <span className="font-semibold text-3xl uppercase">0.9 sec</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-amber-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="font-semibold text-emerald-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                        29%</span>
                        <span className="text-gray-400 whitespace-nowrap uppercase">vs prev. 28 days</span>
                    </p>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden container w-2/5 mt-4 rounded-xl">
                <div className="flex-auto p-4 border-r border-b">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="capitalize font-semibold text-xl">views</h5>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <ul id='chartTab' className="cursor-pointer text-sm font-medium text-center rounded-lg border border-slate-400 divide-x divide-gray-400 shadow-md sm:flex">
                                <li className="w-full">
                                    <p onClick={changeChart} id="day" className="text-black inline-block p-2 w-full bg-white bg-stone-200 hover:bg-stone-200 rounded-l-lg" aria-current="page">Day</p>
                                </li>
                                <li className="w-full">
                                    <p onClick={changeChart} id="week" className="text-black inline-block p-2 w-full bg-white hover:bg-stone-200">Week</p>
                                </li>
                                <li>
                                    <p onClick={changeChart} id="month" className="text-black inline-block p-2 w-full bg-white hover:bg-stone-200 rounded-r-lg">Month</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <p className="text-sm text-blueGray-400 mr-5">
                            <span className="font-semibold text-5xl uppercase">12.7K</span>
                        </p>
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <span className="font-semibold text-emerald-500 mr-2 block">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                </svg>
                            147%</span>
                            <span className="text-gray-400 whitespace-nowrap uppercase">vs prev. 28 days</span>
                        </div>
                    </div>
                    <Line id='linechart' data={data} options={options}>Hello</Line>
                </div>
            </div>
        </>
    );
}

export default Dashboard;