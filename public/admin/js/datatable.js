$(document).ready(function () {
    const penelitianDataTable = $('#penelitian-dataTable').DataTable({
        processing: true,
        serverSide: true,
        order: [[1, "asc"]],
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari berdasarkan nama penelitian: "
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
            }
        },
        columns: [
            {data: 'id', title: 'No', orderable: false, searchable: false, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }},
            {data: 'nama_proposal', title: 'Nama Proposal', searchable: true, orderable: true},
            {data: 'biaya', title: 'Biaya', searchable: true, orderable: true, render: data => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data)},
            {
                data: 'periode_awal',
                title: 'Periode',
                searchable: true,
                orderable: true,
                render: (data, _type, row) => {
                    return `${moment(row.periode_awal).format('MMM YYYY')} - ${moment(row.periode_akhir).format('MMM YYYY')}`
                }
            },
            {data: 'kategori_penelitian', title: 'Kategori Penelitian', searchable: true, orderable: true},
            {data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                return `<a href="${base_url}penelitian/ubah/${data}" target="_blank" class="btn btn-primary"> Ubah </a> 
                        <button data-id="${data}" class="btn btn-danger del" data-prefix-url="penelitian" data-datatable-id="penelitian-dataTable"> Hapus </button>`
                }}
        ]
    });

    const kategoriDatatable = $('#kategori-dataTable').DataTable({
        processing: true,
        serverSide: false,
        order: [[1, "asc"]],
        ajax: {
            url: `${base_table}kategori`,
        },
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari berdasarkan nama kategori: "
        },
        columns: [
            {data: 'id', title: 'No', orderable: false, searchable: false, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }},
            {data: 'nama', title: 'Nama', searchable: true, orderable: true},
            {data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                    return `
                    <a href="${base_url}kategori/detail/${data}" target="_blank" class="btn btn-primary"> Detail Subkategori </a>
                    <a href="${base_url}kategori/ubah/${data}" target="_blank" class="btn btn-primary"> Ubah </a> 
                     <button data-id="${data}" class="btn btn-danger del" data-prefix-url="kategori" data-datatable-id="kategori-dataTable"> Hapus </button>`
                }}
        ]
    });

    const pathParts = window.location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];

    const subkategoriDatatable = $('#subkategori-dataTable').DataTable({
        processing: true,
        serverSide: false,
        order: [[1, "asc"]],
        ajax: {
            url: `${base_table}subkategori/${lastPart}`,
        },
        language: {
            emptyTable: "Data tidak tersedia",
            zeroRecords: "Tidak ditemukan data yang cocok",
            search: "Cari berdasarkan nama :"
        },
        columns: [
            {data: 'id', title: 'No', orderable: false, searchable: false, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }},
            {data: 'nama', title: 'Nama', searchable: true, orderable: true},
            {data: 'id', title: 'Aksi', orderable: false, searchable: false, render: data => {
                    return `
                    <a href="${base_url}kategori/detail/${lastPart}/ubah/${data}" target="_blank" class="btn btn-primary"> Ubah </a> 
                     <button data-id="${data}" class="btn btn-danger del" data-prefix-url="subkategori" data-datatable-id="subkategori-dataTable"> Hapus </button>`
                }}
        ]
    });

    $(document).on('click', '.del', async function () {
        const {isConfirmed} = await Swal.fire({
            title: "Apakah kamu yakin ingin menghapus?",
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
        }

        toastr.success('Data berhasil di hapus', 'Sukses')
    })
});
