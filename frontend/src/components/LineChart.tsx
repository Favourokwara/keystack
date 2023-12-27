import React, { useRef } from 'react'
import { CategoryScale, Chart as ChartJS, ChartType, Filler, LineController, LineElement, LinearScale, PointElement, Title, Tooltip, TooltipItem } from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { range, max } from 'lodash'


ChartJS.register(
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip,
    Title,
    Filler
);

ChartJS.defaults.font.family = 'Roboto Mono, monospace';

export default function LineChart(props:{ wpm: number[], raw: number[], err: number[] }) {
    const errors = props.err.map((err) => err === 0? null : err);
    
    const config = {
        data: {
            labels: range(1, props.wpm.length + 1),
            datasets: [
                {
                    label: 'errors',
                    type: 'scatter' as const,
                    yAxisID: 'errAxis',
                    data: errors,
                    fill: false,
                    pointStyle: 'crossRot',
                    borderColor: 'rgba(202, 71, 84, 1)',
                    backgroundColor: 'rgba(202, 71, 84, 1)',
                },
                {
                    label: 'wpm',
                    type: 'line' as const,
                    data: props.wpm,
                    fill: false,
                    borderColor: 'rgba(226, 183, 20, 1)',
                    backgroundColor: 'rgba(226, 183, 20, 1)',
                },
                {
                    label: 'raw',
                    type: 'line' as const,
                    data: props.raw,
                    fill: true,
                    borderColor: 'rgba(100, 102, 105, 1)',
                    backgroundColor: 'rgba(100, 102, 105, .1)',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index' as const
            },
            elements: {
                line: {
                    tension: 0.3,
                    borderWidth: 2,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Words Per Minute"
                    },
                    ticks: {
                        display: true,
                        stepSize: 1,
                        callback: function(value:number, index:number, values: number[]) {
                            const isMax = value === max([...props.wpm, ...props.raw]);
                            return (value % 20 === 0 || isMax)? value : null;
                        }
                    }
                },
                errAxis: {
                    beginAtZero: true,
                    position: 'right' as const,
                    title: {
                        display: true,
                        text: "Errors"
                    },
                    ticks: {
                        stepSize: 1
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context:TooltipItem<any>) {
                            let label = context.dataset.label || '';
    
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${context.parsed.y}`;
                            }
                            return label;
                        }
                    }
                }
            },
            chart: {
                defaults: {
                    font: {
                        size: 1
                    }
                }
            }
        }
    }
    return (
        <div className='chart max-w-[100%]'>
            <Chart type='line' {...config} />
        </div>
    );
}