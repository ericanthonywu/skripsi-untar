const axios = require('axios')

const rajaOngkirAxios = axios.create({
    baseURL: "https://pro.rajaongkir.com/api/",
    timeout: 30000,
    headers: {key: process.env.RAJA_ONGKIR_API_KEY}
})

rajaOngkirAxios.interceptors.response.use(response =>
    response.data.rajaongkir.results
)

exports.rajaOngkirAxios = rajaOngkirAxios