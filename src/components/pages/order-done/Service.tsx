import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ServiceOrderDetail from '@services/api/ServiceOrderDetail';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import ServiceOrderDone from '@services/api/ServiceOrderDone';
import ServicePartner from '@services/api/ServicePartners';
import ServiceHistory from '@services/api/ServiceHistory';
import AddressFormater from '@helpers/address-converter';
import ServiceUpload from '@services/api/ServiceUpload';
import { SetStorage } from '@helpers/local-storage';
import errorCatcher from '@helpers/error-catcher';
import { State } from '@services/redux/reducer';

const Service = () => {
  interface Partner {
    value: string;
    label: string;
  }

  interface Images {
    id: string;
    url: string;
  }

  interface OrderImage {
    id: number;
    hasUploaded: boolean;
    images: Array<Images>;
  }

  const history = useHistory();
  const { uploader } = ServiceUpload();
  const { getHistory } = ServiceHistory();
  const { getPartners } = ServicePartner();
  const { getOrderDetail } = ServiceOrderDetail();
  const { getOrderDone, uploadProof } = ServiceOrderDone();
  const fileLocation = 'components/pages/order-done/Service.tsx';
  const keyword: any = useSelector((state: State) => state.searchByKeyword.keyword);

  const [partner, setPartner] = useState<Partner | null>(null);
  const [orderHistory, setOrderHistory] = useState<any>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [partners, setPartners] = useState([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [orders, setOrders] = useState([]);
  const [warning, setWarning] = useState({ message: '', type: '' });
  const [payloadImage, setPayloadImages] = useState<OrderImage>({
    id: 0,
    images: [],
    hasUploaded: false,
  });
  const [meta, setMeta] = useState({
    page: 1,
    totalPage: 0,
    totalResult: 0,
    totalData: 0,
  });
  // variable date range
  const [dateFrom, setDateFrom] = useState(moment().format('YYYY, MM, DD'));
  const [dateTo, setDateTo] = useState(moment().add(7, 'days').format('YYYY, MM, DD'));
  const [date, setDate] = useState<Array<any>>([new Date(moment().subtract(7, 'days').format('YYYY, MM, DD')), new Date(moment().format('YYYY, MM, DD'))]);
  // function date range
  const onChangeCalender = (e) => {
    const tempDateFrom = moment(e[0]).format('YYYY, MM, DD');
    const tempDateTo = moment(e[1]).format('YYYY, MM, DD');
    const data = [new Date(tempDateFrom), new Date(tempDateTo)];
    setDateFrom(tempDateFrom);
    setDateTo(tempDateTo);
    setDate(data);
  };
  const detailHandler = (id: number) => {
    history.push(`/order-detail/${id}`);
  };

  const getListPartner = async () => {
    try {
      const result: any = await getPartners();
      const mapped = result?.map((item) => ({
        value: item.partner_id,
        label: item.name,
      })) || [];

      setPartners(mapped);
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'getListPartner' });
      setWarning({ message: `Partner: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };
  // list order
  const getListOrder = async () => {
    try {
      setIsLoader(true);
      const params: any = { page: meta.page };
      if (keyword !== '') params.keyword = keyword;
      if (partner && partner?.value !== '') params.partner = partner?.value;
      if (dateFrom !== '') params.startDate = moment(dateFrom, 'YYYY, MM, DD').format('YYYY-MM-DD');
      if (dateTo !== '') params.endDate = moment(dateTo, 'YYYY, MM, DD').format('YYYY-MM-DD');
      const result: any = await getOrderDone(params);
      const metaApi: any = ObjectToCamelCase(result?.meta);

      const mapped = result?.data?.map((order: any) => {
        const product = order.products[0];

        return {
          id: order?.id || '-',
          orderDate: order?.order_date || '-',
          createdAt: order?.created_at || '-',
          orderCode: order?.order_code || '-',
          totalPrice: order?.total_price.formatted || '-',
          transactionCode: order?.transaction_code || '-',
          receiverName: order?.address.receiver_name || '-',
          product: {
            id: product?.id || '-',
            total: order?.products?.length || 0,
            name: product?.name || '-',
            actualPrice: product?.actual_price?.formatted || '-',
            price: product?.price?.formatted || '-',
            images: product?.images?.formats?.medium || product?.images?.url || '-',
          },
          address: AddressFormater(order?.address) || '-',
        };
      }) || [];

      setOrders(mapped);
      setMeta(metaApi);
      setIsLoader(false);
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'getListOrder' });
      setWarning({ message: `Order: ${error?.data?.message || error?.message}`, type: 'error' });
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

  const uploadHandler = async (id: number, hasUploaded: boolean) => {
    const order: any = await getOrderDetail(id);
    const images = order?.order_proof?.map((item) => ({
      id: item.id,
      url: item?.url?.medium || item?.url?.small,
    }));

    setOpenUpload(true);
    setPayloadImages({
      ...payloadImage,
      hasUploaded,
      images,
      id,
    });
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

  const fileHandler = async (event: any) => {
    try {
      await fileValidator(event);
      const orderImages: Array<Images> = [];
      const formData = new FormData();
      const files = event?.target?.files?.[0];
      if (!event && !files) return false;

      formData.append('file', files, files?.name);

      const uploaded: any = await uploader(formData);

      if (payloadImage.images.length > 0) {
        orderImages.push(
          ...payloadImage.images,
          {
            url: uploaded?.formats?.small || uploaded?.url,
            id: uploaded?.id,
          },
        );
      } else {
        orderImages.push({
          id: uploaded?.id,
          url: uploaded?.formats?.small || uploaded?.url,
        });
      }

      setPayloadImages({ ...payloadImage, images: orderImages });
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'fileHandler' });
      setWarning({ message: `Upload: ${error?.data?.message || error?.message}`, type: 'error' });
      return true;
    }
  };

  const submitHandler = async () => {
    try {
      const payload: any = { ...payloadImage };
      payload.images = payload.images.map((img) => img.id);
      delete payload.id;
      delete payload.hasUploaded;
      await uploadProof(payload, payloadImage.id);
      setWarning({ message: 'Bukti barang diterima berhasil diunggah', type: 'success' });
      setOpenUpload(!openUpload);
      getListOrder();
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'submitHandler' });
      setWarning({ message: `Save: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  useEffect(() => { getListPartner(); }, []);
  useEffect(() => { getListOrder(); }, [meta.page, partner, date]);
  useEffect(() => {
    if (meta.page !== 1) setMeta({ ...meta, page: 1 });
    if (keyword && meta.page === 1) getListOrder();
  }, [keyword]);

  useEffect(() => () => {
    setMeta(meta);
    setOrders([]);
    setPartners([]);
    setPartner(null);
    setIsLoader(true);
    setDisabled(false);
  }, []);

  useEffect(() => SetStorage('currentUrl', '/order-done'), []);

  return {
    meta,
    orders,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    setPartner,
    openUpload,
    fileHandler,
    payloadImage,
    orderHistory,
    historyOrder,
    setOpenUpload,
    detailHandler,
    uploadHandler,
    submitHandler,
    setOrderHistory,
    date,
    onChangeCalender,
    warning,
  };
};

export default Service;
