$(document).ready(async function () {
    am5.ready(async () => {
        const tahun = $('#filter-tahun-rekap-penelitian').val()
        await (async () => {
            let data = []

            const root = am5.Root.new("chart_rekap_penelitian");
            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            am5plugins_exporting.Exporting.new(root, {
                menu: am5plugins_exporting.ExportingMenu.new(root, {}),
                filePrefix: "chart_rekap_total_penelitian"
            });

            let xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}`)
            data = JSON.parse(xhr.response)
            root.container.children.clear()

            const generateChart = (data, tahun) => {
                const chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                    paddingLeft: 0,
                    layout: root.verticalLayout
                }));

                chart.children.unshift(am5.Label.new(root, {
                    text: `Rekap Total Penelitian Tahun ${tahun}`,
                    fontSize: 25,
                    fontWeight: "500",
                    textAlign: "center",
                    x: am5.percent(50),
                    centerX: am5.percent(50),
                    paddingTop: 0,
                    paddingBottom: 0
                }));

                chart.zoomOutButton.set("forceHidden", true);

                const xRenderer = am5xy.AxisRendererX.new(root, {
                    minorGridEnabled: true
                });

                const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "date",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                xRenderer.grid.template.setAll({
                    location: 1
                })

                xAxis.data.setAll(data);

                const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    min: 0,
                    renderer: am5xy.AxisRendererY.new(root, {
                        strokeOpacity: 0.1
                    })
                }));
                const legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50
                }));

                const makeSeries = (name, fieldName, data, color) => {
                    const series = chart.series.push(am5xy.ColumnSeries.new(root, {
                        name: name,
                        stacked: true,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: fieldName,
                        categoryXField: "date",
                        fill: color,
                    }));

                    series.columns.template.setAll({
                        tooltipText: "{name}, {categoryX}: {valueY}",
                        tooltipY: am5.percent(10)
                    });

                    series.data.setAll(data);
                    series.appear();

                    series.bullets.push(() => am5.Bullet.new(root, {
                        sprite: am5.Label.new(root, {
                            text: "{valueY}",
                            fill: root.interfaceColors.get("alternativeText"),
                            centerY: am5.p50,
                            centerX: am5.p50,
                            populateText: true
                        })
                    }));

                    legend.data.push(series);
                }

                makeSeries("Jumlah Penelitian yang Selesai", "jumlah_penelitian_selesai", data, root.interfaceColors.get("positive"));
                makeSeries("Jumlah Penelitian yang Di Setujui", "jumlah_penelitian_yang_disetujui", data, root.interfaceColors.get("primaryButton"));
            }

            generateChart(data, tahun)

            let biayaData = []

            const rootBiayaChart = am5.Root.new("chart_biaya_penelitian");

            rootBiayaChart.setThemes([
                am5themes_Animated.new(rootBiayaChart)
            ]);

            am5plugins_exporting.Exporting.new(rootBiayaChart, {
                menu: am5plugins_exporting.ExportingMenu.new(rootBiayaChart, {}),
                filePrefix: "chart_rekap_total_penelitian"
            });

            let xhrBiaya = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}`)
            biayaData = JSON.parse(xhrBiaya.response)
            rootBiayaChart.container.children.clear()

            const generateBiayaChart = (data, tahun) => {
                const chart = rootBiayaChart.container.children.push(am5xy.XYChart.new(rootBiayaChart, {
                    paddingLeft: 0,
                    layout: rootBiayaChart.verticalLayout,
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                }));

                chart.zoomOutButton.set("forceHidden", true);

                chart.children.unshift(am5.Label.new(rootBiayaChart, {
                    text: `Rekap Total Biaya Penelitian Tahun ${tahun}`,
                    fontSize: 25,
                    fontWeight: "500",
                    textAlign: "center",
                    x: am5.percent(50),
                    centerX: am5.percent(50),
                    paddingTop: 0,
                    paddingBottom: 0
                }));

                const xRenderer = am5xy.AxisRendererX.new(rootBiayaChart, {
                    minorGridEnabled: true
                });

                const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(rootBiayaChart, {
                    categoryField: "date",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(rootBiayaChart, {})
                }));

                xRenderer.grid.template.setAll({
                    location: 1
                })

                xAxis.data.setAll(data);

                const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(rootBiayaChart, {
                    min: 0,
                    renderer: am5xy.AxisRendererY.new(rootBiayaChart, {
                        strokeOpacity: 0.1
                    })
                }));
                const legend = chart.children.push(am5.Legend.new(rootBiayaChart, {
                    centerX: am5.p50,
                    x: am5.p50
                }));

                const makeSeries = (name, fieldName, data, color) => {
                    const series = chart.series.push(am5xy.ColumnSeries.new(rootBiayaChart, {
                        name: name,
                        stacked: true,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: fieldName,
                        categoryXField: "date",
                        fill: color,
                    }));

                    series.columns.template.setAll({
                        tooltipText: "{name}, {categoryX}: {valueY}",
                        tooltipY: am5.percent(10)
                    });

                    series.data.setAll(data);
                    series.appear();

                    series.bullets.push(() => am5.Bullet.new(rootBiayaChart, {
                        sprite: am5.Label.new(rootBiayaChart, {
                            text: "{valueY}",
                            fill: rootBiayaChart.interfaceColors.get("alternativeText"),
                            centerY: am5.p50,
                            centerX: am5.p50,
                            populateText: true
                        })
                    }));

                    legend.data.push(series);
                }

                makeSeries("Jumlah Penelitian yang Selesai", "jumlah_penelitian_selesai", biayaData, rootBiayaChart.interfaceColors.get("positive"));
                makeSeries("Jumlah Penelitian yang Sedang Di Setujui", "jumlah_penelitian_yang_disetujui", biayaData, rootBiayaChart.interfaceColors.get("primaryButton"));
            }
            generateBiayaChart(data, tahun)

            $('#filter-tahun-rekap-penelitian').change(async function () {
                const tahun = $(this).val()

                rootBiayaChart.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}`)
                data = JSON.parse(xhr.response)
                generateBiayaChart(data, tahun)

                root.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}`)
                data = JSON.parse(xhr.response)
                generateChart(data, tahun)
            })

        })()
    });
})