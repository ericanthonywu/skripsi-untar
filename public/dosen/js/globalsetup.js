$(document).ready(function () {
    $('form select:not(.dosen-select-search):not(.mahasiswa-select-search)').selectpicker();

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

    $('.month-picker').datepicker({
        format: "MM yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true,
        language: "id"
    })

    $('#filter-tahun-biaya-penelitian').datepicker({
        format: "yyyy",
        startView: "years",
        minViewMode: "years",
        autoclose: true,
        language: "id",
        startDate: $('#filter-tahun-biaya-penelitian').data('min-year')?.toString(),
        endDate: $('#filter-tahun-biaya-penelitian').data('max-year')?.toString()
    })

    $('#filter-tahun-rekap-penelitian').datepicker({
        format: "yyyy",
        startView: "years",
        minViewMode: "years",
        autoclose: true,
        language: "id",
        startDate: $('#filter-tahun-rekap-penelitian').data('min-year')?.toString(),
        endDate: $('#filter-tahun-rekap-penelitian').data('max-year')?.toString()
    })

    $('.year-picker').datepicker({
        format: "yyyy",
        startView: "years",
        minViewMode: "years",
        autoclose: true,
        language: "id",
    });

    $('input[type="file"]').on('change', function () {
        const fileName = $(this).val().split('\\').pop();
        $(this).parent().find('.custom-file-label').text(fileName)
        const nextFileUpload = $(this).parent().parent().next()
        if (nextFileUpload) {
             nextFileUpload.find('input[type="file"]')
                 .prop('disabled', false)
            nextFileUpload.find('span').html('')
        }
    })
});

// Global Variable
const base_url = `${window.location.origin}/dosen/`;
const base_api_url = `${base_url}api/`;
const base_file = `${window.location.origin}uploads/`;
const base_table = `${base_api_url}table/`;

//Global Default Toastr
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

//Global Default Ajax
$.ajaxSetup({
    type: "POST",
    cache: false,
    error: xhr => {
        console.log(xhr.responseJSON)
        switch (xhr.status) {
            case 404:
                toastr.error('api not found', 'Error');
                break
            case 419:
                sessionStorage.setItem('nextURL', window.location.href);
                location.href = base_url;
                break
            default:
                toastr.error(xhr.responseJSON?.error?.message || 'unknown error', 'Error');
        }
    }
});
