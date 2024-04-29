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
                setTimeout(() => location.href = "/dosen/penelitian", 1500)
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
                setTimeout(() => location.href = "/dosen/penelitian", 1500)
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
                setTimeout(() => location.href = "/dosen/kategori", 1500)
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
                toastr.info('Data Kategori Berhasil Ditambah', 'Sukses')
                setTimeout(() => location.href = "/dosen/kategori", 1500)
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
                setTimeout(() => location.href = `/dosen/kategori/detail/${id}`, 1500)
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
                setTimeout(() => location.href = `/dosen/kategori/detail/${id}`, 1500)
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
                setTimeout(() => location.href = `/dosen/dosen`, 1500)
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
                setTimeout(() => location.href = `/dosen/dosen`, 1500)
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
                setTimeout(() => location.href = `/dosen/mahasiswa`, 1500)
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
                setTimeout(() => location.href = `/dosen/admin`, 1500)
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
                setTimeout(() => location.href = `/dosen/admin`, 1500)
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
                setTimeout(() => location.href = `/dosen/mahasiswa`, 1500)
            }
        })
    })

    $('#add-dosen').click(function (e) {
        $('#list_dosen').append(`<div class="col-sm-12 row">
                                <div class="col-sm-10">
                                    <input type="text" class="form-control input-dosen" name="list_dosen[]" placeholder="Masukan NIDN Dosen" required>
                                    <span></span>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-outline-danger delete-dynamic-form">
                                    <i class="fa fa-trash"></i></button>
                                </div>
                            </div>`)
    })

    $(document).on('click', '.delete-dynamic-form', function (e) {
        $(this).parent().parent().remove()
    })

    $('#add-mahasiswa').click(function (e) {
        $('#list_mahasiswa').append(`<div class="col-sm-12 row">
                                <div class="col-sm-10">
                                    <input type="text" class="form-control input-mahasiswa" name="list_mahasiswa[]" placeholder="Masukan NIM Mahasiswa" required>
                                    <span></span>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-outline-danger delete-dynamic-form">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>`)
    })

    $(document).on('click', '.delete-dosen', function (e) {
        $(this).parent().parent().remove()
    })

    let dosenTimeout = null;
    $(document).on('keyup', '.input-dosen', function (e) {
        clearTimeout(dosenTimeout);
        const val = $(this).val()

        if (!val) {
            $(this).parent().find('span').text('').removeClass('text-success').removeClass('text-danger')
            return
        }

        dosenTimeout = setTimeout(() => {
            $.ajax({
                url: `${base_api_url}dosen/check`,
                method: 'POST',
                data: {nisn: val},
                success: ({data}) => {
                    if (data) {
                        $(this).parent().find('span').removeClass('text-danger').addClass('text-success').text(`NIDN milik ${data.nama_dosen}`)
                    } else {
                        $(this).parent().find('span').removeClass('text-success').addClass('text-danger').text('NIDN tidak tersedia')
                    }
                }
            })
        }, 350);
    })

    let mahasiswaTimeout = null
    $(document).on('keyup', '.input-mahasiswa', function (e) {
        clearTimeout(mahasiswaTimeout)
        const val = $(this).val()

        if (!val) {
            $(this).parent().find('span').text('').removeClass('text-success').removeClass('text-danger')
            return
        }

        mahasiswaTimeout = setTimeout(() => {
            $.ajax({
                url: `${base_api_url}mahasiswa/check`,
                method: 'POST',
                data: {nim: val},
                success: ({data}) => {
                    if (data) {
                        $(this).parent().find('span').removeClass('text-danger').addClass('text-success').text(`NIM milik ${data.nama_mahasiswa}`)
                    } else {
                        $(this).parent().find('span').removeClass('text-success').addClass('text-danger').text('NIM tidak tersedia')
                    }
                }
            })
        }, 350);
    })

    $('#password-eye').on('click', function () {
        $(this).find('i').toggleClass('fa-eye-slash fa-eye');
        const passwordField = $("#password");
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
})