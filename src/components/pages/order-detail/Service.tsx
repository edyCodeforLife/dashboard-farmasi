import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import ServiceComplaintProcessed from '@services/api/ServiceComplaintProcessed';
import ServiceComplaintAccepted from '@services/api/ServiceComplaintAccepted';
import ServiceOrderProcessed from '@services/api/ServiceOrderProcessed';
import ServiceOrderAccepted from '@services/api/ServiceOrderAccepted';
import ServiceOrderArrived from '@services/api/ServiceOrderArrived';
import ServiceOrderPickup from '@services/api/ServiceOrderPickup';
import ServiceOrderDetail from '@services/api/ServiceOrderDetail';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import ServiceOrderSend from '@services/api/ServiceOrderSend';
import ServicePartner from '@services/api/ServicePartners';
import ServiceHistory from '@services/api/ServiceHistory';
import ServiceUpload from '@services/api/ServiceUpload';
import errorCatcher from '@helpers/error-catcher';
import { DayFormat } from '@helpers/date';

const Service = () => {
  interface AddressChildObj {
    id: string;
    name: string;
    code?: string;
    geoArea?: string;
    postalCode?: string;
  }

  interface DeliveryAddress {
    addressFormatter: string;
    city: AddressChildObj;
    country: AddressChildObj;
    district: AddressChildObj;
    id: string;
    latitude: string;
    longitude: string;
    province: AddressChildObj;
    receiverName: string;
    receiverPhone: string;
    rtRw: string;
    street: string;
    subDistrict: AddressChildObj;
  }

  interface User {
    deliveryAddress: DeliveryAddress;
    birthCountry: string;
    birthDate: string;
    birthPlace: string;
    email: string;
    firstName: string;
    fullName: string;
    gender: string;
    lastName: string;
    phone: string;
  }

  interface Complaint {
    note: string;
    images: Array<string>[];
  }

  interface PricesChildObj {
    raw: number;
    formatted: string;
  }

  interface Prices {
    serviceFee: PricesChildObj;
    courierFee: PricesChildObj;
    productFee: PricesChildObj;
    total: PricesChildObj;
  }

  interface Order {
    id: string;
    user: User;
    qty: string;
    courier: any;
    products: any;
    status: string;
    prices: Prices;
    partner: string;
    orderCode: string;
    skuProducts: string;
    nameProducts: string;
    complaint: Complaint;
    transactionCode: string;
  }

  interface Partner {
    label: string;
    value: string;
  }

  interface ImageComplaint {
    id: string;
    url: string;
  }

  interface IComplaint {
    id: number;
    note: string;
    images: Array<ImageComplaint>;
  }

  const params = useParams();
  const { uploader } = ServiceUpload();
  const { getHistory } = ServiceHistory();
  const { getPartners } = ServicePartner();
  const { sendOrder } = ServiceOrderPickup();
  const { orderArrived } = ServiceOrderSend();
  const { getOrderDetail } = ServiceOrderDetail();
  const { processOrder } = ServiceOrderAccepted();
  const { pickupOrder } = ServiceOrderProcessed();
  const { makeComplaint } = ServiceOrderArrived();
  const { completedComplaint } = ServiceComplaintProcessed();
  const fileLocation = 'components/pages/order-detail/Service.tsx';
  const { processComplaint, rejectComplaint, refundComplaint } = ServiceComplaintAccepted();

  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [orderHistory, setOrderHistory] = useState<any>(null);
  const [partner, setPartner] = useState<any>(null);
  const [partners, setPartners] = useState<Partner[] | []>([]);
  const [code, setCode] = useState<string>('');
  const [complaint, setComplaint] = useState<any>(null);
  const [warning, setWarning] = useState({ message: '', type: '' });
  const [complaints, setComplaints] = useState([
    { label: 'Diterima', value: 'PROCESS_COMPLAINT' },
    { label: 'Ditolak', value: 'REJECT_COMPLAINT' },
    { label: 'Direfund', value: 'REFUND' },
  ]);

  const [complained, setComplained] = useState(false);
  const [complaintPayload, setComplaintPayload] = useState<IComplaint>({
    id: 0,
    note: '',
    images: [],
  });

  const addressFormatter = (address: any) => (`
    ${address.street},
    RT/RW ${address.rtRw}
    Kel. ${address.subDistrict?.name || '-'},
    Kec. ${address.district?.name || '-'},
    Kota ${address.city?.name || '-'},
    Provinsi ${address.province?.name || '-'},
    Kode Pos ${address.subDistrict?.postalCode || '-'}
  `);

  const getListPartner = async () => {
    try {
      const result: any = await getPartners();
      const mapped = result?.map((item: any) => ({
        value: item.partner_id,
        label: item.name,
      })) || [];

      setPartners(mapped);
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'getListPartner' });
      setWarning({ message: `Partner: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  const selectPartner = (id: number) => {
    const found: any = partners?.find((item: any) => item?.value === id);
    setPartner(found || null);
  };

  const orderDetail = async () => {
    try {
      const result: any = await getOrderDetail(params.id);
      const resultToCamelCase: any = ObjectToCamelCase(result);

      const pricesToCamelCase: any = ObjectToCamelCase(resultToCamelCase?.prices);

      const userToCamelCase: any = (
        ObjectToCamelCase(resultToCamelCase?.user) || null
      );

      const deliveryAddressToCamelCase: any = (
        ObjectToCamelCase(userToCamelCase?.deliveryAddress) || null
      );

      const subDistrictToCamelCase: any = (
        ObjectToCamelCase(deliveryAddressToCamelCase?.subDistrict) || null
      );

      const partnerToCamelCase: any = (
        ObjectToCamelCase(resultToCamelCase?.partner) || null
      );

      const address: any = {
        ...deliveryAddressToCamelCase,
        subDistrict: subDistrictToCamelCase,
      };

      let nameProducts: string = '';
      let skuProducts: string = '';
      const addressFormatterResult: string = addressFormatter(address);
      const gender: string = resultToCamelCase?.user?.gender === 'MALE' ? 'Laki-laki' : 'Perempuan';
      const birthDate: string = `${DayFormat(moment(resultToCamelCase?.user?.birth_date).day())}, ${moment(resultToCamelCase?.user?.birth_date).format('DD MMM Y')}`;

      const mapped: any = resultToCamelCase?.products?.map((row: any) => {
        const productToCamelCase: any = ObjectToCamelCase(row);
        nameProducts += `${productToCamelCase?.name}, `;
        skuProducts += `${productToCamelCase?.sku}, `;
        return {
          id: productToCamelCase?.id,
          name: productToCamelCase?.name,
          qty: productToCamelCase?.quantity,
          price: {
            raw: productToCamelCase?.price?.raw,
            formatted: productToCamelCase?.price?.formatted,
          },
          actualPrice: {
            raw: productToCamelCase?.actualPrice?.raw,
            formatted: productToCamelCase?.actualPrice?.formatted,
          },
          image: productToCamelCase?.images?.formats?.medium || productToCamelCase?.images?.url || '',
        };
      }) || null;

      setOrder({
        products: mapped,
        qty: mapped.length,
        id: resultToCamelCase?.id,
        prices: pricesToCamelCase,
        status: resultToCamelCase?.status,
        partner: partnerToCamelCase?.name,
        courier: resultToCamelCase?.courier,
        skuProducts: skuProducts.slice(0, -2),
        nameProducts: nameProducts.slice(0, -2),
        complaint: resultToCamelCase?.complaint,
        orderCode: resultToCamelCase?.orderCode,
        transactionCode: resultToCamelCase?.transactionCode,
        user: {
          ...userToCamelCase,
          gender,
          birthDate,
          deliveryAddress: {
            ...address,
            addressFormatter: addressFormatterResult,
          },
        },
      });

      setIsLoader(false);
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'orderDetail' });
      setWarning({ message: error?.data?.message || error?.message, type: 'error' });
      setIsLoader(false);
    }
  };

  const historyOrder = async (id: number) => {
    try {
      const result: any = await getHistory(id);
      setOrderHistory(result || null);
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'historyOrder' });
      setWarning({ message: `Order history: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  const processOrderAcceptedApi = async (orderId: number) => {
    try {
      if (!partner) {
        setWarning({ message: 'Partner harus dipilih terlebih dahulu', type: 'error' });
        return false;
      }

      const processing = await processOrder({ partner: partner?.value }, orderId);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi diproses', type: 'success' });
      orderDetail();
      setDisabled(false);
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'processOrderAcceptedApi' });
      setWarning({ message: `Order Processed: ${error?.data?.message || error?.message}`, type: 'error' });
      setDisabled(false);
      return false;
    }
  };

  const processOrderAccepted = (orderId: number) => {
    setDisabled(true);
    processOrderAcceptedApi(orderId);
  };

  const processOrderProcessedApi = async (orderId: number) => {
    try {
      if (code === '') {
        setWarning({ message: 'Kode transaksi harus diisi terlebih dahulu', type: 'error' });
        setDisabled(false);
        return false;
      }
      const pickup = await pickupOrder({ transaction_code: code }, orderId);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi siap dipickup', type: 'success' });
      orderDetail();
      setDisabled(false);
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'processOrderProcessedApi' });
      setWarning({ message: `Order Pickup: ${error?.data?.message || error?.message}`, type: 'error' });
      setDisabled(false);
      return false;
    }
  };

  const processOrderProcessed = (orderId: number) => {
    setDisabled(true);
    processOrderProcessedApi(orderId);
  };

  const setUpCode = (value: string) => {
    // const key = event?.keyCode || event?.which;
    setCode(value);
    // if (code !== '' && key === 13) processOrderProcessed();
  };

  const processOrderPickupApi = async (orderId: number) => {
    try {
      const send = await sendOrder(orderId);
      setWarning({ message: 'Berhasil mengubah status menjadi dikirim', type: 'success' });
      orderDetail();
      setDisabled(false);
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'processOrderPickupApi' });
      setWarning({ message: `Order Send: ${error?.data?.message || error?.message}`, type: 'error' });
      setDisabled(false);
      return false;
    }
  };

  const processOrderPickup = (orderId: number) => {
    setDisabled(true);
    processOrderPickupApi(orderId);
  };

  const processSendPickupApi = async (orderId: number) => {
    try {
      const arrived = await orderArrived(orderId);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi Tiba di Tujuan', type: 'success' });
      orderDetail();
      setDisabled(false);
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'processSendPickupApi' });
      setWarning({ message: `Order Arrived: ${error?.data?.message || error?.message}`, type: 'error' });
      setDisabled(false);
      return false;
    }
  };

  const processSendPickup = (orderId: number) => {
    setDisabled(true);
    processSendPickupApi(orderId);
  };

  const processComplaintDoneApi = async (orderId: number) => {
    try {
      await completedComplaint(orderId);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi komplain selesai', type: 'success' });
      orderDetail();
      setDisabled(false);
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'processComplaintDoneApi' });
      setWarning({ message: `Complaint Done: ${error?.data?.message || error?.message}`, type: 'error' });
      setDisabled(false);
      return false;
    }
  };

  const processComplaintDone = (orderId: number) => {
    setDisabled(true);
    processComplaintDoneApi(orderId);
  };

  const selectComplaint = (complaintStatus: any) => {
    setComplaint(complaintStatus);
  };

  const handlerProcessComplaint = async (id: number) => {
    try {
      let message;
      if (complaint.value === 'PROCESS_COMPLAINT') {
        await processComplaint(id);
        message = 'Berhasil mengubah status pesanan menjadi komplain diproses';
      }

      if (complaint.value === 'REJECT_COMPLAINT') {
        await rejectComplaint(id);
        message = 'Berhasil mengubah status pesanan menjadi komplain ditolak';
      }

      if (complaint.value === 'REFUND') {
        await refundComplaint(id);
        message = 'Berhasil mengubah status pesanan menjadi refund';
      }

      setWarning({ message, type: 'success' });
      setComplaint(null);
      orderDetail();
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'handlerProcessComplaint' });
      setWarning({ message: `Submit: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  const handlerComplaintNote = (note: string) => {
    setComplaintPayload({ ...complaintPayload, note });
  };

  const fileValidator = (event: any) => new Promise((resolve, reject) => {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;
    const validImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    if (fileSize >= 10240000) reject(new Error('File hanya bisa di upload maximum 10 mb'));
    if (validImageTypes.indexOf(fileType) === -1) reject(new Error('File hanya bisa gambar'));
    resolve(true);
  });

  const handlerComplaintFile = async (file: any) => {
    try {
      await fileValidator(file);
      const images: ImageComplaint[] = [];
      const formData = new FormData();
      const files = file?.target?.files?.[0];
      if (!file && !files) return false;

      formData.append('file', files, files?.name);

      const uploaded: any = await uploader(formData);

      if (complaintPayload.images.length > 0) {
        images.push(
          ...complaintPayload.images,
          {
            url: uploaded?.formats?.small || uploaded?.url,
            id: uploaded?.id,
          },
        );
      } else {
        images.push({
          id: uploaded?.id,
          url: uploaded?.formats?.small || uploaded?.url,
        });
      }

      setComplaintPayload({ ...complaintPayload, images });
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'handlerComplaintFile' });
      setWarning({ message: `Upload: ${error?.data?.message || error?.message}`, type: 'error' });
      return true;
    }
  };

  const handlerOrderComplained = async () => {
    try {
      const payload: any = { ...complaintPayload };
      payload.images = payload.images.map((img) => img.id);
      delete payload.id;
      await makeComplaint(payload, complaintPayload.id);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi dikomplain', type: 'success' });
      setComplained(!complained);
      orderDetail();
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'handlerOrderComplained' });
      setWarning({ message: `Complaint: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  const complainedForm = (id: number) => {
    setComplaintPayload({ ...complaintPayload, id });
    setComplained(true);
  };

  useEffect(() => {
    setIsLoader(true);
    getListPartner();
    orderDetail();
  }, []);

  useEffect(() => () => {
    setCode('');
    setOrder(null);
    setPartners([]);
    setPartner(null);
    setIsLoader(true);
    setDisabled(false);
    setOrderHistory(null);
  }, []);

  return {
    code,
    order,
    partner,
    partners,
    disabled,
    isLoader,
    orderHistory,
    historyOrder,
    selectPartner,
    setOrderHistory,
    processOrderAccepted,
    setUpCode,
    processOrderProcessed,
    processOrderPickup,
    processSendPickup,
    processComplaintDone,
    complaints,
    complaint,
    selectComplaint,
    handlerProcessComplaint,
    complained,
    setComplained,
    handlerComplaintFile,
    handlerComplaintNote,
    handlerOrderComplained,
    complaintPayload,
    complainedForm,
    warning,
  };
};

export default Service;
