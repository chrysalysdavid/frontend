import React, { useEffect, useState } from "react";
import {
  fetchCustomerOrders,
  fetchCustomerAccount,
} from "../../../Services/apiservice";
import "../Dasboard Styling/dash_style.scss";
import "./Order.scss";
import { TableLoadingSkeleton } from "../../LoadingSkeleton/LoadingSkeleton";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          Authorization: `Token ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        };
        let customer = await fetchCustomerAccount(headers);
        customer = customer.data;
        const response = await fetchCustomerOrders(headers, customer.id);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="px-2">
        <TableLoadingSkeleton />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="px-2">
        <div className="alert1 d-flex justify-content-between align-items-center ">
          <span>No orders have been made yet.</span>
          <a className="btn btn-primary" href="">
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-2">
      <h2 className="font-fam fw-light">Customer Orders</h2>
      <div className="table-responsive rounded-3">
        <table className="table table-hover table-bordered">
          <thead className="">
            <tr>
              <th scope="col">Order Number</th>
              <th scope="col">Order Date</th>
              <th scope="col">Artwork Name</th>
              <th scope="col">Artwork Size</th>
              <th scope="col">Material</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} scope="row">
                <td>
                  <img
                    src={
                      order.art.images.find((img) => img.thumbnail === true)
                        ?.image_url || "default-thumbnail.jpg"
                    }
                    alt={`Thumbnail for order ${order.order_number}`}
                    className="img-thumbnail "
                  />
                  <span className="ms-2">{order.order_number}</span>
                </td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.artwork_name}</td>
                <td>{order.artwork_size}</td>
                <td>{order.material}</td>
                <td>{order.quantity}</td>
                <td>${order.total_price}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
