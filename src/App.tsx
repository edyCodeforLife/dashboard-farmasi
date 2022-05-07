import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import ComplaintProcessed from '@pages/complaint-processed/Screen';
import ComplaintAccepted from '@pages/complaint-accepted/Screen';
import ComplaintRejected from '@pages/complaint-rejected/Screen';
import DataTransaction from '@pages/data-transaction/Screen';
import ForgotPassword from '@pages/forgot-password/Screen';
import ChangePassword from '@pages/change-password/Screen';
import OrderProcessed from '@pages/order-processed/Screen';
import OrderAccepted from '@pages/order-accepted/Screen';
import ComplaintDone from '@pages/complaint-done/Screen';
import OrderArrived from '@pages/order-arrived/Screen';
import OrderPickup from '@pages/order-pickup/Screen';
import OrderDetail from '@pages/order-detail/Screen';
import OrderUnpaid from '@pages/order-unpaid/Screen';
import OrderRefund from '@pages/order-refund/Screen';
import SelectRole from '@pages/select-role/Screen';
import VerifyCode from '@pages/verify-code/Screen';
import OrderSend from '@pages/order-send/Screen';
import OrderDone from '@pages/order-done/Screen';
import Login from '@pages/login/Screen';

// import PreviewImage from '@molecules/modals/PreviewImage';
import Snakebar from '@molecules/modals/Snakebar';
import Private from './services/middleware/Private';
import Public from './services/middleware/Public';
import Roles from './services/middleware/Roles';

const App = () => (
  <Router>
    <GuardProvider guards={[Private, Public, Roles]} loading={null} error={null}>
      <Switch>
        {/* <PreviewImage /> */}
        <GuardedRoute exact path="/" component={SelectRole} />
        <GuardedRoute path="/complaint-processed" component={ComplaintProcessed} />
        <GuardedRoute path="/complaint-accepted" component={ComplaintAccepted} />
        <GuardedRoute path="/complaint-rejected" component={ComplaintRejected} />
        <GuardedRoute path="/data-transaction" component={DataTransaction} />
        <GuardedRoute path="/forgot-password" component={ForgotPassword} />
        <GuardedRoute path="/change-password" component={ChangePassword} />
        <GuardedRoute path="/order-processed" component={OrderProcessed} />
        <GuardedRoute path="/order-detail/:id" component={OrderDetail} />
        <GuardedRoute path="/order-accepted" component={OrderAccepted} />
        <GuardedRoute path="/complaint-done" component={ComplaintDone} />
        <GuardedRoute path="/order-arrived" component={OrderArrived} />
        <GuardedRoute path="/order-unpaid" component={OrderUnpaid} />
        <GuardedRoute path="/order-pickup" component={OrderPickup} />
        <GuardedRoute path="/order-refund" component={OrderRefund} />
        <GuardedRoute path="/verify-code" component={VerifyCode} />
        <GuardedRoute path="/order-send" component={OrderSend} />
        <GuardedRoute path="/order-done" component={OrderDone} />
        <GuardedRoute path="/login" component={Login} />
      </Switch>
    </GuardProvider>
  </Router>
);

export default App;
