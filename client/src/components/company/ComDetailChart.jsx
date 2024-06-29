import React from 'react'

import { Doughnut, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement } from 'chart.js'
import './css/ComDetailChart.css'

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement)

const ComDetailChart = () => {
    const genderData = {
        labels: ['남자', '여자'],
        datasets: [
            {
                label: '성비',
                data: [60, 40],  // 실제 남자와 여자의 비율로 데이터를 입력하세요.
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderWidth: 1
            }
        ]
    }

    const genderOptions = {
        animation: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: '남녀 성비',
                font: {
                    size: 20
                },
                padding: {
                    bottom: 20
                }
            }
        }
    }

    const ageData = {
        labels: ['20대', '30대', '40대', '50대', '60대이상'],
        datasets: [
            {
                label: '나이대',
                data: [12, 20, 14, 4, 1],  // 실제 데이터로 수정하세요.
                backgroundColor: ['#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB', '#36A2EB'],
                borderWidth: 1
            }
        ]
    }

    const ageOptions = {
        animation: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: true,
                text: '나이대',
                font: {
                    size: 20
                },
                padding: {
                    bottom: 20
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        <div className="d-flex justify-content-center visualization-chart1">
            <div className="chart-container1 gender-chart">
                <Doughnut data={genderData} options={genderOptions} />
            </div>
            <div className="chart-container1 age-chart">
                <Bar data={ageData} options={ageOptions} width={500} height={500} />
            </div>
        </div>
    )
}

export default ComDetailChart
