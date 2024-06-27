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
        const fakultas = $('#filter-fakultas').val()

        let xAxisChart,
            seriesChartSelesai,
            seriesChartDisetujui,
            seriesChartTotal,
            xAxisBiayaChart,
            seriesBiayaChartSelesai,
            seriesBiayaChartDisetujui,
            seriesBiayaChartTotal
        ;
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

            let xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
            data = JSON.parse(xhr.response)

            const generateChart = (data) => {
                const chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                    paddingLeft: 0,
                    layout: root.verticalLayout
                }));

                chart.children.unshift(am5.Label.new(root, {
                    text: `Rekap Total Penelitian`,
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

                xAxisChart = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "date",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                xRenderer.grid.template.setAll({
                    location: 1
                })

                xAxisChart.data.setAll(data);

                const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    min: 0,
                    extraMax: 0.1,
                    calculateTotals: true,
                    renderer: am5xy.AxisRendererY.new(root, {
                        strokeOpacity: 0.1
                    })
                }));
                const legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50
                }));

                seriesChartSelesai = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Jumlah Penelitian yang Selesai",
                    stacked: true,
                    xAxis: xAxisChart,
                    yAxis: yAxis,
                    valueYField: "jumlah_penelitian_selesai",
                    categoryXField: "date",
                    fill: root.interfaceColors.get("positive"),
                }));

                seriesChartSelesai.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}: {valueY}",
                    tooltipY: am5.percent(10)
                });

                seriesChartSelesai.data.setAll(data);
                seriesChartSelesai.appear();

                seriesChartSelesai.bullets.push(() => am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: am5.p50,
                        centerX: am5.p50,
                        populateText: true
                    })
                }));

                legend.data.push(seriesChartSelesai);

                seriesChartDisetujui = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Jumlah Penelitian yang Disetujui",
                    stacked: true,
                    xAxis: xAxisChart,
                    yAxis: yAxis,
                    valueYField: "jumlah_penelitian_yang_disetujui",
                    categoryXField: "date",
                    fill: root.interfaceColors.get("primaryButton"),
                }));

                seriesChartDisetujui.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}: {valueY}",
                    tooltipY: am5.percent(10)
                });

                seriesChartDisetujui.data.setAll(data);
                seriesChartDisetujui.appear();

                seriesChartDisetujui.bullets.push(() => am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: am5.p50,
                        centerX: am5.p50,
                        populateText: true
                    })
                }));

                legend.data.push(seriesChartDisetujui);

                seriesChartTotal = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "",
                    stacked: true,
                    maskBullets: false,
                    xAxis: xAxisChart,
                    yAxis: yAxis,
                    valueYField: "none",
                    categoryXField: "date",
                    fill: root.interfaceColors.get("primaryButton"),
                }));

                seriesChartTotal.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}: {valueY}",
                    tooltipY: am5.percent(10)
                });

                seriesChartTotal.bullets.push(() => am5.Bullet.new(root, {
                    locationY: 1,
                    sprite: am5.Label.new(root, {
                        text: "{valueYTotal}",
                        fill: am5.color(0x000000),
                        centerY: am5.p100,
                        centerX: am5.p50,
                        populateText: true
                    })
                }));

                seriesChartTotal.data.setAll(data);
                seriesChartTotal.appear();
            }

            generateChart(data)



            let biayaData = []

            let rootBiayaChart = am5.Root.new("chart_biaya_penelitian");

            rootBiayaChart.setThemes([
                am5themes_Animated.new(rootBiayaChart)
            ]);

            am5plugins_exporting.Exporting.new(rootBiayaChart, {
                menu: am5plugins_exporting.ExportingMenu.new(rootBiayaChart, {}),
                filePrefix: "chart_rekap_total_penelitian"
            });

            let xhrBiaya = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
            biayaData = JSON.parse(xhrBiaya.response)

            const generateBiayaChart = (biayaData) => {
                const biayaChart = rootBiayaChart.container.children.push(am5xy.XYChart.new(rootBiayaChart, {
                    paddingLeft: 0,
                    layout: rootBiayaChart.verticalLayout,
                    panX: false,
                    panY: false,
                    wheelX: "none",
                    wheelY: "none",
                }));

                biayaChart.zoomOutButton.set("forceHidden", true);

                biayaChart.children.unshift(am5.Label.new(rootBiayaChart, {
                    text: `Rekap Total Biaya Penelitian`,
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

                xAxisBiayaChart = biayaChart.xAxes.push(am5xy.CategoryAxis.new(rootBiayaChart, {
                    categoryField: "date",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(rootBiayaChart, {})
                }));

                xRenderer.grid.template.setAll({
                    location: 1
                })

                xAxisBiayaChart.data.setAll(biayaData);

                const yAxis = biayaChart.yAxes.push(am5xy.ValueAxis.new(rootBiayaChart, {
                    min: 0,
                    calculateTotals: true,
                    renderer: am5xy.AxisRendererY.new(rootBiayaChart, {
                        strokeOpacity: 0.1
                    })
                }));

                const legend = biayaChart.children.push(am5.Legend.new(rootBiayaChart, {
                    centerX: am5.p50,
                    x: am5.p50
                }));

                seriesBiayaChartSelesai = biayaChart.series.push(am5xy.ColumnSeries.new(rootBiayaChart, {
                    name: "Jumlah Penelitian yang Selesai",
                    stacked: true,
                    xAxis: xAxisBiayaChart,
                    yAxis: yAxis,
                    valueYField: "jumlah_penelitian_selesai",
                    categoryXField: "date",
                    fill: rootBiayaChart.interfaceColors.get("positive"),
                    maskBullets: false
                }));

                seriesBiayaChartSelesai.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}: {valueY}",
                    tooltipY: am5.percent(10),
                });

                seriesBiayaChartSelesai.bullets.push(() => {
                    return am5.Bullet.new(rootBiayaChart, {
                        sprite: am5.Label.new(rootBiayaChart, {
                            text: "{valueY}",
                            fill: rootBiayaChart.interfaceColors.get("alternativeText"),
                            centerY: am5.p50,
                            centerX: am5.p50,
                            populateText: true
                        })
                    })
                });

                seriesBiayaChartSelesai.data.setAll(biayaData);
                seriesBiayaChartSelesai.appear();


                legend.data.push(seriesBiayaChartSelesai);

                seriesBiayaChartDisetujui = biayaChart.series.push(am5xy.ColumnSeries.new(rootBiayaChart, {
                    name: "Jumlah Penelitian yang Disetujui",
                    stacked: true,
                    xAxis: xAxisBiayaChart,
                    yAxis: yAxis,
                    valueYField: "jumlah_penelitian_yang_disetujui",
                    categoryXField: "date",
                    fill: rootBiayaChart.interfaceColors.get("primaryButton"),
                }));

                seriesBiayaChartDisetujui.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}: {valueY}",
                    tooltipY: am5.percent(10),
                });

                seriesBiayaChartDisetujui.bullets.push(() => {
                    return am5.Bullet.new(rootBiayaChart, {
                        sprite: am5.Label.new(rootBiayaChart, {
                            text: "{valueY}",
                            fill: rootBiayaChart.interfaceColors.get("alternativeText"),
                            centerY: am5.p50,
                            centerX: am5.p50,
                            populateText: true
                        })
                    })
                });

                seriesBiayaChartDisetujui.data.setAll(biayaData);
                seriesBiayaChartDisetujui.appear();


                legend.data.push(seriesBiayaChartDisetujui);

                seriesBiayaChartTotal = biayaChart.series.push(am5xy.ColumnSeries.new(rootBiayaChart, {
                    name: "",
                    stacked: true,
                    maskBullets: false,
                    xAxis: xAxisBiayaChart,
                    yAxis: yAxis,
                    valueYField: "none",
                    categoryXField: "date",
                    fill: rootBiayaChart.interfaceColors.get("primaryButton"),
                }));

                seriesBiayaChartTotal.columns.template.setAll({
                    tooltipText: "{name}, {categoryX}: {valueY}",
                    tooltipY: am5.percent(10)
                });

                seriesBiayaChartTotal.bullets.push(() => am5.Bullet.new(rootBiayaChart, {
                    locationY: 1,
                    sprite: am5.Label.new(rootBiayaChart, {
                        text: "{valueYTotal}",
                        fill: am5.color(0x000000),
                        centerY: am5.p100,
                        centerX: am5.p50,
                        populateText: true
                    })
                }));

                seriesBiayaChartTotal.data.setAll(biayaData);
                seriesBiayaChartTotal.appear();
            }

            generateBiayaChart(biayaData)

            $('#filter-tahun-rekap-penelitian, #filter-fakultas').change(async function () {
                const tahun = $('#filter-tahun-rekap-penelitian').val()
                const kategori = $('#chart-filter-kategori').val()
                const subkategori = $('#chart-filter-subkategori').val()
                const fakultas = $('#filter-fakultas').val()

                xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
                data = JSON.parse(xhr.response)
                xAxisBiayaChart.data.setAll(data)
                seriesBiayaChartSelesai.data.setAll(data)
                seriesBiayaChartDisetujui.data.setAll(data)
                seriesBiayaChartTotal.data.setAll(data)

                xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
                data = JSON.parse(xhr.response)
                xAxisChart.data.setAll(data)
                seriesChartSelesai.data.setAll(data)
                seriesChartDisetujui.data.setAll(data)
                seriesChartTotal.data.setAll(data)
            })

            $('#chart-filter-kategori').on('change', async function () {
                const val = $(this).val()
                if (!val) {
                    const tahun = $('#filter-tahun-rekap-penelitian').val()
                    const fakultas = $('#filter-fakultas').val()
                    $('#chart-filter-subkategori').html(`<option value="">Pilih Kategori Terlebih Dahulu</option>`)
                    $('#chart-filter-subkategori').selectpicker('destroy');
                    $('#chart-filter-subkategori').selectpicker();

                    xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}&fakultas=${fakultas}`)
                    data = JSON.parse(xhr.response)
                    xAxisBiayaChart.data.setAll(data)
                    seriesBiayaChartSelesai.data.setAll(data)
                    seriesBiayaChartDisetujui.data.setAll(data)
                    seriesBiayaChartTotal.data.setAll(data)

                    xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}&fakultas=${fakultas}`)
                    data = JSON.parse(xhr.response)
                    xAxisChart.data.setAll(data)
                    seriesChartSelesai.data.setAll(data)
                    seriesChartDisetujui.data.setAll(data)
                    seriesChartTotal.data.setAll(data)

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
                        const fakultas = $('#filter-fakultas').val()

                        xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
                        data = JSON.parse(xhr.response)
                        xAxisBiayaChart.data.setAll(data)
                        seriesBiayaChartSelesai.data.setAll(data)
                        seriesBiayaChartDisetujui.data.setAll(data)
                        seriesBiayaChartTotal.data.setAll(data)

                        xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
                        data = JSON.parse(xhr.response)
                        xAxisChart.data.setAll(data)
                        seriesChartSelesai.data.setAll(data)
                        seriesChartDisetujui.data.setAll(data)
                        seriesChartTotal.data.setAll(data)
                    }
                })
            })

            $('#chart-filter-subkategori').on('change', async function () {
                const tahun = $('#filter-tahun-rekap-penelitian').val()
                const kategori = $('#chart-filter-kategori').val()
                const subkategori = $('#chart-filter-subkategori').val()
                const fakultas = $('#filter-fakultas').val()

                xhr = await am5.net.load(`${base_api_url}chart/penelitian/biaya/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
                data = JSON.parse(xhr.response)
                xAxisBiayaChart.data.setAll(data)
                seriesBiayaChartSelesai.data.setAll(data)
                seriesBiayaChartDisetujui.data.setAll(data)
                seriesBiayaChartTotal.data.setAll(data)

                xhr = await am5.net.load(`${base_api_url}chart/penelitian/all/${tahun}?kategori=${kategori}&subkategori=${subkategori}&fakultas=${fakultas}`)
                data = JSON.parse(xhr.response)
                xAxisChart.data.setAll(data)
                seriesChartSelesai.data.setAll(data)
                seriesChartDisetujui.data.setAll(data)
                seriesChartTotal.data.setAll(data)
            })
        })()
    });
})