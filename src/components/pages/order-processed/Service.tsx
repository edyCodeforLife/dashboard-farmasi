import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import ServiceOrderProcessed from '@services/api/ServiceOrderProcessed';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import ServicePartner from '@services/api/ServicePartners';
import ServiceHistory from '@services/api/ServiceHistory';
import AddressFormater from '@helpers/address-converter';
import { SetStorage } from '@helpers/local-storage';
import errorCatcher from '@helpers/error-catcher';
import { State } from '@services/redux/reducer';

const Service = () => {
  interface Partner {
    value: string;
    label: string;
  }

  const history = useHistory();
  const { getPartners } = ServicePartner();
  const { getHistory } = ServiceHistory();
  const { getOrderProcessed, pickupOrder } = ServiceOrderProcessed();
  const fileLocation = 'components/pages/order-processed/Service.tsx';
  const keyword: any = useSelector((state: State) => state.searchByKeyword.keyword);

  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [orderHistory, setOrderHistory] = useState<any>(null);
  const [code, setCode] = useState({ id: 0, code: '' });
  const [warning, setWarning] = useState({ type: '', message: '' });
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
      errorCatcher({ error, file: fileLocation, func: 'gerListPartner' });
      setWarning({ message: `Partner: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };
  // list order
  const getListOrder = async () => {
    try {
      setIsLoader(true);
      const params: any = { page: meta.page };
      if (partner?.value !== '') params.partner = partner?.value;
      if (keyword) params.keyword = keyword;
      if (dateFrom !== '') params.startDate = moment(dateFrom, 'YYYY, MM, DD').format('YYYY-MM-DD');
      if (dateTo !== '') params.endDate = moment(dateTo, 'YYYY, MM, DD').format('YYYY-MM-DD');
      const result: any = await getOrderProcessed(params);
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

  const inputHandler = (trxCode, orderId) => {
    if (trxCode !== '') setCode({ id: orderId, code: trxCode });
    else setCode({ id: 0, code: '' });
  };

  const pickupHandlerApi = async (id) => {
    try {
      if (code.code === '') {
        setWarning({ message: 'Kode transaksi harus diisi terlebih dahulu', type: 'error' });
        return false;
      }

      const pickup = await pickupOrder({ transaction_code: code.code }, id);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi Siap dipickup', type: 'success' });
      setMeta({ ...meta, page: 1 });
      setDisabled(false);
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'pickupHandlerApi' });
      setWarning({ message: `Order Pickup: ${error?.data?.message || error?.message}`, type: 'error' });
      setDisabled(false);
      return false;
    }
  };

  const pickupHandler = (id) => {
    setDisabled(true);
    pickupHandlerApi(id);
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

  useEffect(() => SetStorage('currentUrl', '/order-processed'), []);

  return {
    meta,
    code,
    orders,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    setPartner,
    orderHistory,
    setOrderHistory,
    historyOrder,
    pickupHandler,
    inputHandler,
    detailHandler,
    onChangeCalender,
    date,
    warning,
  };
};

export default Service;
