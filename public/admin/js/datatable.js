$(document).ready(function () {
    $('#penelitian-dataTable').DataTable({
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
            {data: 'harga', title: 'Harga', searchable: true, orderable: true, render: data => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data)},
            {
                data: 'periode_awal',
                title: 'Periode',
                searchable: true,
                orderable: true,
                render: (data, _type, row) => {
                    return `${moment(row.periode_awal).format('MMM YYYY')} - ${moment(row.periode_akhir).format('MMM YYYY')}`
                }
            },
            {data: 'kategori_penelitian', title: 'Kategori Penelitian', searchable: true, orderable: true}
        ]
    });

    $("#penelitian-dataTable_filter label input").attr("placeholder", "Cari berdasarkan nama penelitian");
});
