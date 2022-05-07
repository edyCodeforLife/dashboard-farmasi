import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ServiceOrderPickup from '@services/api/ServiceOrderPickup';
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
  const { getOrderPickup, sendOrder } = ServiceOrderPickup();
  const fileLocation = 'components/pages/order-pickup/Service.tsx';
  const keyword: any = useSelector((state: State) => state.searchByKeyword.keyword);

  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [orderHistory, setOrderHistory] = useState<any>(null);
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
      const result: any = await getOrderPickup(params);
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

  const sendHandlerApi = async (id: number) => {
    try {
      const send = await sendOrder(id);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi dikirim', type: 'success' });
      setMeta({ ...meta, page: 1 });
      setDisabled(false);
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'sendHandlerApi' });
      setWarning({ message: `Order Send: ${error?.data?.message || error?.message}`, type: 'error' });
      setDisabled(false);
    }
  };

  const sendHandler = (id: number) => {
    setDisabled(true);
    sendHandlerApi(id);
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

  useEffect(() => SetStorage('currentUrl', '/order-pickup'), []);

  return {
    meta,
    orders,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    setPartner,
    orderHistory,
    historyOrder,
    setOrderHistory,
    sendHandler,
    detailHandler,
    date,
    onChangeCalender,
    warning,
  };
};

export default Service;
