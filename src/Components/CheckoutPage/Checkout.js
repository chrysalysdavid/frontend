import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import "./Checkout.scss";

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [cartData, setCartData] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    zipCode: "",
    country: "United States (US)",
    state: "California",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartId = localStorage.getItem('cart_id'); // Get cart_id from local storage
      if (cartId) {
        try {
          const response = await fetch(`https://web-production-e9268.up.railway.app/api/v1/payment/cart/view-cart/?cart_id=${cartId}`);
          const data = await response.json();
          setCartData(data); // Store the fetched data in state
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCartData();
  }, []); // Empty dependency array to run once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStripePayment = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "address", "phone"];
    const isFormValid = requiredFields.every(field => formData[field].trim() !== "");

    if (!isFormValid) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a token using the card details
    const { token, error: stripeError } = await stripe.createToken(cardElement);

    if (stripeError) {
      console.error("Error generating token:", stripeError);
      setError(stripeError.message);
    } else {
      console.log("Generated token:", token);

      // Prepare data to post
      const postData = {
        cart_id: localStorage.getItem('cart_id'), // Assuming cart_id is stored in local storage
        stripe_token: token.id,
        recipient_info: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.state, // Replace with actual city input if available
          postal_code: formData.zipCode,
          country: formData.country,
        },
        total_amount: cartData ? cartData.items.reduce((acc, item) => acc + parseFloat(item.total_amount), 0) : 0,
      };

      // Post data to the server
      try {
        const response = await fetch('https://web-production-e9268.up.railway.app/api/v1/payment/cart/checkout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}` // Add token from local storage
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          const result = await response.json();
          setShowSuccessPopup(true); // Show success popup
          setError(null); // Clear any previous errors
        } else {
          const errorData = await response.json();
          console.error("Error posting data:", errorData);
          setError("Error processing payment.");
        }
      } catch (error) {
        console.error("Error posting data:", error);
        setError("Error processing payment.");
      }
    }
  };

  return (
    <div className="checkout-container">
      <div className="form-container">
        <h1>Checkout</h1>

        {/* Contact Information */}
        <section className="contact-info">
          <h2>Contact Information</h2>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </section>

        {/* Shipping Address */}
        <section className="shipping-address">
          <h2>Shipping Address</h2>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={error && !formData.firstName ? "error" : ""}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={error && !formData.lastName ? "error" : ""}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className={error && !formData.address ? "error" : ""}
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
            />
          </div>
          <div className="form-group">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            >
              <option>United States (US)</option>
              {/* Add other countries here */}
            </select>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              <option>California</option>
              {/* Add other states here */}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip code"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={error && !formData.phone ? "error" : ""}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAddress"
            />
            <label className="form-check-label" htmlFor="sameAddress">
              Use same address for billing
            </label>
          </div>
        </section>

        {/* Payment Options */}
        <section className="payment-options">
          <h2>Pay with Stripe</h2>
          <form onSubmit={handleStripePayment}>
            <div className="card-details">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#000',
                      '::placeholder': { color: '#ccc' },
                    },
                  },
                }}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="pay-button">
              Pay via Stripe
            </button>
          </form>
        </section>

        {/* Additional Notes */}
        <textarea placeholder="Add a note to your order" />

        {/* Terms and Submit */}
        <div className="terms">
          <p>
            By proceeding with your purchase, you agree to our{" "}
            <a href="#">Terms and Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartData && cartData.items.map(item => (
          <div className="item" key={item.product.id}>
            <span>{item.product.name}</span>
            <span>${item.total_amount}</span>
          </div>
        ))}
        <div className="details">
          <p>Subtotal: ${cartData ? cartData.items.reduce((acc, item) => acc + parseFloat(item.total_amount), 0).toFixed(2) : '0.00'}</p>
          <p>Delivery: FREE</p>
          <p>Taxes: FREE</p>
        </div>
        <div className="total">
          <h3>Total</h3>
          <h3>${cartData ? cartData.items.reduce((acc, item) => acc + parseFloat(item.total_amount), 0).toFixed(2) : '0.00'}</h3>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h2>Thank You!</h2>
            <p>You donated 13% to Earthopia successfully.</p>
            <button onClick={() => setShowSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}