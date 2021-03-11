import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {City} from '../../../../data/Location'


export default class ContructionLocation extends React.PureComponent {

    constructor(props) {
        super(props)
        this.buildOption = this.buildOption.bind(this)
        this.chartComponent = React.createRef();
    }

    componentDidMount() {
        setTimeout(function () {
            const container = this.chartComponent.current.container.current;
            container.style.height = "100%";
            container.style.width = "100%";
            this.chartComponent.current.chart.reflow();
        }.bind(this), 1000)
    }


    buildOption() {
        const data = this.props.data;
        var seriesData = []
        for (var i = 0; i < data.length; i++) {
            var metric = data[i];
            seriesData.push({
                name: City.getName(metric.location),
                y: metric.total
            })
        }
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'KHUYẾN MÃI THEO VÙNG'
            },
          
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Đơn tham gia',
                colorByPoint: true,
                data: seriesData
            }]
        }
    }

    render() {
        const option = this.buildOption()
        return (
            <HighchartsReact constructorType={"chart"}
            ref={this.chartComponent}  highcharts={Highcharts} options={option} />
        )
    }
}