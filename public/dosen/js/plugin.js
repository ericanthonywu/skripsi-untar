$(document).ready(function () {
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function animasinomor(selector, angkaakhir, durasi, komanomor) {
        let angkaawal = $(selector).html() ? $(selector).val() : 0;
        $(selector).each(function () {
            $(this).prop('Counter', angkaawal).animate({
                Counter: angkaakhir
            }, {
                duration: durasi,
                easing: 'swing',
                step: now => {
                    if (komanomor === true) {
                        $(this).text(numberWithCommas(Math.ceil(now)));
                    } else {
                        $(this).text(Math.ceil(now));
                    }
                }
            });
        });
    }

    animasinomor('.anomate-nomor', $('.animate-nomor').text(), 300, true)

    function validatenohp(nomor) {
        var re = /^08[0-9]{9,}$/;
        return re.test(nomor)
    }

    function numberWithCommas(n) {
        var parts = n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }

    function priceCurrencyFormat(n) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data)
    }

    $("img").prop("draggable", false)
    $("#preventdef").click(function (e) {
        e.preventDefault();
    });
    function bindRibuan() {
        setTimeout(function () {
            $('.number').bind('keypress', function (event) {
                var regex = new RegExp("^[0-9]+$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                    event.preventDefault();
                    return false;
                }
            });

            $('.ribuan').keyup(function (event) {
                if (event.which >= 37 && event.which <= 40) return;
                // format number
                $(this).val(function (index, value) {
                    return value
                        .replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        ;
                });
                var id = $(this).data("id");
                var value = $(this).val();
                var noCommas = value.replace(/,/g, "");
                $('#' + id).val(noCommas);
            });
        }, 300)
    }
    bindRibuan()
    $('.alphanumeric').keypress(function (event) {
        var regex = new RegExp("^[a-zA-Z0-9]$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $('.valuevalidate').bind('keyup keypress', function validatevalue() {
        var max = $(this).data('max-val');
        var min = $(this).data('min-val');
        var alertt = $(this).attr('allow-alert');
        var value = $(this).val();
        if (value > max) {
            if (alertt === "true") {
                alert('angka tidak boleh lebih dari ' + max);
            }
            $(this).val(max);
        } else if (value < min) {
            if (alertt === "true") {
                alert('angka tidak boleh kurang dari ' + min);
            }
            $(this).val(min);
        }
    });

    $('.lengthvalidate').bind('keyup keypress keydown', function () {
        const max = $(this).data('max-length');
        const value = $(this).val();
        const alertt = $(this).attr('allow-alert');
        if (value.length > max) {
            if (alertt === "true") {
                toastr.warn('jumlah huruf tidak boleh lebih dari ' + max);
            }
            $(this).val(value.substring(0, max));
        }
    });

});