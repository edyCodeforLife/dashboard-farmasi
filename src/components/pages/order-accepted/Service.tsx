import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { State } from '@services/redux/reducer';
import ServicePartner from '@services/api/ServicePartners';
import ServiceOrderAccepted from '@services/api/ServiceOrderAccepted';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import { SetStorage } from '@helpers/local-storage';
import ServiceHistory from '@services/api/ServiceHistory';
import AddressFormater from '@helpers/address-converter';
import errorCatcher from '@helpers/error-catcher';

const Service = () => {
  interface Partner {
    label: string;
    value: string;
    orderId: number,
  }

  const history = useHistory();
  const { getPartners } = ServicePartner();
  const { getHistory } = ServiceHistory();
  const keyword: any = useSelector((state: State) => state.searchByKeyword.keyword);
  const { getOrderAccepted, processOrder } = ServiceOrderAccepted();
  const fileLocation = 'components/pages/order-accepted/Service.tsx';

  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [orderHistory, setOrderHistory] = useState<any>(null);
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
      errorCatcher({ error, file: fileLocation, func: 'getListPartner' });
      setWarning({ message: `Partner: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  const historyOrder = async (id: number) => {
    try {
      const result: any = await getHistory(id);
      setOrderHistory(result || null);
    } catch (error: any) {
      setWarning({ message: `Order history: ${error?.data?.message || error?.message}`, type: 'error' });
    }
  };

  const selectPartner = (id: string, orderId: number) => {
    const found: any = partners?.find((item: any) => item?.value === id);
    if (found) found.orderId = orderId;

    setPartner(found || null);
  };
  // list order
  const getListOrder = async () => {
    try {
      setIsLoader(true);
      const params: any = { page: meta.page };
      if (keyword !== '') params.keyword = keyword;
      if (dateFrom !== '') params.startDate = moment(dateFrom, 'YYYY, MM, DD').format('YYYY-MM-DD');
      if (dateTo !== '') params.endDate = moment(dateTo, 'YYYY, MM, DD').format('YYYY-MM-DD');
      const result: any = await getOrderAccepted(params);
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
      setWarning({ message: `Orders: ${error?.data?.message || error?.message}`, type: 'error' });
      setIsLoader(false);
    }
  };

  const processOrderApi = async (orderId: number) => {
    try {
      if (!partner) {
        setWarning({ message: 'Partner harus dipilih terlebih dahulu', type: 'error' });
        return false;
      }

      const processing = await processOrder({ partner: partner?.value }, orderId);
      setWarning({ message: 'Berhasil mengubah status pesanan menjadi diproses', type: 'success' });
      setMeta({ ...meta, page: 1 });
      setPartner(null);
      setDisabled(false);
      return true;
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'processOrderApi' });
      setWarning({ message: `Order Processed: ${error?.data?.message || error?.message}`, type: 'error' });
      setPartner(null);
      setDisabled(false);
      return false;
    }
  };

  const submit = (orderId: number) => {
    setDisabled(true);
    processOrderApi(orderId);
  };

  useEffect(() => { getListPartner(); }, []);
  useEffect(() => { getListOrder(); }, [meta.page, date]);
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

  useEffect(() => SetStorage('currentUrl', '/order-accepted'), []);

  return {
    meta,
    orders,
    submit,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    selectPartner,
    detailHandler,
    orderHistory,
    setOrderHistory,
    historyOrder,
    onChangeCalender,
    date,
    warning,
  };
};

export default Service;
