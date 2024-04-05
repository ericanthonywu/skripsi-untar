$(document).ready(function () {
    $(document).on('change', 'select#kategori', function () {
        const val = $(this).val()
        const subkategoriSelector = $('select#subkategori')
        if (!val) {
            subkategoriSelector.html(`<option value="">- Pilih Sub Kategori -</option>`)
            subkategoriSelector.selectpicker('destroy'); // temporary patch!
            subkategoriSelector.selectpicker();
            return
        }

        $.ajax({
            url: `${base_api_url}subkategori/${val}`,
            type: 'GET',
            success: data => {
                subkategoriSelector.empty()
                subkategoriSelector.prop('disabled', false);
                if (data.length === 0) {
                    subkategoriSelector.prop('disabled', true);
                    subkategoriSelector.html(`<option value="">- Pilihan Subkategori Tidak Tersedia -</option>`)
                    subkategoriSelector.selectpicker('destroy'); // temporary patch!
                    subkategoriSelector.selectpicker();
                    return
                }
                for (const {id, nama} of data) {
                    subkategoriSelector.append(`<option value="${id}">${nama}</option>`)
                }
                subkategoriSelector.selectpicker('destroy'); // temporary patch!
                subkategoriSelector.selectpicker();
            }
        })
    })

    $('#periode_awal').on('change', function () {
        const selector = $('#periode_akhir')
        selector.prop('disabled', false)
        selector.datepicker('setStartDate', $(this).val());
    })

    $('form#submit_proposal').on('submit', function(e) {
        e.preventDefault();
        const data = new FormData(this)
        $.ajax({
            url: `${base_api_url}penelitian`,
            method: 'POST',
            data,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            success: () => {
                toastr.info('Data Penelitian Berhasil Di Tambah', 'Sukses')
                setTimeout(() => location.href = "/admin/penelitian", 1500)
            }
        })
    })

    $('form#submit_kategori').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}kategori`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Kategori Berhasil Di Tambah', 'Sukses')
                setTimeout(() => location.href = "/admin/kategori", 1500)
            }
        })
    })

    $('form#ubah_kategori').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}kategori`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Kategori Berhasil Di Tambah', 'Sukses')
                setTimeout(() => location.href = "/admin/kategori", 1500)
            }
        })
    })

    $('form#submit_subkategori').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}subkategori`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Subkategori Berhasil Di Tambah', 'Sukses')
                const id = $('input[name="id_master_kategori_penelitian"]').val()
                setTimeout(() => location.href = `/admin/kategori/detail/${id}`, 1500)
            }
        })
    })

    $('form#ubah_subkategori').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}subkategori`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Subkategori Berhasil Di Ubah', 'Sukses')
                const id = $('input#kategoriId').val()
                setTimeout(() => location.href = `/admin/kategori/detail/${id}`, 1500)
            }
        })
    })

    $('form#submit_dosen').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}dosen`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Dosen Berhasil Di Tambah', 'Sukses')
                setTimeout(() => location.href = `/admin/dosen`, 1500)
            }
        })
    })

    $('form#ubah_dosen').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}dosen`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Dosen Berhasil Di UBAH', 'Sukses')
                setTimeout(() => location.href = `/admin/dosen`, 1500)
            }
        })
    })

    $('form#submit_mahasiswa').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}mahasiswa`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Mahasiswa Berhasil Di Tambah', 'Sukses')
                setTimeout(() => location.href = `/admin/mahasiswa`, 1500)
            }
        })
    })

    $('form#ubah_mahasiswa').on('submit', function(e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}mahasiswa`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Mahasiswa Berhasil Di UBAH', 'Sukses')
                setTimeout(() => location.href = `/admin/mahasiswa`, 1500)
            }
        })
    })

    $("#list_dosen").on('change', function() {
        const selectedOptions = $(this).find('option:selected');

        let selectedTexts = $.map(selectedOptions ,function(option) {
            return option.text;
        });

        const val = $(this).val()

        let i = 0
        const selectorDosenKetua = $('#dosen_ketua')
        selectorDosenKetua.empty()
        selectorDosenKetua.append(`<option value="">- Pilih Ketua Dosen -</option>`)
        for (const id of val) {
            selectorDosenKetua.append(`<option value="${id}">${selectedTexts[i]}</option>`)
            i++
        }
        selectorDosenKetua.selectpicker('destroy');
        selectorDosenKetua.selectpicker();
    });

    $('#password-eye').on('click', function () {
        $(this).find('i').toggleClass('fa-eye-slash fa-eye');
        const passwordField = $("#password");
        const passwordFieldType = passwordField.attr('type');
        if(passwordFieldType === 'password'){
            passwordField.attr('type', 'text');
        } else {
            passwordField.attr('type', 'password');
        }
    })
});
