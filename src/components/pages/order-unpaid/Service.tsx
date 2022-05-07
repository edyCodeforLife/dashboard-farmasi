import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AlertWindow from '@molecules/modals/Snakebar';
import ServiceOrderUnpaid from '@services/api/ServiceOrderUnpaid';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import ServiceHistory from '@services/api/ServiceHistory';
import AddressFormater from '@helpers/address-converter';
import { SetStorage } from '@helpers/local-storage';
import errorCatcher from '@helpers/error-catcher';
import { State } from '@services/redux/reducer';

const Service = () => {
  const history = useHistory();
  const { getOrderUnpaid } = ServiceOrderUnpaid();
  const keyword: any = useSelector((state: State) => state.searchByKeyword.keyword);
  const { getHistory } = ServiceHistory();
  const fileLocation = 'components/pages/order-unpaid/Service.tsx';

  const [warning, setWarning] = useState('');
  const [orders, setOrders] = useState([]);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [orderHistory, setOrderHistory] = useState<any>(null);
  const [meta, setMeta] = useState({
    page: 1,
    totalPage: 0,
    totalResult: 0,
    totalData: 0,
  });

  const detailHandler = (id: number) => {
    history.push(`/order-detail/${id}`);
  };

  const historyOrder = async (id: number) => {
    try {
      const result: any = await getHistory(id);
      setOrderHistory(result || null);
    } catch (error: any) {
      setWarning(`Order history: ${error?.data?.message || error?.message}`);
    }
  };

  const getListOrder = async () => {
    try {
      setIsLoader(true);
      const params: any = { page: meta.page };
      if (keyword !== '') params.keyword = keyword;

      const result: any = await getOrderUnpaid(params);
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
      setWarning(`Order: ${error?.data?.message || error?.message}`);
      errorCatcher({ error, file: fileLocation, func: 'getListOrder' });
      setIsLoader(false);
    }
  };

  useEffect(() => { getListOrder(); }, [meta.page]);
  useEffect(() => {
    if (meta.page !== 1) setMeta({ ...meta, page: 1 });
    if (keyword && meta.page === 1) getListOrder();
  }, [keyword]);

  useEffect(() => () => {
    setOrders([]);
    setMeta(meta);
    setWarning('');
    setIsLoader(false);
  }, []);

  useEffect(() => SetStorage('currentUrl', '/order-unpaid'), []);

  return {
    meta,
    orders,
    setMeta,
    isLoader,
    detailHandler,
    orderHistory,
    setOrderHistory,
    historyOrder,
    warning,
  };
};

export default Service;
