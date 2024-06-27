const axios = require("axios");
const fs = require("fs");
const {addMultipleDosen} = require("../services/dosenServices");
const {updateProdiByNidn} = require("../repository/dosenRepository");

axios.interceptors.response.use(data => data.data)

exports.sync = async () => {
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
                    console.log(`data prodi ${i}/${list_data_prodi.length}, data dosen ${ia}/${list_dosen.datadosen.length}`)
                    const {
                        dataumum: {
                            nm_sdm: nama_dosen,
                            namaprodi,
                            namapt,
                            statuskeaktifan
                        }
                    } = await axios.get(`https://api-frontend.kemdikbud.go.id/detail_dosen/${dosen.id}`)
                    if (statuskeaktifan === 'Aktif') {
                        const searchParam = `${nama_dosen} ${namapt} ${namaprodi}`
                        const list_data_search_dosen = await axios.get(`https://api-frontend.kemdikbud.go.id/hit/${encodeURI(searchParam)}`)

                        const nomor_induk_dosen_nasional = list_data_search_dosen.dosen[0].text.split(", ")[1].split(" : ")[1]

                        await updateProdiByNidn(nomor_induk_dosen_nasional, namaprodi)
                        console.log(`nidn: ${nomor_induk_dosen_nasional} milik ${nama_dosen} terupdate dengan prodi ${namaprodi}`)
                        // data.push({
                        //     nama_dosen,
                        //     nomor_induk_dosen_nasional,
                        //     nomor_induk_pegawai: "",
                        //     email: await this.syncEmailDosen(nama_dosen)
                        // })
                    }
                    console.log(`selesai data prodi ${i}/${list_data_prodi.length}, data dosen ${ia}/${list_dosen.datadosen.length}`)
                    ia++
                }
                console.log(`selesai mengambil data prodi ${i}/${list_data_prodi.length}`)
                i++
            }
        }

        console.log(data)

        fs.writeFile("data-dosen-with-email.json", JSON.stringify(data), 'utf8', function (err) {
            if (err) {
                console.log("An error occurred while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
    } catch (e) {
        console.log("axios error", e)
    }
}

exports.syncEmailbyFile = () => {
    fs.readFile("data-dosen-with-email.json", 'utf-8', async (err, jsonString) => {
        const data = JSON.parse(jsonString)

        let i = 0;
        for (const {nama_dosen, email} of data) {
            if (email !== "") {
                // console.log(`${i + 1}/${data.length} skipped because email already exists`)
                i++
                continue
            }
            data[i].email = await this.syncEmailDosen(nama_dosen)
            console.log(`${i + 1}/${data.length} done keyword for ${nama_dosen} found: ${data[i].email}`)
            i++
        }

        fs.writeFile("data-dosen-with-email.json", JSON.stringify(data), 'utf8', function (err) {
            if (err) {
                console.log("An error occurred while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
    })
}

exports.syncEmailDosen = async (keyword) => {
    try {
        const data = await getEmailFromTeams(keyword)

        if (data.Groups.length > 0) {
            for (const list of data.Groups[0].Suggestions) {
                if (list.QueryText) {
                    const subdomain = list.QueryText.split("@")[1]
                    if (subdomain !== "stu.untar.ac.id") {
                        return list.QueryText
                    }
                }
            }
        } else {
            if (keyword.split(" ").length === 3) {
                const [key1, key2, key3] = keyword.split(" ")
                const retryFindEmail = await this.syncEmailDosen(key1 + " " + key3)
                if (retryFindEmail !== "") {
                    return retryFindEmail
                }

                const retryFindEmail2 = await this.syncEmailDosen(key1 + " " + key2)
                if (retryFindEmail2 !== "") {
                    return retryFindEmail2
                }

                const retryFindEmail3 = await this.syncEmailDosen(key2 + " " + key3)
                if (retryFindEmail3 !== "") {
                    return retryFindEmail3
                }
            }

            console.log('keyword yang tidak tersedia:', keyword)
        }

        return ""
    } catch (e) {
        if (e.CODE === "ETIMEDOUT") {
            console.log("timeout for keyword:", keyword, "retrying...")
            this.syncEmailDosen(keyword)
        } else {
            throw e
        }
    }
}

const getEmailFromTeams = async keyword =>
    await axios.post(`https://substrate.office.com/search/api/v1/suggestions?scenario=powerbar`, {
        EntityRequests: [
            {
                Query: {
                    QueryString: keyword,
                    DisplayQueryString: keyword
                },
                EntityType: "People",
                Size: 5,
                Fields: [
                    "Id",
                    "MRI",
                    "DisplayName",
                    "EmailAddresses",
                    "CompanyName",
                    "JobTitle",
                    "ImAddress",
                    "ExternalDirectoryObjectId",
                    "PeopleType",
                    "PeopleSubtype",
                    "Phones",
                    "ConcatenatedId",
                    "UserPrincipalName",
                    "GivenName",
                    "Surname",
                    "Cid"
                ],
                Filter: {
                    And: [
                        {
                            Or: [
                                {
                                    Term: {
                                        PeopleType: "Person"
                                    }
                                },
                                {
                                    Term: {
                                        PeopleType: "Other"
                                    }
                                }
                            ]
                        },
                        {
                            Or: [
                                {
                                    Term: {
                                        PeopleSubtype: "OrganizationUser"
                                    }
                                },
                                {
                                    Term: {
                                        PeopleSubtype: "Guest"
                                    }
                                }
                            ]
                        }
                    ]
                },
                Provenances: [
                    "Mailbox",
                    "Directory"
                ],
                From: 0
            },
            {
                Query: {
                    QueryString: keyword
                },
                EntityType: "File",
                Size: 3
            },
            {
                Query: {
                    QueryString: keyword
                },
                EntityType: "Chat",
                Size: 5
            },
            {
                Query: {
                    QueryString: keyword
                },
                EntityType: "Team",
                Size: 3
            },
            {
                Query: {
                    QueryString: keyword
                },
                EntityType: "Channel",
                Size: 4,
                Filter: {
                    Or: [
                        {
                            Term: {
                                ChannelType: "Standard"
                            }
                        },
                        {
                            Term: {
                                ChannelType: "Shared"
                            }
                        }
                    ]
                }
            },
            {
                Query: {
                    QueryString: keyword
                },
                EntityType: "Text",
                Size: 2
            }
        ],
        Scenario: {
            Name: "powerbar"
        },
        Cvid: "d6312083-f2b2-4336-a4b6-de58e4d4df84",
        AppName: "Microsoft Teams",
        LogicalId: "d02e7610-6884-4c6f-b77f-b4eb088c5484"
    }, {
        headers: {
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IlBfOFBod1JWd0NYbEdaeFl4QkFCYnRpMHRZdU1EQ2ZrUnF5ald6cU1TdDgiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL291dGxvb2sub2ZmaWNlLmNvbS9zZWFyY2giLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hMTY0N2MzMC1hNDViLTRmZTMtODg4MS1kZDY4NmEyNWI0NzYvIiwiaWF0IjoxNzE0NTY2ODI2LCJuYmYiOjE3MTQ1NjY4MjYsImV4cCI6MTcxNDU3NTg4NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQXdQd1pEOHh1RkorZVN6NFpmbVFRVUg3amtIRkJ1UnVyWG14T3NkVzRsR3hjMjVjVEt2ajNQdE1yUFNXKy9wSmQiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiNWUzY2U2YzAtMmIxZi00Mjg1LThkNGItNzVlZTc4Nzg3MzQ2IiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJBTlRIT05ZIiwiZ2l2ZW5fbmFtZSI6IkVSSUMiLCJpcGFkZHIiOiIxMDMuMjYuMjA5LjE3NyIsIm5hbWUiOiJFUklDIEFOVEhPTlkiLCJvaWQiOiIxMmE1NTZjYi00MjZmLTQzOTYtYmQ2Yy1mYTI0ZjRjNTJkYzIiLCJwdWlkIjoiMTAwMzIwMDBENjI3MEZCNSIsInJoIjoiMC5BVlVBTUh4a29WdWs0MC1JZ2Qxb2FpVzBkbGVIcUdhTUpYSk1pVHctaS0xTmFKbV9BRkUuIiwic2NwIjoiU3Vic3RyYXRlU2VhcmNoLUludGVybmFsLlJlYWRXcml0ZSIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6ImZZTEl6OHNZaWJ1MnZUUzJwUXc0aXh1bFRad3BMSzU5TGhkQUpjNzk4c2MiLCJ0aWQiOiJhMTY0N2MzMC1hNDViLTRmZTMtODg4MS1kZDY4NmEyNWI0NzYiLCJ1bmlxdWVfbmFtZSI6ImVyaWMuODI1MjAwMDUwQHN0dS51bnRhci5hYy5pZCIsInVwbiI6ImVyaWMuODI1MjAwMDUwQHN0dS51bnRhci5hYy5pZCIsInV0aSI6IjNNTFdPT0tFdmtLd181a0dscVZYQWciLCJ2ZXIiOiIxLjAifQ.V9Qot24nGoQrbKcDigm-F6UXWKX3CTNGK0JlpkQiVFFcRo7xGicbitCax7aEjH4Ub2F6Q3vIv_vV8mwsDLNcEqBbyzXRCXj71NjZukwPwCHGwY7iBMdIaFZwpNDUvIGxCxDHYIdlW0w-XGsWl977uecPeyDdkXTPMdkwSjlf7FmxJDVy2IjFr_qi_SwRcV-O6aDF3ZTXhvmH5W7ATE3M128BLILOiNTw1PQ_uqwUF0ZGMjjDivhsOMOe0YK289oFLRkQeFZPQcRs1lQwG_Z1gsJaC2k6JTyTzlCatNY_Xn7HpUQaMwA-ywEqFslxg96Aq25vxaCnwykALVhByuGwiA"
        }
    })

exports.insertJsonFileToDB = async () => {
    fs.readFile("data-dosen-with-email.json", 'utf-8', async (err, jsonString) => {
        const list_data = JSON.parse(jsonString)

        let i = 0;
        for (const data of list_data) {
            if (data.email === "") {
                list_data[i].email = `dosen${i}@untar.ac.id`
            }
            list_data[i].password = "test"
            list_data[i].nomor_induk_pegawai = (i + 1).toString().padStart(4, '0')
            i++
        }

        await addMultipleDosen(list_data)
    })
}