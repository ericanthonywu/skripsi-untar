$(document).ready(function () {
    const penelitianDataTable = $('#penelitian-dataTable').DataTable({
        processing: true,
        serverSide: true,
        order: [[1, "asc"]],
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
            {data: 'id', title: 'Id', orderable: false, searchable: false},
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

    $("#penelitian-dataTable_filter label input").attr("placeholder", "Cari berdasarkan nama penelitian");

    $(document).on('click', '.del', function () {
        const datatableId = $(this).data('datatable-id')
        const prefixUrl = $(this).data('prefix-url')
        const id = $(this).data('id')

        $.ajax({
            url: `${base_api_url}${prefixUrl}/${id}`,
            method: 'DELETE'
        })

        switch (datatableId){
            case 'penelitian-dataTable':
                penelitianDataTable.ajax.reload()
        }
    })
});
