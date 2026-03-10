import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';
import './FeesDistribution.css';

// Initialize 3D module safely for hot reloading
if (typeof Highcharts === 'object') {
    try {
        if (!Highcharts.ZAxis) {
            highcharts3d(Highcharts);
        }
    } catch (error) {
        console.warn('Highcharts 3D might already be loaded:', error);
    }
}

const FeesDistribution = () => {
    const options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b><br/>{point.description}',
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            borderColor: '#555',
            style: {
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 45,
                innerSize: 50,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    color: '#f8fafc',
                    style: {
                        fontSize: '14px',
                        textOutline: '1px #000',
                        fontFamily: 'Outfit, sans-serif'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Fees Allocation',
            data: [
                {
                    name: 'Marketing',
                    y: 50,
                    description: 'Dex boost, ads, CT promos. Getting $Zazu its proper mindshare as the cat mascot of the trenches.',
                    color: '#22c55e' // Vibrant green
                },
                {
                    name: 'Dev Rewards',
                    y: 25,
                    description: 'Rewards allocated to the team for bagworking hard and being chads.',
                    color: '#f59e0b'
                },
                {
                    name: 'Buy / Burnback Flywheel',
                    y: 25,
                    description: 'A glorious feedback loop that automatically buys tokens right off the market and sends them straight to the incinerator, permanently reducing supply.',
                    color: '#ef4444' // Vibrant red
                }
            ]
        }]
    };

    return (
        <section className="fees-distribution-section" id="fees">
            <div className="section-header text-center">
                <h2 className="title-gradient">Fees Distribution</h2>
                <p className="subtitle" style={{ marginTop: '1rem' }}>
                    Interactive breakdown of exactly where transaction fees go. Hover or select a slice to learn more.
                </p>
            </div>

            <div className="interactive-chart-container">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </section>
    );
};

export default FeesDistribution;
