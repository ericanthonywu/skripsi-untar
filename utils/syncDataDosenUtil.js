const axios = require("axios");
const fs = require("fs");

exports.sync = async () => {
    axios.interceptors.response.use(data => data.data)
    try {
        const list_data_prodi = await axios.get('https://api-frontend.kemdikbud.go.id/v2/detail_pt_prodi/Q0U4NUIzQTYtNTIwNS00QjlCLTg1N0YtQThBNkQ3NzcwRDlE')

        let data = []
        let i = 1;
        for (const data_prodi of list_data_prodi) {
            if (data_prodi.stat_prodi === "Aktif") {
                console.log(`mengambil data prodi ${i}/${list_data_prodi.length}`)
                const list_dosen = await axios.get(`https://api-frontend.kemdikbud.go.id/detail_prodi/${data_prodi.id_sms}/20231`)
                let ia = 1
                for (const dosen of list_dosen.datadosen) {
                    const {
                        dataumum: {
                            nm_sdm: nama_dosen,
                            namaprodi,
                            namapt,
                            statuskeaktifan
                        }
                    } = await axios.get(`https://api-frontend.kemdikbud.go.id/detail_dosen/${dosen.id}`)

                    if (statuskeaktifan === 'Aktif') {
                        console.log(`data prodi ${i}/${list_data_prodi.length}, data dosen ${ia}/${list_dosen.datadosen.length}`)

                        const searchParam = `${nama_dosen} ${namapt} ${namaprodi}`
                        const list_data_search_dosen = await axios.get(`https://api-frontend.kemdikbud.go.id/hit/${encodeURI(searchParam)}`)

                        const nomor_induk_dosen_nasional = list_data_search_dosen.dosen[0].text.split(", ")[1].split(" : ")[1]
                        data.push({
                            nama_dosen,
                            nomor_induk_dosen_nasional,
                            nomor_induk_pegawai: "",
                            email: ""
                        })
                        console.log(`selesai data prodi ${i}/${list_data_prodi.length}, data dosen ${ia}/${list_dosen.datadosen.length}`)
                        ia++
                    }
                }
                console.log(`selesai mengambil data prodi ${i}/${list_data_prodi.length}`)
                i++
            }
        }

        console.log(data)

        fs.writeFile("data-dosen.json", JSON.stringify(data), 'utf8', function (err) {
            if (err) {
                console.log("An error occurred while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
    } catch (e) {
        console.log("axios error", e.response)
    }
}