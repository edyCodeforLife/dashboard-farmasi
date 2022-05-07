import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { State } from '@services/redux/reducer';
import ServiceUpload from '@services/api/ServiceUpload';
import ServicePartner from '@services/api/ServicePartners';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import ServiceOrderArrived from '@services/api/ServiceOrderArrived';
import ServiceHistory from '@services/api/ServiceHistory';
import { SetStorage } from '@helpers/local-storage';
import AddressFormater from '@helpers/address-converter';
import errorCatcher from '@helpers/error-catcher';

const Service = () => {
  interface Partner {
    value: string;
    label: string;
  }

  interface ImageComplaint {
    id: string;
    url: string;
  }

  interface Complaint {
    id: number;
    note: string;
    images: Array<ImageComplaint>;
  }

  const history = useHistory();
  const { uploader } = ServiceUpload();
  const { getPartners } = ServicePartner();
  const { getHistory } = ServiceHistory();
  const { getOrderArrived, makeComplaint } = ServiceOrderArrived();
  const fileLocation = 'components/pages/order-arrived/Service.tsx';
  const keyword: any = useSelector((state: State) => state.searchByKeyword.keyword);

  const [partner, setPartner] = useState<Partner | null>(null);
  const [orderHistory, setOrderHistory] = useState<any>(null);
  const [partners, setPartners] = useState([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [upload, setUpload] = useState(false);
  const [orders, setOrders] = useState([]);
  const [complaintPayload, setComplaintPayload] = useState<Complaint>({
    id: 0,
    note: '',
    images: [],
  });

  const [resetComplaintPayload] = useState(complaintPayload);
  const [warning, setWarning] = useState({ message: '', type: '' });
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
      const result: any = await getOrderArrived(params);
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

  const complaintHandler = (id: number) => {
    setComplaintPayload({ ...complaintPayload, id });
    setUpload(true);
  };

  const inputHandler = (note: string) => {
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

  const fileHandler = async (file: any) => {
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
      errorCatcher({ error, file: fileLocation, func: 'fileHandler' });
      setWarning({ message: `Upload: ${error?.data?.message || error?.message}`, type: 'error' });
      return true;
    }
  };

  const submitHandler = async () => {
    try {
      const payload: any = { ...complaintPayload };
      payload.images = payload.images.map((img) => img.id);
      delete payload.id;
      await makeComplaint(payload, complaintPayload.id);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi dikomplain', type: 'success' });
      setUpload(!upload);
      setComplaintPayload(resetComplaintPayload);
      setMeta({ ...meta, page: 1 });
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'submitHandler' });
      setWarning({ message: `Complaint: ${error?.data?.message || error?.message}`, type: 'error' });
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
    setWarning({ type: '', message: '' });
  }, []);

  useEffect(() => SetStorage('currentUrl', '/order-arrived'), []);

  return {
    meta,
    orders,
    upload,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    orderHistory,
    historyOrder,
    setOrderHistory,
    setUpload,
    setPartner,
    fileHandler,
    inputHandler,
    detailHandler,
    submitHandler,
    complaintHandler,
    complaintPayload,
    date,
    onChangeCalender,
    warning,
  };
};

export default Service;
