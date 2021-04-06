import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DateTimeUtil from '../../../../utils/DateTimeUtil'


const options = {
    title: {
        text: 'My chart'
    },
    series: [{
        data: [1, 2, 3]
    }]
}

export default class RegisterDateChart extends React.PureComponent {

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
        let dataSeries = []
        var categories = []
        if (data) {
            for (var i = data.length - 1; i >= 0; i--) {
                dataSeries.push([data[i].date, data[i].total])
                categories.push(DateTimeUtil.toStringNotYear(DateTimeUtil.parseDate(data[i].date)))
            }
        }
        return {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories,
                labels: {
                    format: '{value:%e %b}'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Số người đăng ký',
                data: dataSeries
            }]
        }
    }

    render() {
        const option = this.buildOption()
        return (
            <div className="central-meta">
                <div className="x_panel">
                    <div className="x_title">
                        <h2>Nhà thầu đã đăng ký theo ngày</h2>
                    </div>
                    <div className="x_content">
                        <div style={{ clear: 'both' }}>
                            <HighchartsReact constructorType={"chart"}
                                ref={this.chartComponent} highcharts={Highcharts} options={option} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}