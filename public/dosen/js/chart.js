$(document).ready(async function () {
    am5.ready(async () => {
        await (async () => {
            const tahun = $('#filter-tahun-rekap-penelitian').val()
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
                    wheelX: "panX",
                    wheelY: "zoomX",
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

                chart.set("scrollbarX", am5.Scrollbar.new(root, {
                    orientation: "horizontal"
                }));

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
                makeSeries("Jumlah Penelitian yang Batal", "jumlah_penelitian_batal", data, root.interfaceColors.get("negative"));
                makeSeries("Jumlah Penelitian yang Sedang Berlangsung", "jumlah_penelitian_sedang_berlanjut", data, root.interfaceColors.get("primaryButton"));
            }
            generateChart(data, tahun)

            $('#filter-tahun-rekap-penelitian').change(async function () {
                const tahun = $('#filter-tahun-rekap-penelitian').val()
                root.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}`)
                data = JSON.parse(xhr.response)
                generateChart(data, tahun)
            })
            return true
        })();

        await (async () => {
            const tahun = $('#filter-tahun-biaya-penelitian').val()
            let data = []

            const root = am5.Root.new("chart_biaya_penelitian");

            root.setThemes([
                am5themes_Animated.new(root)
            ]);

            let xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}`)
            data = JSON.parse(xhr.response)
            root.container.children.clear()

            const generateChart = (data, tahun) => {
                const chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
                    paddingLeft: 0
                }));

                am5plugins_exporting.Exporting.new(root, {
                    menu: am5plugins_exporting.ExportingMenu.new(root, {}),
                    filePrefix: "chart_rekap_biaya_penelitian"
                });

                chart.children.unshift(am5.Label.new(root, {
                    text: `Rekap Biaya Penelitian Tahun ${tahun}`,
                    fontSize: 25,
                    fontWeight: "500",
                    textAlign: "center",
                    x: am5.percent(50),
                    centerX: am5.percent(50),
                    paddingTop: 0,
                    paddingBottom: 0
                }));

                const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                    behavior: "none"
                }));

                cursor.lineY.set("visible", false);

                const  yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {
                        pan: "zoom"
                    })
                }));
                const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "date",
                    startLocation: 0.5,
                    endLocation: 0.5,
                    renderer: am5xy.AxisRendererX.new(root, {
                        minorGridEnabled: true,
                        minGridDistance: 70
                    }),
                    tooltip: am5.Tooltip.new(root, {})
                }));

                xAxis.data.setAll(data);

                function createSeries(name, field, data) {
                    const series = chart.series.push(am5xy.LineSeries.new(root, {
                        name: name,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        stacked: true,
                        valueYField: field,
                        categoryXField: "date",
                        tooltip: am5.Tooltip.new(root, {
                            pointerOrientation: "horizontal",
                            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
                        })
                    }));

                    series.fills.template.setAll({
                        fillOpacity: 0.5,
                        visible: true
                    });

                    series.data.setAll(data);
                    series.appear(1000);
                }

                createSeries("Jumlah Penelitian yang Sedang Berlangsung", "jumlah_penelitian_sedang_berlanjut", data);
                createSeries("Jumlah Penelitian yang Selesai", "jumlah_penelitian_selesai", data);
                createSeries("Jumlah Penelitian yang Batal", "jumlah_penelitian_batal", data);

                return chart
            }
            let chart = generateChart(data, tahun)

            $('#filter-tahun-biaya-penelitian').change(async function () {
                const tahun = $('#filter-tahun-biaya-penelitian').val()

                chart.set('cursor', null)
                root.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}`)
                data = JSON.parse(xhr.response)
                chart = generateChart(data, tahun)
            })

        })()
    });
})