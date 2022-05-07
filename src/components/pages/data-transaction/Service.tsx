import * as XLSX from 'xlsx/xlsx.mjs';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import ServiceListTransaction from '@services/api/ServiceListTransaction';
import { ObjectToCamelCase } from '@helpers/camelcase-converter';
import listPaymentMethod from '@constants/paymentMethod.json';
import ServicePartner from '@services/api/ServicePartners';
import ServiceHistory from '@services/api/ServiceHistory';
import AddressFormater from '@helpers/address-converter';
import historyType from '@constants/historyType.json';
import TableConfig from '@constants/optionTable.json';
import { SetStorage } from '@helpers/local-storage';
import errorCatcher from '@helpers/error-catcher';
import { State } from '@services/redux/reducer';
import listStatus from '@constants/status.json';

const Service = () => {
  // interface table config
  interface TableConf {
    text: string;
    display: boolean;
    sorting: boolean;
    value: string;
  }

  const history = useHistory();
  const fileLocation = 'components/pages/data-transaction/Service.tsx';

  const { getListTransaction } = ServiceListTransaction();
  const { getHistory } = ServiceHistory();
  const { getPartners } = ServicePartner();
  const listRange = [10, 25, 50, 100];
  const searchKeyword: any = useSelector((state: State) => state.searchByKeyword);
  const [orders, setOrders] = useState([]);
  const [warning, setWarning] = useState({ message: '', type: '' });
  const [paramsSearch, setParamsSearch] = useState({
    transactionTime: {
      startDate: moment().startOf('month').format('DD-MM-YYYY'),
      endDate: moment().endOf('month').format('DD-MM-YYYY'),
    },
    createdTime: {
      startDate: '',
      endDate: '',
    },
    status: { value: null, label: null },
    paymentMethod: { value: null, label: null },
    partner: { value: null, label: null },
    orderId: '',
    shippingPrice: '',
    originPrice: '',
    salePrice: '',
    discount: '',
    nettTrans: '',
    username: '',
    recipientName: '',
    recipientAddress: '',
    medicine: '',
  });
  const [defaultParams] = useState(paramsSearch);
  const [partners, setPartners] = useState([]);
  const [sortKey, setSortKey] = useState<string>('DESC');
  const [orderKey, setOrderKey] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [meta, setMeta] = useState({
    page: 1,
    totalPage: 0,
    totalResult: 0,
    totalData: 0,
    limit: 10,
    maxPage: 2,
  });
  const [defaultTable, setDefaultTable] = useState<Array<TableConf>>(TableConfig || []);

  // handle previous number
  const previousNumber = () => {
    const result1 = meta.limit * (meta.page - 1);
    const result = (result1 / meta.page) * meta.page;
    return Math.round(result);
  };

  const stringLimitter = (text: string, limit: number) => {
    return `${text.substring(0, limit)}...`;
  };

  const stringMedicine = (params: any) => {
    const result = params?.map((item: any) => `[${item.quantity || '-'}] ${item?.name || '-'}`);
    return result?.join(', ') || '-';
  };
  // handler change sorting
  const sortingHandler = (params: string) => {
    if (orderKey !== params) {
      setSortKey('DESC');
      setOrderKey(params);
    } else {
      const tempSortkey = (sortKey === 'ASC') ? 'DESC' : 'ASC';
      setSortKey(tempSortkey);
      setOrderKey(params);
    }
  };

  // handler detail order
  const detailHandler = (id: number) => {
    history.push(`/order-detail/${id}`);
  };

  // Export to excel
  const exportToExcel = async () => {
    setLoading(true);
    const data = defaultTable.filter((item) => item.display);
    const tempValue: object[] = [];
    const params: any = { exportToExcel: true };
    if (searchKeyword?.keyword !== '') params.keyword = searchKeyword?.keyword;
    if (orderKey !== '') {
      params.field = orderKey.split(/(?=[A-Z])/).join('_').toLowerCase();
      params.type = sortKey.toLowerCase();
    }
    if (paramsSearch.transactionTime?.startDate !== '' && paramsSearch.transactionTime?.endDate !== '') {
      params.startTrx = moment(paramsSearch.transactionTime.startDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
      params.endTrx = moment(paramsSearch.transactionTime.endDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
    }
    if (paramsSearch.createdTime.startDate !== '' && paramsSearch.createdTime.endDate !== '') {
      params.startDate = moment(paramsSearch.createdTime.startDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
      params.endDate = moment(paramsSearch.createdTime.endDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
    }
    if (paramsSearch.orderId !== '') params.orderId = paramsSearch.orderId;
    if (paramsSearch.discount !== '') params.discount = paramsSearch.discount;
    if (paramsSearch.shippingPrice !== '') params.shipping = paramsSearch.shippingPrice;
    if (paramsSearch.nettTrans !== '') params.nett = paramsSearch.nettTrans;
    if (paramsSearch.originPrice !== '') params.original = paramsSearch.originPrice;
    if (paramsSearch.salePrice !== '') params.sale = paramsSearch.salePrice;
    if (paramsSearch.username !== '') params.userId = paramsSearch.username;
    if (paramsSearch.recipientName !== '') params.receipt = paramsSearch.recipientName;
    if (paramsSearch.recipientAddress !== '') params.address = paramsSearch.recipientAddress;
    if (paramsSearch.medicine !== '') params.medicine = paramsSearch.medicine;
    if (paramsSearch.status?.value !== null) params.status = paramsSearch?.status?.value;
    if (paramsSearch.partner?.value !== null) params.hospital = paramsSearch?.partner?.value;
    if (paramsSearch.paymentMethod?.value !== null) {
      params.payment = paramsSearch?.paymentMethod?.value;
    }
    const result: any = await getListTransaction(params);
    const mapped = result?.data?.map((order: any) => {
      return {
        id: order?.id || '-',
        referenceCode: order?.order_id || '-',
        totalDelivery: order?.shipping_price?.formatted || '-',
        originalPrice: order?.original_price?.formatted || '-',
        totalProductPrice: order?.sale_price?.formatted || '-',
        discount: order?.discount?.formatted || '-',
        nettTrans: order?.nett_transaction?.formatted || '-',
        username: order?.user?.email || '-',
        recipientName: order?.user?.full_name || '-',
        recipientAddress: AddressFormater(order?.user?.delivery_address),
        medicine: stringMedicine(order?.medicine || '-'),
        hospital: order?.hospital?.name || '-',
        paymentMethod: order?.payment_method || '-',
        paymentAt: order?.transaction_time || '-',
        createdAt: order?.created_time || '-',
        status: historyType[order?.status_transaction] || '-',
      };
    }) || [];
    const resultExcel = mapped.map((item, index) => {
      data.map((itm) => {
        return tempValue.push((itm.value === 'number' ? JSON.parse(`{"${itm.text}" : "${index + 1}"}`) : JSON.parse(`{"${itm.text}" : "${item[itm.value] || '-'}"}`)));
      });
      return tempValue.reduce(((r, c) => Object.assign(r, c)), {});
    });
    const dataWs = XLSX.utils.json_to_sheet(resultExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, dataWs, 'Test');
    XLSX.writeFile(wb, 'test.xlsx');
    setLoading(false);
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

  const resetFilter = () => {
    setParamsSearch({
      ...defaultParams,
      transactionTime: {
        startDate: '',
        endDate: '',
      },
    });
  };

  const getListOrder = async () => {
    try {
      const params: any = { page: meta.page, limit: meta.limit };
      if (searchKeyword?.keyword !== '') params.keyword = searchKeyword?.keyword;
      if (orderKey !== '') {
        params.field = orderKey.split(/(?=[A-Z])/).join('_').toLowerCase();
        params.type = sortKey.toLowerCase();
      }
      if (paramsSearch.transactionTime?.startDate !== '' && paramsSearch.transactionTime?.endDate !== '') {
        params.startTrx = moment(paramsSearch.transactionTime.startDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
        params.endTrx = moment(paramsSearch.transactionTime.endDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
      }
      if (paramsSearch.createdTime.startDate !== '' && paramsSearch.createdTime.endDate !== '') {
        params.startDate = moment(paramsSearch.createdTime.startDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
        params.endDate = moment(paramsSearch.createdTime.endDate, 'YYYY, MM, DD').format('YYYY-MM-DD');
      }
      if (paramsSearch.orderId !== '') params.orderId = paramsSearch.orderId;
      if (paramsSearch.discount !== '') params.discount = paramsSearch.discount;
      if (paramsSearch.shippingPrice !== '') params.shipping = paramsSearch.shippingPrice;
      if (paramsSearch.nettTrans !== '') params.nett = paramsSearch.nettTrans;
      if (paramsSearch.originPrice !== '') params.original = paramsSearch.originPrice;
      if (paramsSearch.salePrice !== '') params.sale = paramsSearch.salePrice;
      if (paramsSearch.username !== '') params.userId = paramsSearch.username;
      if (paramsSearch.recipientName !== '') params.receipt = paramsSearch.recipientName;
      if (paramsSearch.recipientAddress !== '') params.address = paramsSearch.recipientAddress;
      if (paramsSearch.medicine !== '') params.medicine = paramsSearch.medicine;
      if (paramsSearch.status?.value !== null) params.status = paramsSearch?.status?.value;
      if (paramsSearch.partner?.value !== null) params.hospital = paramsSearch?.partner?.value;
      if (paramsSearch.paymentMethod?.value !== null) {
        params.payment = paramsSearch?.paymentMethod?.value;
      }
      const result: any = await getListTransaction(params);
      const metaApi: any = ObjectToCamelCase(result?.meta);
      const mapped = result?.data?.map((order: any) => {
        return {
          id: order?.id || '-',
          referenceCode: order?.order_id || '-',
          totalDelivery: order?.shipping_price?.formatted || '-',
          originalPrice: order?.original_price?.formatted || '-',
          totalProductPrice: order?.sale_price?.formatted || '-',
          discount: order?.discount?.formatted || '-',
          nettTrans: order?.nett_transaction?.formatted || '-',
          username: order?.user?.email || '-',
          recipientName: order?.user?.full_name || '-',
          recipientAddress: stringLimitter(AddressFormater(order?.user?.delivery_address || '-'), 20),
          medicine: stringLimitter(stringMedicine(order?.medicine || '-'), 20),
          hospital: order?.hospital?.name || '-',
          paymentMethod: order?.payment_method || '-',
          paymentAt: order?.transaction_time || '-',
          createdAt: order?.created_time || '-',
          status: historyType[order?.status_transaction] || '-',
        };
      }) || [];
      setOrders(mapped);
      setMeta({ ...metaApi, limit: meta.limit, maxPage: meta.maxPage });
      setIsLoader(false);
    } catch (error: any) {
      // errorCatcher({ error, file: fileLocation, func: 'getListOrder' });
      setWarning({ message: `Order: ${error?.data?.message || error?.message}`, type: 'error' });
      setIsLoader(false);
    }
  };

  useEffect(() => {
    setIsLoader(true);
    previousNumber();
    getListOrder();
  }, [meta.limit,
    meta.page,
    orderKey,
    sortKey,
    paramsSearch.orderId,
    paramsSearch.discount,
    paramsSearch.status,
    paramsSearch.transactionTime,
    paramsSearch.createdTime,
    paramsSearch.paymentMethod,
    paramsSearch.shippingPrice,
    paramsSearch.originPrice,
    paramsSearch.salePrice,
    paramsSearch.discount,
    paramsSearch.nettTrans,
    paramsSearch.username,
    paramsSearch.recipientName,
    paramsSearch.recipientAddress,
    paramsSearch.partner,
    paramsSearch.medicine,
  ]);

  useEffect(() => {
    if (searchKeyword.keyword !== '') {
      setIsLoader(true);
      getListOrder();
    }
  }, [searchKeyword.keyword]);

  useEffect(() => () => {
    getListPartner();
    setOrders([]);
    setPartners([]);
    setDisabled(false);
    setIsLoader(true);
    setMeta(meta);
  }, []);

  useEffect(() => SetStorage('currentUrl', '/data-transaction'), []);

  return {
    meta,
    orders,
    setMeta,
    partners,
    disabled,
    isLoader,
    detailHandler,
    listStatus,
    defaultTable,
    setDefaultTable,
    exportToExcel,
    paramsSearch,
    setParamsSearch,
    listRange,
    sortingHandler,
    previousNumber,
    sortKey,
    orderKey,
    resetFilter,
    listPaymentMethod,
    loading,
    warning,
  };
};

export default Service;
