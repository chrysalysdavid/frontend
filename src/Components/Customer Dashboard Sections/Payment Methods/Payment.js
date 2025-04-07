import React, { useEffect, useState } from "react";
import "../Dasboard Styling/dash_style.scss";
import {
  fetchCustomerPaymentMethods,
  createCustomerPaymentMethods,
  updateCustomerPaymentMethods,
  fetchCustomerAccount,
} from "../../../Services/apiservice";
import { CardLoadingSkeleton } from "../../LoadingSkeleton/LoadingSkeleton";

export default function Payment() {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Allowed fields for payment details
  const paymentFields = [
    "card_number",
    "card_holder_name",
    "expiry_date",
    "cvv",
    "postal_code",
  ];

  useEffect(() => {
    const fetchPaymentDetailsAndUser = async () => {
      try {
        const headers = {
          Authorization: `Token ${localStorage.getItem("token")}`,
        };

        const accountResponse = await fetchCustomerAccount(headers);
        setUser(accountResponse.data);

        const paymentResponse = await fetchCustomerPaymentMethods(headers);
        setPaymentDetails(
          paymentResponse.data.length ? paymentResponse.data[0] : null
        );
      } catch (error) {
        console.error("Error fetching payment details or user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetailsAndUser();
  }, []);

  const handleOpenModal = (existingData = null) => {
    const initialData = {
      card_number: "",
      card_holder_name: "",
      expiry_date: "",
      cvv: "",
      postal_code: "",
      user: user ? user.id : null,
      ...existingData,
    };

    setModalData({ fields: initialData });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setModalData((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (!user) {
      console.error("User data is not available.");
      return;
    }

    const headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };

    try {
      const paymentData = modalData.fields;
      paymentData.user = user.id;

      if (paymentDetails) {
        await updateCustomerPaymentMethods(
          headers,
          paymentData,
          paymentDetails.id
        );
      } else {
        await createCustomerPaymentMethods(headers, paymentData);
      }

      const paymentResponse = await fetchCustomerPaymentMethods(headers);
      setPaymentDetails(
        paymentResponse.data.length ? paymentResponse.data[0] : null
      );
    } catch (error) {
      console.error("Error saving payment details:", error);
    } finally {
      handleCloseModal();
    }
  };

  if (loading) {
    return (
      <div className="px-2">
        <CardLoadingSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="content bg-white ps-2 rounded">
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="address-box border rounded shadow-sm">
              <div className="border-bottom">
                <div className="p-3 pb-0">
                  <h3 className="font-fam">Payment Methods</h3>
                </div>
                <div className="d-flex justify-content-end p-3 ">
                  <button
                    className="btn btn-primary rounded-pill px-3 border-0 fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#paymentModal"
                    onClick={() => handleOpenModal(paymentDetails)}
                  >
                    {paymentDetails ? "Edit" : "Add"} Payment Method
                  </button>
                </div>
              </div>
              {paymentDetails ? (
                <div className="p-3">
                  {paymentFields.map((field) => (
                    <p className="mb-1" key={field}>
                      <strong className="font-fam">
                        {field.replace(/_/g, " ").toUpperCase()}:
                      </strong>{" "}
                      {paymentDetails[field]}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0 p-3">
                  You have not set up your payment details yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="paymentModal"
        tabIndex="-1"
        aria-labelledby="paymentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-fam" id="paymentModalLabel">
                Payment Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  {modalData &&
                    Object.keys(modalData.fields).map((field) => {
                      if (field === "user") return null;

                      return (
                        <div className="col-12 col-md-6 mb-3" key={field}>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={field.replace(/_/g, " ")}
                            value={modalData.fields[field]}
                            onChange={(e) =>
                              handleInputChange(field, e.target.value)
                            }
                          />
                        </div>
                      );
                    })}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill border-0 px-3 fw-semibold"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary border-0 px-3 fw-semibold"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
