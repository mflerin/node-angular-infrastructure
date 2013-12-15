angular.module('controlsModule', [])
    .directive('savebutton',function () {
        return {
            restrict: 'E',
            scope: {eventHandler: '&ngClick', isDisabled: '=ngDisabled'},
            templateUrl: './views/directives/savebutton.html',
            link: function (scope, element, attrs) {
                scope.clicked = function () {
                    scope.isDisabled = true;
                }

            }
        }
    }).directive('piechart',function () {
        return {
            restrict: 'E',
            scope: {chartData: '=', title:'@', subTitle:'@'},
            link: function (scope, element, attrs) {

                scope.$watch('chartData', function () {
                    if (angular.isUndefined(scope.chartData))return;

                    $(element).highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: { text: scope.title },
                        subtitle: { text: scope.subTitle },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000',
                                    connectorColor: '#000000',
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                }
                            }
                        },
                        series: [
                            {
                                type: 'pie',
                                name: scope.title,
                                animation: {
                                    duration: 2000
                                },
                                data: scope.chartData
                            }
                        ]
                    });
                });

            }
        }
    }).directive('barchart', function () {
        return {
            restrict: 'E',
            scope: {chartData: '=', title:'@', subTitle:'@'},
            link: function (scope, element, attrs) {

                scope.$watch('chartData', function () {
                    if (angular.isUndefined(scope.chartData)) return;
                    $(element).highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: { text: scope.title },
                        subtitle: { text: scope.subTitle},
                        xAxis: {
                            categories: _.map(scope.chartData,function(item){return item.name})
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'ages and stuff'
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
                        series: [
                            { name: scope.title,
                                data: _.map(scope.chartData,function(item){return item.y}),
                                animation: {
                                    duration: 1000
                                }
                            }
                        ]
                    });

                });

            }
        }
    });

