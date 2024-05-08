$(document).ready(function () {
    const dosenDatatable = $('#dosen-dataTable').DataTable({
        processing: true,
        serverSide: true,
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari: "
        },
        ajax: {
            url: `${base_table}dosen`,
            data: d => {
                if (d.order[0]) {
                    d.sort_column = d.columns[d.order[0].column].data;
                    d.sort_direction = d.order[0].dir;
                }
                // Delete the original order array as it's not needed anymore
                delete d.columns;
                delete d.order;
            }
        },
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        buttons: [
            {
                extend: 'excel',
                exportOptions: {
                    columns: ':not(:last)' // Exclude the last column
                }
            },
            {
                extend: 'copy',
                exportOptions: {
                    columns: ':not(:last)' // Exclude the last column
                }
            },
            {
                extend: 'csv',
                exportOptions: {
                    columns: ':not(:last)',
                }
            },
            {
                extend: 'pdf',
                exportOptions: {
                    columns: ':not(:last)',
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: ':not(:last)',
                }
            }
        ],
        columns: [
            {
                data: 'id', title: 'No', orderable: false, searchable: false, render: (data, type, row, meta) =>
                    meta.row + meta.settings._iDisplayStart + 1
            },
            {data: 'nama_dosen', title: 'Nama Dosen', searchable: true, orderable: true},
            {
                data: 'nomor_induk_dosen_nasional',
                title: 'Nomor Induk Dosen Nasional',
                searchable: true,
                orderable: true
            },
            {data: 'nomor_induk_pegawai', title: 'Nomor Induk Pegawai', searchable: true, orderable: true},
            {data: 'email', title: 'Email', searchable: true, orderable: true},
            {
                data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                    return `<a href="${base_url}dosen/ubah/${data}"  class="btn btn-primary"> Ubah </a> 
                        <button data-id="${data}" class="btn btn-danger del" data-prefix-url="dosen" data-datatable-id="dosen-dataTable"> Hapus </button>`
                }
            }
        ]
    })

    const mahasiswaDatatable = $('#mahasiswa-dataTable').DataTable({
        processing: true,
        serverSide: true,
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari berdasarkan nama atau nim mahasiswa:"
        },
        ajax: {
            url: `${base_table}mahasiswa`,
            data: d => {
                if (d.order[0]) {
                    d.sort_column = d.columns[d.order[0].column].data;
                    d.sort_direction = d.order[0].dir;
                }
                // Delete the original order array as it's not needed anymore
                delete d.columns;
                delete d.order;
            }
        },
        columns: [
            {
                data: 'id', title: 'No', orderable: false, searchable: false, render: (data, type, row, meta) =>
                    meta.row + meta.settings._iDisplayStart + 1
            },
            {data: 'nama_mahasiswa', title: 'Nama Mahasiswa', searchable: true, orderable: true},
            {data: 'nomor_induk_mahasiswa', title: 'Nomor Induk Mahasiswa', searchable: true, orderable: true},
            {
                data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                    return `<a href="${base_url}mahasiswa/ubah/${data}"  class="btn btn-primary"> Ubah </a> 
                        <button data-id="${data}" class="btn btn-danger del" data-prefix-url="mahasiswa" data-datatable-id="mahasiswa-dataTable"> Hapus </button>`
                }
            }
        ]
    })

    const penelitianDataTable = $('#penelitian-dataTable').DataTable({
        processing: true,
        serverSide: true,
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        buttons: [
            {
                extend: 'excel',
                exportOptions: {
                    columns: ':not(:last)' // Exclude the last column
                }
            },
            {
                extend: 'copy',
                exportOptions: {
                    columns: ':not(:last)' // Exclude the last column
                }
            },
            {
                extend: 'csv',
                exportOptions: {
                    columns: ':not(:last)',
                }
            },
            {
                extend: 'pdf',
                exportOptions: {
                    columns: ':not(:last)',
                }
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: ':not(:last)',
                }
            }
        ],
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari Berdasarkan Judul Proposal: "
        },
        ajax: {
            url: `${base_table}penelitian`,
            data: d => {
                if (d.order[0]) {
                    d.sort_column = d.columns[d.order[0].column].data;
                    d.sort_direction = d.order[0].dir;
                }
                // Delete the original order array as it's not needed anymore
                delete d.columns;
                delete d.order;

                d.search = {
                    judul: d.search.value,
                    kategori: $('#datatable-filter-kategori').val(),
                    subkategori: $('#datatable-filter-subkategori').val(),
                    status: $('#datatable-filter-status').val(),
                    periode: $('#datatable-filter-periode').val(),
                    tahun: $('#datatable-filter-tahun').val(),
                    minBiayaDiajukan: $('#datatable-filter-min-biaya-diajukan').val(),
                    maxBiayaDiajukan: $('#datatable-filter-max-biaya-diajukan').val(),
                    minBiayaDisetujui: $('#datatable-filter-min-biaya-disetujui').val(),
                    maxBiayaDisetujui: $('#datatable-filter-max-biaya-disetujui').val(),
                    ketua_dosen_penelitian: $('#datatable-filter-ketua-dosen').val(),
                    anggota_dosen_penelitian: $('#datatable-filter-anggota-dosen').val(),
                    anggota_mahasiswa_penelitian: $('#datatable-filter-anggota-mahasiswa').val(),
                }
            }
        },
        columns: [
            {
                data: 'id', title: 'No', orderable: false, searchable: false, render: (data, type, row, meta) =>
                    meta.row + meta.settings._iDisplayStart + 1
            },
            {data: 'nama_proposal', title: 'Judul Proposal', searchable: true, orderable: true},
            {
                data: 'biaya_yang_diajukan',
                title: 'Biaya yang Diajukan',
                searchable: true,
                orderable: true,
                render: data => new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                }).format(data)
            },
            {
                data: 'biaya_yang_disetujui',
                title: 'Biaya yang Disetujui',
                searchable: true,
                orderable: true,
                render: data => new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                }).format(data)
            },
            {
                data: 'periode_awal',
                title: 'Periode',
                searchable: true,
                orderable: true,
                render: (data, _type, row) => {
                    switch (moment(data).month() + 1) {
                        case 2:
                            return `Periode 1 (${moment(row.periode_awal).format('MMM YYYY')} - ${moment(row.periode_akhir).format('MMM YYYY')})`
                        case 8:
                            return `Periode 2 (${moment(row.periode_awal).format('MMM YYYY')} - ${moment(row.periode_akhir).format('MMM YYYY')})`
                    }

                    return `${moment(row.periode_awal).format('MMM YYYY')} - ${moment(row.periode_akhir).format('MMM YYYY')}`
                }
            },
            {
                data: 'kategori_penelitian',
                title: 'Kategori Penelitian',
                searchable: true,
                orderable: true,
                render: (data, _type, row) => `${data} - ${row.subkategori_penelitian}`
            },
            {
                data: 'status',
                title: 'Status',
                searchable: true,
                orderable: true,
            },
            {
                data: 'ketua_penelitian',
                title: 'Ketua Dosen Penelitian',
                searchable: true,
                orderable: true,
            },
            {
                data: 'id', title: 'Aksi', orderable: false, searchable: false, render: (data, _type, row) => {
                    return `
                         <a href="${base_url}penelitian/ubah/${data}"  class="btn btn-primary"> Ubah </a>
                        <button data-id="${data}" class="btn btn-danger del" data-prefix-url="penelitian" data-datatable-id="penelitian-dataTable"> Hapus </button>`
                }
            }
        ]
    });

    $('#penelitian-dataTable_filter').addClass('container')
        .append('<div class="row" style="float: left; text-align: left"> </div>')
    $('#penelitian-dataTable_filter .row input').addClass('form-control')

    $.ajax({
        method: 'GET',
        url: `${base_table}kategori`,
        success: ({data}) => {
            let html = `<select class="form-control" id="datatable-filter-kategori">`
            html += "<option value=''>Semua</option>"
            for (const {id, nama} of data) {
                html += `<option value='${id}'>${nama}</option>`
            }
            html += "</select>"
            $('#penelitian-dataTable_filter .row').append(`<div class="px-3 col-sm-12 col-md-6 col-lg-3"> <label> Cari berdasarkan kategori penelitian: </label> ${html}</div>`)
                .append(`
<div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan subkategori penelitian: </label>
      <select class="form-control" id="datatable-filter-subkategori"><option value="">Pilih Kategori Terlebih Dahulu</option></select>
    </div>`)
        }
    })
    $('#penelitian-dataTable_filter .row')
        .append(`
<div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan status: </label>
        <select class="form-control" id="datatable-filter-status">
            <option value="">Semua</option>
            <option value="Draft">Draft</option>
            <option value="Diajukan">Diajukan</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Selesai">Selesai</option>
            <option value="Batal">Batal</option>
        </select> 
    </div>`)
        .append(`
<div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan periode: </label>
        <select class="form-control" id="datatable-filter-periode">
            <option value="">Semua</option>
            <option value="1">1</option>
            <option value="2">2</option>
        </select> 
    </div>`)
        .append(`
<div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan tahun: </label>
      <input type="search" class="year-picker form-control" id="datatable-filter-tahun">
    </div>`)
        .append(`
<div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan nama atau nidn ketua penelitian: </label>
      <input type="search" class="form-control" id="datatable-filter-ketua-dosen">
    </div>`)
        .append(`
        <div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan minimum biaya diajukan: </label>
      <input type="text" class="number ribuan form-control" data-id="datatable-filter-min-biaya-diajukan">
      <input type="hidden" class="form-control number" id="datatable-filter-min-biaya-diajukan"
                               >
    </div>
        `)
        .append(`
        <div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan maksimal biaya diajukan: </label>
      <input type="text" class="number ribuan form-control" data-id="datatable-filter-max-biaya-diajukan">
      <input type="hidden" class="form-control number" id="datatable-filter-max-biaya-diajukan"
                               ></div>
        `)
        .append(`
        <div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan minimum biaya disetujui: </label>
      <input type="text" class="number ribuan form-control" data-id="datatable-filter-min-biaya-disetujui">
      <input type="hidden" class="form-control number" id="datatable-filter-min-biaya-disetujui"
                               >
    </div>
        `)
        .append(`
        <div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan maksimal biaya disetujui: </label>
      <input type="text" class="number ribuan form-control" data-id="datatable-filter-max-biaya-disetujui">
      <input type="hidden" class="form-control number" id="datatable-filter-max-biaya-disetujui"
                               ></div>
        `)
        .append(`
<div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan nama atau nidn anggota dosen penelitian: </label>
      <input type="search" class="form-control" id="datatable-filter-anggota-dosen">
    </div>`)
        .append(`
<div class="px-3 col-sm-12 col-md-6 col-lg-3">
    <label>Cari berdasarkan nama atau nim anggota mahasiswa: </label>
      <input type="search" class="form-control" id="datatable-filter-anggota-mahasiswa">
    </div>`)

    $(document).on('change', '#datatable-filter-kategori', function (e) {
        const val = $(this).val()
        if (!val){
            $('#datatable-filter-subkategori .row').html(`<option value="">Pilih Kategori Terlebih Dahulu</option>`)
            $('#datatable-filter-subkategori .row').selectpicker('destroy');
            $('#datatable-filter-subkategori .row').selectpicker();
            return
        }
        $.ajax({
            url: `${base_table}subkategori/${val}`,
            method: "GET",
            success: ({data}) => {
                let html = "<option value=''>Semua</option>"
                for (const {id, nama} of data) {
                    html += `<option value='${id}'>${nama}</option>`
                }
                $('#datatable-filter-subkategori .row').html(html)
                $('#datatable-filter-subkategori .row').selectpicker('destroy');
                $('#datatable-filter-subkategori .row').selectpicker();
                penelitianDataTable.ajax.reload()
            }
        })
    })

    $(document).on('change', '#penelitian-dataTable_filter select', function (e) {
        penelitianDataTable.ajax.reload()
    })

    let datatableFilterTimeout = null
    $('#penelitian-dataTable_filter input').bind('keyup keydown keypress change', function (e) {
        clearTimeout(datatableFilterTimeout)
        datatableFilterTimeout = setTimeout(() => penelitianDataTable.ajax.reload(), 300)
    })

    const kategoriDatatable = $('#kategori-dataTable').DataTable({
        processing: true,
        serverSide: false,
        ajax: {
            url: `${base_table}kategori`,
        },
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari berdasarkan nama kategori: "
        },
        columns: [
            {
                data: 'id', title: 'No', orderable: false, searchable: false, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {data: 'nama', title: 'Nama', searchable: true, orderable: true},
            {
                data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                    return `
                    <a href="${base_url}kategori/detail/${data}"  class="btn btn-primary"> Detail Subkategori </a>
                    <a href="${base_url}kategori/ubah/${data}"  class="btn btn-primary"> Ubah </a> 
                     <button data-id="${data}" class="btn btn-danger del" data-prefix-url="kategori" data-datatable-id="kategori-dataTable"> Hapus </button>`
                }
            }
        ]
    });

    const pathParts = window.location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];

    const subkategoriDatatable = $('#subkategori-dataTable').DataTable({
        processing: true,
        serverSide: false,
        ajax: {
            url: `${base_table}subkategori/${lastPart}`,
        },
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari berdasarkan nama :"
        },
        columns: [
            {
                data: 'id', title: 'No', orderable: false, searchable: false, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {data: 'nama', title: 'Nama', searchable: true, orderable: true},
            {
                data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                    return `
                    <a href="${base_url}kategori/detail/${lastPart}/ubah/${data}"  class="btn btn-primary"> Ubah </a> 
                     <button data-id="${data}" class="btn btn-danger del" data-prefix-url="subkategori" data-datatable-id="subkategori-dataTable"> Hapus </button>`
                }
            }
        ]
    });

    const adminDatatable = $('#admin-dataTable').DataTable({
        processing: true,
        serverSide: false,
        ajax: {
            url: `${base_table}admin`,
        },
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari berdasarkan nama :"
        },
        columns: [
            {
                data: 'id', title: 'No', orderable: false, searchable: false, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {data: 'username', title: 'Username', searchable: true, orderable: true},
            {
                data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                    return `
                    <a href="${base_url}admin/ubah/${data}"  class="btn btn-primary"> Ubah </a> 
                     <button data-id="${data}" class="btn btn-danger del" data-prefix-url="admin" data-datatable-id="admin-dataTable"> Hapus </button>`
                }
            }
        ]
    });

    $(document).on('click', '.del', async function () {
        const {isConfirmed} = await Swal.fire({
            title: "Apakah anda yakin ingin menghapus?",
            text: "Jika sudah di hapus, data tidak bisa di kembalikan kembali",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Tidak'
        })
        if (!isConfirmed) {
            return
        }
        const datatableId = $(this).data('datatable-id')
        const prefixUrl = $(this).data('prefix-url')
        const id = $(this).data('id')

        await $.ajax({
            url: `${base_api_url}${prefixUrl}/${id}`,
            method: 'DELETE'
        })

        switch (datatableId) {
            case 'penelitian-dataTable':
                penelitianDataTable.ajax.reload()
                break
            case 'kategori-dataTable':
                kategoriDatatable.ajax.reload()
                break
            case 'subkategori-dataTable':
                subkategoriDatatable.ajax.reload()
                break
            case 'dosen-dataTable':
                dosenDatatable.ajax.reload()
                break
            case 'mahasiswa-dataTable':
                mahasiswaDatatable.ajax.reload()
                break
            case 'admin-dataTable':
                adminDatatable.ajax.reload()
                break
        }

        toastr.success('Data berhasil di hapus', 'Sukses')
    })

    if ($('form#mahasiswa-excel-dropzone').length > 0) {
        new Dropzone('form#mahasiswa-excel-dropzone', {
            acceptedFiles: '.xlsx,.xls',
            init: function () {
                this.on("addedfile", function (file) {
                    if (!file.name.match(/(.xlsx|.xls)$/i)) {
                        this.removeFile(file);
                        toastr.error('Hanya file berekstensi .xlsx dan .xls yang diizinkan');
                    }
                });
                this.on("error", function (file, response) {
                    $(file.previewElement).addClass("dz-error").find('.dz-error-message').text(response.error.message);
                });
                this.on('success', function () {
                    mahasiswaDatatable.ajax.reload()
                })
            }
        });
    }

    if ($('form#dosen-excel-dropzone').length > 0) {
        new Dropzone('form#dosen-excel-dropzone', {
            acceptedFiles: '.xlsx,.xls',
            init: function () {
                this.on("addedfile", function (file) {
                    if (!file.name.match(/(.xlsx|.xls)$/i)) {
                        this.removeFile(file);
                        toastr.error('Hanya file berekstensi .xlsx dan .xls yang diizinkan');
                    }
                });
                this.on("error", function (file, response) {
                    $(file.previewElement).addClass("dz-error").find('.dz-error-message').text(response.error.message);
                });
                this.on('success', function () {
                    dosenDatatable.ajax.reload()
                })
            }
        });
    }

    if ($('form#penelitian-excel-dropzone').length > 0) {
        new Dropzone('form#penelitian-excel-dropzone', {
            acceptedFiles: '.xlsx,.xls',
            init: function () {
                this.on("addedfile", function (file) {
                    if (!file.name.match(/(.xlsx|.xls)$/i)) {
                        this.removeFile(file);
                        toastr.error('Hanya file berekstensi .xlsx dan .xls yang diizinkan');
                    }
                });
                this.on("error", function (file, response) {
                    $(file.previewElement).addClass("dz-error").find('.dz-error-message').text(response.error.message);
                });
                this.on('success', function () {
                    penelitianDataTable.ajax.reload()
                })
            }
        });
    }
});
