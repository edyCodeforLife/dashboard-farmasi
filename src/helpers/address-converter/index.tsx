const AddressFormater = (params: any) => {
  return `${params?.street || '-'}, RT/RW ${params?.rt_rw || '-'}, Kel. ${params?.sub_district?.name || '-'}, Kec. ${params?.district?.name || '-'}, Kota ${params?.city?.name || '-'}, Provinsi ${params?.province?.name || ''}, Kode Pos ${params?.sub_district?.postal_code || ''}`;
};

export default AddressFormater;
