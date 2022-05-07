import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ServiceComplaintAccepted from '@services/api/ServiceComplaintAccepted';
import ServiceOrderDetail from '@services/api/ServiceOrderDetail';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import ServicePartner from '@services/api/ServicePartners';
import ServiceHistory from '@services/api/ServiceHistory';
import AddressFormater from '@helpers/address-converter';
import { SetStorage } from '@helpers/local-storage';
import errorCatcher from '@helpers/error-catcher';

import { State } from '../../../services/redux/reducer';

const Service = () => {
  interface Partner {
    value: string;
    label: string;
  }

  interface Complaint {
    value: string;
    label: string;
    orderId: number;
  }

  interface ComplaintData {
    note: string;
    images: Array<{
      url: string;
      id: string;
    }>;
  }

  const history = useHistory();
  const { getHistory } = ServiceHistory();
  const { getPartners } = ServicePartner();
  const { getOrderDetail } = ServiceOrderDetail();
  const fileLocation = 'components/pages/complaint-accepted/Service.tsx';
  const keyword: any = useSelector((state: State) => state.searchByKeyword.keyword);

  const {
    getComplaintAccepted,
    processComplaint,
    rejectComplaint,
    refundComplaint,
  } = ServiceComplaintAccepted();

  const [complaintData, setComplaintData] = useState<ComplaintData | null>(null);
  const [showComplaintImage, setShowComplaintImage] = useState(false);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [orderHistory, setOrderHistory] = useState<any>(null);
  const [partners, setPartners] = useState([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [orders, setOrders] = useState([]);
  const [warning, setWarning] = useState({ message: '', type: '' });
  const [confirm, setConfirm] = useState({
    text: '',
    handlerButtonLeft: () => { },
    handlerButtonRight: () => { },
  });
  const [resetConfirm] = useState(confirm);
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

  const getListComplaint = async () => {
    try {
      setIsLoader(true);
      const params: any = { page: meta.page };
      if (partner?.value !== '') params.partner = partner?.value;
      if (keyword) params.keyword = keyword;
      if (dateFrom !== '') params.startDate = moment(dateFrom, 'YYYY, MM, DD').format('YYYY-MM-DD');
      if (dateTo !== '') params.endDate = moment(dateTo, 'YYYY, MM, DD').format('YYYY-MM-DD');
      const result: any = await getComplaintAccepted(params);
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
      errorCatcher({ error, file: fileLocation, func: 'getListComplaint' });
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

  const submit = async (payload: any) => {
    try {
      let message = '';

      if (payload.value === 'PROCESS_COMPLAINT') {
        await processComplaint(payload.orderId);
        message = 'Berhasil mengubah status pesanan menjadi komplain diproses';
      }

      if (payload.value === 'REJECT_COMPLAINT') {
        await rejectComplaint(payload.orderId);
        message = 'Berhasil mengubah status pesanan menjadi komplain ditolak';
      }

      if (payload.value === 'REFUND') {
        await refundComplaint(payload.orderId);
        message = 'Berhasil mengubah status pesanan menjadi refund';
      }

      setWarning({ message, type: 'success' });
      setConfirm(resetConfirm);
      setMeta({ ...meta, page: 1 });
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'submit' });
      setWarning({ message: `Submit: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  const complaintHandler = (callback: any, orderId: number) => {
    const payload = { ...callback, orderId };

    if (callback.value === 'PROCESS_COMPLAINT') {
      setConfirm({
        text: 'Anda Yakin Ingin Memproses Komplain?',
        handlerButtonLeft: () => setConfirm(resetConfirm),
        handlerButtonRight: () => submit(payload),
      });
    }

    if (callback.value === 'REJECT_COMPLAINT') {
      setConfirm({
        text: 'Anda Yakin Ingin Menolak Komplain?',
        handlerButtonLeft: () => setConfirm(resetConfirm),
        handlerButtonRight: () => submit(payload),
      });
    }

    if (callback.value === 'REFUND') {
      setConfirm({
        text: 'Anda Yakin Ingin Refund?',
        handlerButtonLeft: () => setConfirm(resetConfirm),
        handlerButtonRight: () => submit(payload),
      });
    }

    setComplaint(callback.value === '' ? payload : null);
  };

  const imageComplaintHandler = async (id: number) => {
    try {
      const detailResponse: any = await getOrderDetail(id);
      const images = detailResponse?.complaint?.images?.map((item) => ({
        id: item.id,
        url: item?.url?.medium || '',
      })) || [];

      setComplaintData({ images, note: detailResponse?.complaint?.note || '' });
      setShowComplaintImage(true);
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'imageComplaintHandler' });
      setWarning({ message: `Detail: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  useEffect(() => { getListPartner(); }, []);
  useEffect(() => { getListComplaint(); }, [meta.page, partner, date]);
  useEffect(() => {
    if (meta.page !== 1) setMeta({ ...meta, page: 1 });
    if (keyword && meta.page === 1) getListComplaint();
  }, [keyword]);

  useEffect(() => () => {
    setMeta(meta);
    setOrders([]);
    setPartners([]);
    setPartner(null);
    setIsLoader(true);
    setDisabled(false);
  }, []);

  useEffect(() => SetStorage('currentUrl', '/complaint-accepted'), []);

  return {
    meta,
    orders,
    setMeta,
    partner,
    confirm,
    partners,
    disabled,
    isLoader,
    complaint,
    setPartner,
    orderHistory,
    historyOrder,
    complaintData,
    detailHandler,
    setOrderHistory,
    complaintHandler,
    showComplaintImage,
    setShowComplaintImage,
    imageComplaintHandler,
    onChangeCalender,
    date,
    warning,
  };
};

export default Service;
