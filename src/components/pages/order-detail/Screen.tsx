import React from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@mui/material/Icon';

import ComplaintProcessedProcess from '@molecules/order-detail-process/ComplaintProcessedProcess';
import OrderProcessedProcess from '@molecules/order-detail-process/OrderProcessedProcess';
import OrderAcceptedProcess from '@molecules/order-detail-process/OrderAcceptedProcess';
import OrderPickupProcess from '@molecules/order-detail-process/OrderPickupProcess';
import ComplaintAccepted from '@molecules/order-detail-process/ComplaintAccepted';
import OrderSendProcess from '@molecules/order-detail-process/OrderSendProcess';
import OrderArrived from '@molecules/order-detail-process/OrderArrived';
import WindowLoader from '@molecules/modals/WindowLoader';
import ServicePreviewImage from '@helpers/preview-image';
import OrderEmpty from '@molecules/common/OrderEmpty';
import ModalHistory from '@molecules/modals/History';
import Snakebar from '@molecules/modals/Snakebar';
import Loader from '@molecules/common/Loader';
import Template from '@templates/Default';
import Button from '@atoms/common/Button';
import Title from '@atoms/common/Title';
import Label from '@atoms/common/Label';
import Service from './Service';

const OrderDetail = () => {
  const history = useHistory();
  const { HandlerPreviewImage } = ServicePreviewImage();
  const {
    code,
    order,
    partner,
    partners,
    isLoader,
    disabled,
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
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <div className="w-full h-full flex flex-col absolute p-3">
        {disabled && <WindowLoader />}
        {orderHistory && (
          <ModalHistory
            history={orderHistory}
            handler={() => setOrderHistory(null)}
          />
        )}
        <div className="py-3.5 px-6 bg-mainColor flex justify-between rounded-t-lg">
          <Button
            handler={() => history.goBack()}
            icon={
              <i className="text-white"><Icon>keyboard_arrow_left_icon</Icon></i>
            }
          />
          <Label text={`Pesanan untuk Order ID : ${order?.orderCode || ''}`} classes="text-white font-bold" />
          {order?.id && !(order?.status === 'PAYMENT_ACCEPT' || order?.status === 'WAITING_PAYMENT') ? (
            <Button
              icon={<i className="text-white"><Icon>restore_icon</Icon></i>}
              handler={() => historyOrder(parseInt(order?.id, 10))}
            />
          ) : <span />}
        </div>
        <div className="flex-1 h-full relative bg-white max-h-104">
          <div className={`w-full h-full absolute inset-0 flex flex-col ${!order && 'hidden'}`}>
            <div className="flex-1 px-3 py-2 overflow-y-auto">
              <div className="my-2 border border-solid border-gray-300 shadow rounded-lg">
                <div className="w-full px-4 flex justify-between items-center text-sm border-b border-solid border-gray-200 py-2 mb-2">
                  <Label text={`Order ID : ${order?.orderCode}`} classes="text-mainColor" />
                </div>
                {
                  order?.products?.map((row: any) => (
                    <div key={row?.id} className="w-full border-b border-solid border-gray-200 flex pt-2 pb-4">
                      <div className="w-full px-4 flex flex-row items-start">
                        <Button
                          classes="w-20 h-20"
                          image={row?.image}
                          classesImage="w-full h-full object-cover"
                          handler={() => HandlerPreviewImage(row?.image || '')}
                        />
                        <div className="flex-1 px-5">
                          <Title text={row?.name} classes="text-dark1 mb-2" />
                          <Title text={`${row?.qty} Produk`} classes="text-dark3 text-xs" />
                          <div className="mt-2">
                            {(row?.actualPrice?.formatted && row?.actualPrice?.raw !== 0) && (
                              <s><Label text={row?.actualPrice?.formatted} classes="text-dark3 text-xs mr-2" /></s>
                            )}
                            <Label text={row?.price?.formatted} classes="text-error3 text-xs font-bold" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="mt-4 border border-solid border-gray-300 shadow rounded-lg">
                <div className="px-4 py-3.5 flex items-center">
                  <i className="mr-2 text-mainColor">
                    <Icon>local_shipping_icon</Icon>
                  </i>
                  <Label text="Pengiriman" classes="font-bold text-dark2" />
                </div>
                <div className="px-4">
                  <div className="flex justify-between items-start border-b border-solid border-gray-200 pt-1 pb-3.5">
                    <div className="pr-4">
                      <Title text={order?.courier?.name} classes="text-dark1 text-sm mb-4" />
                      <Title text={`Pengiriman akan dilakukan oleh ${order?.courier?.name}`} classes="text-dark3 text-xs" />
                    </div>
                    <div className="pl-4">
                      <Label text={`Promo Ongkir ${order?.prices?.courierFee?.formatted}`} classes="text-info2 px-4 py-2 rounded-full text-xs font-bold" styles={{ backgroundColor: '#57EBA180' }} />
                    </div>
                  </div>
                </div>
                <div className="w-full mt-2 px-4 pt-2 pb-4 bg-white text-sm flex justify-between">
                  <Label classes="text-dark2" text="Catatan : " />
                  <Label classes="text-dark2" text={order?.courier?.notes || '-'} />
                </div>
              </div>
              <div className="mt-4 border border-solid border-gray-300 shadow rounded-lg">
                <div className="px-4 py-3.5 flex items-center">
                  <i className="mr-2 text-mainColor"><Icon>pin_drop_icon</Icon></i>
                  <Label text="Alamat Pengiriman" classes="font-bold text-dark2" />
                </div>
                <div className="px-4 mb-4 flex items-end justify-between flex-row">
                  <div className="flex-1 pt-1 pb-2">
                    <Title text={`${order?.user?.deliveryAddress?.receiverName} | ${order?.user?.deliveryAddress?.receiverPhone}`} classes="text-dark3 mb-2" />
                    <Title text={`${order?.user?.deliveryAddress?.addressFormatter}`} classes="text-dark3 text-sm lg:w-1/2 w-full" />
                  </div>
                  <div className="pt-1 pb-2">
                    {
                      order?.user?.deliveryAddress?.latitude
                      && order?.user?.deliveryAddress?.longitude
                      && (
                        <Label
                          classes="text-sm text-info1"
                          text={`${order?.user?.deliveryAddress?.latitude}, ${order?.user?.deliveryAddress?.longitude}`}
                        />
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="mt-4 py-4 px-4 border border-solid border-gray-300 shadow rounded-lg">
                <div className="w-full mt-1 pb-1 text-sm flex justify-between">
                  <Label text="Subtotal Produk" classes="text-dark2" />
                  <Label text={order?.prices?.productFee?.formatted} classes="text-dark2" />
                </div>
                <div className="w-full mt-1 pb-1 text-sm flex justify-between">
                  <Label text="Biaya Kirim" classes="text-dark2" />
                  <Label text={order?.prices?.courierFee?.formatted} classes="text-dark2" />
                </div>
                <div className="w-full mt-1 pb-1 text-sm flex justify-between">
                  <Label text="Biaya Layanan" classes="text-dark2" />
                  <Label text={order?.prices?.serviceFee?.formatted} classes="text-dark2" />
                </div>
                <div className="w-full mt-2 pt-4 pb-1 text-sm flex justify-between border-t border-solid border-gray-200">
                  <Label text="Harga Total" classes="font-bold" />
                  <Label text={order?.prices?.total?.formatted} classes="font-bold" />
                </div>
              </div>
              <div className="my-4 py-4 px-4 border border-solid border-gray-300 shadow rounded-lg flex">
                <div className="w-1/2">
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Nama Pasien" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={order?.user?.fullName} />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="No Handphone" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={order?.user?.phone} />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Jenis Kelamin" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={order?.user?.gender} />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Tanggal Lahir" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={order?.user?.birthDate} />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Tempat Lahir" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={order?.user?.birthPlace} />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Email" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={order?.user?.email} />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Nama Obat" />
                    </div>
                    <div className="w-2/3 flex flex-row">
                      <Label text=":" classes="mr-4 inline-block" />
                      <Label text={order?.nameProducts} classes="flex-1 inline-block" />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Qty" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={`${order?.qty} Produk`} />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="SKU SAP" />
                    </div>
                    <div className="w-2/3 flex flex-row">
                      <Label text=":" classes="mr-4 inline-block" />
                      <Label text={order?.skuProducts} classes="flex-1 inline-block" />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Nama Rumah Sakit" />
                    </div>
                    <div className="w-2/3">
                      <Label text=":" classes="mr-4" />
                      <Label text={order?.partner || '-'} />
                    </div>
                  </div>
                  <div className="flex text-dark3 text-sm mb-2">
                    <div className="w-1/3">
                      <Label text="Alamat" />
                    </div>
                    <div className="w-2/3 flex flex-row">
                      <Label text=":" classes="mr-4 inline-block" />
                      <Label text={order?.user?.deliveryAddress?.addressFormatter} classes="flex-1 inline-block" />
                    </div>
                  </div>
                </div>
              </div>
              {order && order?.status === 'PAYMENT_ACCEPT' && (
                <OrderAcceptedProcess
                  partner={partner}
                  partners={partners}
                  selectPartner={(value: number) => selectPartner(value)}
                  handlerProcessOrder={() => processOrderAccepted(parseInt(order?.id, 10))}
                />
              )}
              {order && order?.status === 'PROCESSED' && (
                <OrderProcessedProcess
                  code={code}
                  inputHandler={(value: string) => setUpCode(value)}
                  transactionCode={{ label: 'Kode Transaksi', placeholder: 'Masukan Kode Transaksi' }}
                  anotherButton={(
                    <Button
                      text="Siap di Pickup"
                      handler={() => processOrderProcessed(parseInt(order?.id, 10))}
                      classes="w-full py-2 px-5 rounded-lg text-sm text-white bg-mainColor font-bold"
                    />
                  )}
                />
              )}
              {order && order?.status === 'READY_FOR_PICKUP' && (
                <OrderPickupProcess
                  code={order?.transactionCode}
                  handlerProcessOrder={() => processOrderPickup(parseInt(order?.id, 10))}
                />
              )}
              {order && order?.status === 'DELIVERED' && (
                <OrderSendProcess
                  code={order?.transactionCode}
                  handlerProcessOrder={() => processSendPickup(parseInt(order?.id, 10))}
                />
              )}
              {order && order?.status === 'ARRIVED' && (
                <OrderArrived
                  complained={complained}
                  complaint={complaintPayload}
                  cancelComplained={setComplained}
                  handlerComplaintNote={handlerComplaintNote}
                  handlerComplaintFile={handlerComplaintFile}
                  handlerOrderComplained={handlerOrderComplained}
                  openComplained={() => complainedForm(parseInt(order?.id, 10))}
                />
              )}
              {order && order?.status === 'COMPLAINED' && (
                <ComplaintAccepted
                  complaints={complaints}
                  complaint={complaint}
                  selectComplaint={selectComplaint}
                  handlerProcessComplaint={() => handlerProcessComplaint(parseInt(order?.id, 10))}
                />
              )}
              {order && order?.status === 'COMPLAINT_PROCESSED' && (
                <ComplaintProcessedProcess
                  handlerProcessOrder={() => processComplaintDone(parseInt(order?.id, 10))}
                />
              )}
            </div>
          </div>
          {!order && !isLoader && <OrderEmpty text="Tidak menemukan detail pesanan" />}
          {isLoader && <Loader />}
        </div>
      </div>
    </Template>
  );
};

export default OrderDetail;
