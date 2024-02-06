$(document).ready(function () {
    $('.selectpicker').selectpicker();
    // $('.summernote').summernote({
    //     minHeight:"150px"
    // });
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
        console.log(xhr)
        console.log(xhr.responseJSON.error.message);
        toastr.error(xhr.responseJSON.error.message, 'Error');

    },
    complete: xhr => {
        if (xhr.status === 419) {
            sessionStorage.setItem('nextURL', window.location.href);
            location.href = base_url;
        }
    }
});
