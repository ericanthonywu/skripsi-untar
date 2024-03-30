$(document).ready(function () {
    $('.selectpicker').selectpicker();

    $('.month-picker').datepicker({
        format: "MM yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true,
        language: "id"
    })

    $('.chosen-select').chosen({
        width: '100%',
        no_results_text: "Maaf, pencarian berikut tidak di temukan: "
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
const base_url = `${window.location.origin}/admin/`;
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
