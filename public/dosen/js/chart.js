$(document).ready(async function () {
    $.ajax({
        method: 'GET',
        url: `${base_table}kategori`,
        success: ({data}) => {
            let html = `<select class="form-control" id="chart-filter-kategori">`
            html += "<option value=''>Semua</option>"
            for (const {id, nama} of data) {
                html += `<option value='${id}'>${nama}</option>`
            }
            html += "</select>"

            $('#dashboard-advanced-search-container')
                .append(`
                        <div class="form-group row">
                            <label for="filter-tahun-rekap-penelitian" class="col-sm-2 col-form-label">Filter berdasarkan kategori penelitian: </label>
                            <div class="col-sm-10">
                                ${html}
                            </div>
                        </div>
                    `)
                .append(`
                        <div class="form-group row">
                            <label for="filter-tahun-rekap-penelitian" class="col-sm-2 col-form-label">Filter berdasarkan subkategori penelitian: </label>
                            <div class="col-sm-10">
                                <select class="form-control" id="chart-filter-subkategori"><option value="">Pilih Kategori Terlebih Dahulu</option></select>
                            </div>
                        </div>
                    `)
            $('#dashboard-advanced-search-container select').selectpicker()
        }
    })

    am5.ready(async () => {
        const tahun = $('#filter-tahun-rekap-penelitian').val()
        const kategori = $('#chart-filter-kategori').val()
        const subkategori = $('#chart-filter-subkategori').val()
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

            let xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
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
                    paddingBottom: 20
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
                makeSeries("Jumlah Penelitian yang Disetujui", "jumlah_penelitian_yang_disetujui", data, root.interfaceColors.get("primaryButton"));
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

            let xhrBiaya = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
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
                    paddingBottom: 20
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
                makeSeries("Jumlah Penelitian yang Sedang Disetujui", "jumlah_penelitian_yang_disetujui", biayaData, rootBiayaChart.interfaceColors.get("primaryButton"));
            }
            generateBiayaChart(data, tahun)

            $('#filter-tahun-rekap-penelitian').change(async function () {
                const tahun = $(this).val()
                const kategori = $('#chart-filter-kategori').val()
                const subkategori = $('#chart-filter-subkategori').val()

                rootBiayaChart.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
                data = JSON.parse(xhr.response)
                generateBiayaChart(data, tahun)

                root.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
                data = JSON.parse(xhr.response)
                generateChart(data, tahun)
            })

            $('#chart-filter-kategori').on('change', async function () {
                const val = $(this).val()
                if (!val) {
                    $('#chart-filter-subkategori').html(`<option value="">Pilih Kategori Terlebih Dahulu</option>`)
                    $('#chart-filter-subkategori').selectpicker('destroy');
                    $('#chart-filter-subkategori').selectpicker();

                    rootBiayaChart.container.children.clear()
                    xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}`)
                    data = JSON.parse(xhr.response)
                    generateBiayaChart(data, tahun)

                    root.container.children.clear()
                    xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}`)
                    data = JSON.parse(xhr.response)
                    generateChart(data, tahun)

                    return
                }
                $.ajax({
                    url: `${base_table}subkategori/${val}`,
                    method: "GET",
                    success: async ({data}) => {
                        let html = "<option value=''>Semua</option>"
                        for (const {id, nama} of data) {
                            html += `<option value='${id}'>${nama}</option>`
                        }
                        $('#chart-filter-subkategori').html(html)
                        $('#chart-filter-subkategori').selectpicker('destroy');
                        $('#chart-filter-subkategori').selectpicker();

                        const tahun = $('#filter-tahun-rekap-penelitian').val()
                        const kategori = $('#chart-filter-kategori').val()
                        const subkategori = $('#chart-filter-subkategori').val()

                        rootBiayaChart.container.children.clear()
                        xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
                        data = JSON.parse(xhr.response)
                        generateBiayaChart(data, tahun)

                        root.container.children.clear()
                        xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
                        data = JSON.parse(xhr.response)
                        generateChart(data, tahun)
                    }
                })
            })

            $('#chart-filter-subkategori').on('change', async function () {
                const tahun = $('#filter-tahun-rekap-penelitian').val()
                const kategori = $('#chart-filter-kategori').val()
                const subkategori = $('#chart-filter-subkategori').val()

                rootBiayaChart.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
                data = JSON.parse(xhr.response)
                generateBiayaChart(data, tahun)

                root.container.children.clear()
                xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}`)
                data = JSON.parse(xhr.response)
                generateChart(data, tahun)
            })

        })()
    });
})