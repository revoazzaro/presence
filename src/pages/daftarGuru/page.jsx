import React from 'react'
import { ApiSiswa } from '../../libs/api'
import Table from '../../components/table/page'

const DaftarGuru = async() => {

    const Siswa = await ApiSiswa([])

  return (
    <>
        <Table/>
    </>
  )
}

export default DaftarGuru
