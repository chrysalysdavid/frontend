import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Styles.scss";
import "./Cartpage.scss";

const CartPage = () => {
  const [Cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartDetails = async () => {
      const id = localStorage.getItem("cart_id");
      if (id) {
        try {
          const response = await fetch(
            `https://web-production-e9268.up.railway.app/api/v1/payment/cart/view-cart/?cart_id=${id}`
          );
          const data = await response.json();
          setCart(data); // Update cart details
          console.log("Cart", data);
        } catch (error) {
          console.error("Error fetching cart details:", error);
        } finally {
          setLoading(false); // Set loading to false after fetch attempt
        }
      } else {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        {/* Left Side: Cart Items */}
        <div className="left-content">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th className="d-flex justify-content-end">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2">
                  <div className="scrollable-product-list">
                    {Cart && Cart.items.length > 0 ? (
                      Cart.items.map((item, index) => {
                        const product = item.product;
                        const imageUrl =
                          product.images?.[0]?.image_url ||
                          "https://via.placeholder.com/150";
                        const material = product.materials?.[0] || "N/A";
                        const size = product.sizes?.[0] || "N/A";
                        const price = parseFloat(product.price_range.split('-')[0]) || 0;
                        const totalPrice = parseFloat(item.total_amount) || 0;

                        return (
                          <tr key={index}>
                            <td>
                              <div className="cart-item">
                                <img src={imageUrl} alt={product.title} />
                                <div className="item-details">
                                  <h5>{product.title}</h5>
                                  <p className="price">${price.toFixed(2)}</p>
                                  <p className="sold-by">
                                    Sold by:{" "}
                                    {product.created_by?.username || "Unknown"}
                                  </p>
                                  <p>Material: {material}</p>
                                  <p>Size: {size}</p>
                                  <div className="quantity-controls">
                                    <button className="minus-btn">-</button>
                                    <input
                                      type="number"
                                      value={item.quantity}
                                      readOnly
                                    />
                                    <button className="plus-btn">+</button>
                                  </div>
                                  <button className="remove-item">Remove item</button>
                                </div>
                              </div>
                            </td>
                            <td className="vertical-top text-right">
                              ${totalPrice.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="2">No items in the cart.</td>
                      </tr>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {Cart && Cart.items.length > 0 ? (
          <div className="cart-sidebar">
            <table className="cart-table w-100">
              <thead>
                <tr>
                  <th>Cart Total</th>
                </tr>
              </thead>
            </table>
            <div className="pricing">
              <div className="subtotal">
                <div className="pad-subtotal">
                  <span>Subtotal</span>
                  <strong>${Cart.total_cart_amount || 0}</strong>
                </div>
              </div>
              <div className="shipping">
                <div className="pad-subtotal">
                  <div>
                    <p className="m-0">Delivery</p>
                    <p className="f-12 m-0 pt-2">Free shipping</p>
                  </div>
                  <strong>Free</strong>
                </div>
                <div className="address">
                  <div className="pad-subtotal">
                    <p className="f-14 m-0">
                      Shipping to California, United States (US)
                    </p>
                  </div>
                </div>
                <div className="mt-3 px-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Free Shipping
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="Total px-3">
              <h6 className="f-20 m-0">Total</h6>
              <p className="total-amount">${Cart.total_cart_amount || 0}</p>
            </div>
            <Link to={`/Checkout`}>
              <button className="Checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        ) : (
          <tr>
            <td colSpan="2">No items in the cart.</td>
          </tr>
        )}

        <div aria-hidden="true" className="wp-block-spacer"></div>
      </div>
    </div>
  );
};

export default CartPage;
