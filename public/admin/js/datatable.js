$(document).ready(function () {
    $('#mahasiswa-dataTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: `${base_table}mahasiswa`,
            data: function (d) {
                if(d.order[0]){
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
            {data: 'nama_mahasiswa', title: 'Nama Mahasiswa', searchable: true, orderable: true},
            {data: 'nomor_induk_mahasiswa', title: 'Nomor Induk Mahasiswa', searchable: true, orderable: true}
        ]
    });

    $("#mahasiswa-dataTable_filter label input").attr("placeholder", "Cari berdasarkan nama atau nim mahasiswa");

    $('#dosen-dataTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: `${base_table}dosen`,
            data: function (d) {
                if(d.order[0]){
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
            {data: 'nama_dosen', title: 'Nama Dosen', searchable: true, orderable: true},
            {data: 'nomor_induk_dosen', title: 'Nomor Induk Dosen', searchable: true, orderable: true}
        ]
    });

    $("#dosen-dataTable_filter label input").attr("placeholder", "Cari berdasarkan nama atau nim mahasiswa");
});
