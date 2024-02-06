$(document).ready(function () {
    $('#mahasiswa-dataTable').DataTable({
        processing: true,
        serverSide: true,
        ajax: `${base_table}mahasiswa`,
        columns: [
            {data: 'id', title: 'Id'},
            {data: 'nama_mahasiswa', title: 'Nama Mahasiswa'},
            {data: 'nomor_induk_mahasiswa', title: 'Nomor Induk Mahasiswa'}
        ]
    });

    $("#mahasiswa-dataTable_filter label input").attr("placeholder", "Cari berdasarkan nama atau nim mahasiswa");
});
