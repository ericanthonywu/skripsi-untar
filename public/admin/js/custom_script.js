Dropzone.autoDiscover = false;
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

    $('form#submit_proposal').on('submit', function (e) {
        e.preventDefault();
        if ($('#list_dosen').find('span.text-danger').length > 0 || $('#list_mahasiswa').find('span.text-danger') > 0) {
            toastr.error('Harap mengisi data dengan lengkap terlebih dahulu')
            return
        }

        const data = new FormData(this)
        $.ajax({
            url: `${base_api_url}penelitian`,
            method: 'POST',
            data,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            success: () => {
                toastr.info('Data Penelitian Berhasil Ditambah', 'Sukses')
                setTimeout(() => location.href = "/admin/penelitian", 1500)
            }
        })
    })

    $('form#ubah_proposal').on('submit', function (e) {
        e.preventDefault();
        if ($('#list_dosen').find('span.text-danger').length > 0 || $('#list_mahasiswa').find('span.text-danger') > 0) {
            toastr.error('Harap mengisi data dengan lengkap terlebih dahulu')
            return
        }

        const data = new FormData(this)
        $.ajax({
            url: `${base_api_url}penelitian`,
            method: 'PATCH',
            data,
            processData: false,
            contentType: false,
            enctype: 'multipart/form-data',
            success: () => {
                toastr.info('Data Penelitian Berhasil Diubah', 'Sukses')
                setTimeout(() => location.href = "/admin/penelitian", 1500)
            }
        })
    })

    $('form#submit_kategori').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}kategori`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Kategori Berhasil Ditambah', 'Sukses')
                setTimeout(() => location.href = "/admin/kategori", 1500)
            }
        })
    })

    $('form#ubah_kategori').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}kategori`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Kategori Berhasil Diubah', 'Sukses')
                setTimeout(() => location.href = "/admin/kategori", 1500)
            }
        })
    })

    $('form#submit_subkategori').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}subkategori`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Subkategori Berhasil Ditambah', 'Sukses')
                const id = $('input[name="id_master_kategori_penelitian"]').val()
                setTimeout(() => location.href = `/admin/kategori/detail/${id}`, 1500)
            }
        })
    })

    $('form#ubah_subkategori').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}subkategori`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Subkategori Berhasil Diubah', 'Sukses')
                const id = $('input#kategoriId').val()
                setTimeout(() => location.href = `/admin/kategori/detail/${id}`, 1500)
            }
        })
    })

    $('form#submit_dosen').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}dosen`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Dosen Berhasil Ditambah', 'Sukses')
                setTimeout(() => location.href = `/admin/dosen`, 1500)
            }
        })
    })

    $('form#ubah_dosen').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}dosen`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Dosen Berhasil Diubah', 'Sukses')
                setTimeout(() => location.href = `/admin/dosen`, 1500)
            }
        })
    })

    $('form#submit_mahasiswa').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}mahasiswa`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Mahasiswa Berhasil Ditambah', 'Sukses')
                setTimeout(() => location.href = `/admin/mahasiswa`, 1500)
            }
        })
    })

    $('form#submit_admin').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}admin`,
            method: 'POST',
            data,
            success: () => {
                toastr.info('Data Admin Berhasil Ditambah', 'Sukses')
                setTimeout(() => location.href = `/admin/admin`, 1500)
            }
        })
    })

    $('form#ubah_admin').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}admin`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Admin Berhasil Diubah', 'Sukses')
                setTimeout(() => location.href = `/admin/admin`, 1500)
            }
        })
    })

    $('form#ubah_mahasiswa').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}mahasiswa`,
            method: 'PATCH',
            data,
            success: () => {
                toastr.info('Data Mahasiswa Berhasil Diubah', 'Sukses')
                setTimeout(() => location.href = `/admin/mahasiswa`, 1500)
            }
        })
    })

    $('#add-dosen').click(function (e) {
        $('#list_dosen').append(`<div class="col-sm-12 row">
                                <div class="col-sm-11">
                                    <select type="text" name="list_dosen[]" class="form-control input-dosen dosen-select-search">
                                </select>
                                    <span></span>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-outline-danger delete-dynamic-form">
                                    <i class="fa fa-trash"></i></button>
                                </div>
                            </div>`)

        $('.dosen-select-search').select2({
            ajax: {
                url: `${base_api_url}dosen/search`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const values = [];
                    values.push($('#ketua_penelitian').val())

                    $('.dosen-select-search').each(function() {
                        values.push($(this).val());
                    });
                    return {
                        search: params.term, // search term
                        exclude: values
                    };
                },
                processResults: function (data) {
                    return {
                        results: $.map(data.data, function(item) {
                            return {
                                text: item.nama_dosen,
                                id: item.nomor_induk_dosen_nasional
                            }
                        }),
                    };
                },
                cache: true
            },
            placeholder: 'Ketik untuk mencari dengan Nama atau NIDN Dosen',
            minimumInputLength: 1,
        })
    })

    $(document).on('click', '.delete-dynamic-form', function (e) {
        $(this).parent().parent().remove()
    })

    $('#add-mahasiswa').click(function (e) {
        $('#list_mahasiswa').append(`<div class="col-sm-12 row">
                                <div class="col-sm-11">
                                    <select type="text" name="list_mahasiswa[]" class="form-control input-mahasiswa mahasiswa-select-search">
                                </select>
                                    <span></span>
                                </div>
                                <div class="col-sm-1">
                                    <button type="button" class="btn btn-outline-danger delete-dynamic-form">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>`)

        $('.mahasiswa-select-search').select2({
            ajax: {
                url: `${base_api_url}mahasiswa/search`,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    const values = [];

                    $('.mahasiswa-select-search').each(function() {
                        values.push($(this).val());
                    });
                    return {
                        search: params.term, // search term
                        exclude: values
                    };
                },
                processResults: function (data) {
                    return {
                        results: $.map(data.data, function(item) {
                            return {
                                text: item.nama_mahasiswa,
                                id: item.nomor_induk_mahasiswa
                            }
                        }),
                    };
                },
                cache: true
            },
            placeholder: 'Ketik untuk mencari dengan Nama atau NIM Mahasiswa',
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 1,
        })
    })

    $(document).on('click', '.delete-dosen', function (e) {
        $(this).parent().parent().remove()
    })

    $('.password-eye').on('click', function () {
        $(this).find('i').toggleClass('fa-eye-slash fa-eye');
        const passwordField = $(this).parent().find('input[type=password], input[type=text]');
        const passwordFieldType = passwordField.attr('type');
        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
        } else {
            passwordField.attr('type', 'password');
        }
    })

    $('#cancel-penelitian').on('click', async function () {
        const id = $(this).data('id')

        const {isConfirmed} = await Swal.fire({
            title: "Apakah anda yakin ingin membatalkan penelitian ini?",
            text: "Jika sudah di batalkan, data tidak bisa di kembalikan lagi",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, batalkan!',
            cancelButtonText: 'Tidak'
        })
        if (!isConfirmed) {
            return
        }

        await $.ajax({
            method: 'PATCH',
            url: `${base_api_url}penelitian/cancel/${id}`
        })

        location.href = `${base_url}penelitian`
    });

    $('#form-ubah-password').on('submit', function (e) {
        e.preventDefault()
        const data = $(this).serialize()
        $.ajax({
            url: `${base_api_url}auth/change-password`,
            data,
            success: () => {
                $('#form-ubah-password input').val("")
                toastr.success('Password berhasil diubah', 'Success')
                $('#changePasswordModal').modal('hide')
            }
        })
    })

    $('.read_notif').click(function() {
        $.ajax({
            method: 'POST',
            url: `${base_api_url}notif/read`,
            data: {
                id: $(this).data('id')
            },
        }).done(() => {
            location.href = $(this).data('href')
        })
    })
})