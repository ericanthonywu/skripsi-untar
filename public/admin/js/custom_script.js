$(document).ready(function () {
    function jsontocsvconverter(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        let CSV = '';
        //Set Report title in first row or line

        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            let row = "";

            //This loop will extract the label from 1st index of on array
            for (let index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (let i = 0; i < arrData.length; i++) {
            let row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (let index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        const fileName = ReportTitle.replace(' ', '_');

        //Initialize file format you want csv or xls
        let uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        let link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    $(document).on('change', '.exp_show', function () {
        const id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: `${base_url}stexp`,
            data: {
                id: id,
                st: $(this).is(':checked') ? 1 : 0,
                table: $(this).data('table')
            },
        })
    });

    $('#export').click(function (e) {
        const table = $(this).data('table');
        $.ajax({
            url: `${base_url}gettable`,
            data: {table: table},
            success: res => {
                const date = new Date();
                const d = date.getDay();
                const m = date.getMonth();
                const y = date.getFullYear();
                jsontocsvconverter(res, `Export ${d}-${m}-${y}`, true);
                $('#tbl' + table).KTDatatable().reload();
            }
        })
    });

    $(document).on('click', '.detmsg', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `${base_url}getdetmsg`,
            data: {
                id: id
            },
            success: res => {
                $('#detmessage #nama').html(res.nama);
                $('#detmessage .modal-body').html(res.message)
            }
        })
    });
});
