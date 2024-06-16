import React, { useEffect, useState } from 'react';
import './WidgetLg.css';
import { userRequest } from '../../requestMethods';
import {format} from "timeago.js"
const WidgetLg = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get('orders');
        setOrders(res.data);
      } catch (error) {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={'widgetButton ' + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Data</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order,index) => (
          <tr className="widgetLgTr" key={index}>
            <td className="widgetLgUser">
             
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">${order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status}/>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default WidgetLg;
