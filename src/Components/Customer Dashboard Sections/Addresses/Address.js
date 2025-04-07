import React, { useEffect, useState } from "react";
import "../Dasboard Styling/dash_style.scss";
import {
  fetchCustomerBillingAddress,
  fetchCustomerShippingAddress,
  createCustomerBillingAddress,
  createCustomerShippingAddress,
  updateCustomerBillingAddress,
  updateCustomerShippingAddress,
  fetchCustomerAccount,
} from "../../../Services/apiservice";
import { CardLoadingSkeleton } from "../../LoadingSkeleton/LoadingSkeleton";

const countryStates = {
  USA: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "District of Columbia",
  ],
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ],
};

export default function Address() {
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const billingFields = [
    "email",
    "recipient_name",
    "first_name",
    "last_name",
    "company_name",
    "phone",
    "address",
    "country",
    "state",
    "city",
    "postal_code",
  ];
  const shippingFields = [
    "email",
    "first_name",
    "last_name",
    "company_name",
    "phone",
    "address",
    "country",
    "state",
    "city",
    "postal_code",
  ];

  useEffect(() => {
    const fetchAddressesAndUser = async () => {
      try {
        const headers = {
          Authorization: `Token ${localStorage.getItem("token")}`,
        };
        const accountResponse = await fetchCustomerAccount(headers);
        setUser(accountResponse.data);

        const billingResponse = await fetchCustomerBillingAddress(headers);
        setBillingAddress(
          billingResponse.data.length ? billingResponse.data[0] : null
        );

        const shippingResponse = await fetchCustomerShippingAddress(headers);
        setShippingAddress(
          shippingResponse.data.length ? shippingResponse.data[0] : null
        );
      } catch (error) {
        console.error("Error fetching addresses or user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddressesAndUser();
  }, []);

  const handleOpenModal = (type, existingData = null) => {
    const initialData = {
      email: "",
      recipient_name: "",
      first_name: "",
      last_name: "",
      company_name: "",
      phone: "",
      address: "",
      country: "",
      state: "",
      city: "",
      postal_code: "",
      user: user ? user.id : null,
      ...existingData,
    };

    setModalData({ type, fields: initialData });
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
        ...(field === "country" && { state: "" }), // Reset state when country changes
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
      const addressData = modalData.fields;
      addressData.user = user.id;

      if (modalData.type === "billing") {
        if (billingAddress) {
          await updateCustomerBillingAddress(
            headers,
            addressData,
            billingAddress.id
          );
        } else {
          await createCustomerBillingAddress(headers, addressData);
        }
        const billingResponse = await fetchCustomerBillingAddress(headers);
        setBillingAddress(billingResponse.data.billing_address);
      } else {
        if (shippingAddress) {
          await updateCustomerShippingAddress(
            headers,
            addressData,
            shippingAddress.id
          );
        } else {
          await createCustomerShippingAddress(headers, addressData);
        }
        const shippingResponse = await fetchCustomerShippingAddress(headers);
        setShippingAddress(
          shippingResponse.data.length ? shippingResponse.data[0] : null
        );
      }
    } catch (error) {
      console.error("Error saving address:", error);
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
    <div className="w-100">
      <div className="content bg-white ps-2 rounded">
        <div className="row">
          <div className="col-md-6 mb-4 ">
            <div className="address-box border rounded shadow-sm">
              <div className="border-bottom">
                <div className="p-3 pb-0">
                  <h3 className="font-fam">Billing Address</h3>
                </div>
                <div className="d-flex justify-content-end p-3 ">
                  <button
                    className="btn btn-primary rounded-pill px-3 border-0 fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#addressModal"
                    onClick={() => handleOpenModal("billing", billingAddress)}
                  >
                    {billingAddress ? "Edit" : "Add"} Billing Address
                  </button>
                </div>
              </div>
              {billingAddress ? (
                <div className="p-3">
                  {billingFields.map((field) => (
                    <p className="mb-1" key={field}>
                      <strong className="font-fam">
                        {field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/_/g, " ")}
                        :
                      </strong>{" "}
                      {billingAddress[field]}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0 p-3">
                  You have not set up this type of address yet.
                </p>
              )}
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="address-box border rounded shadow-sm">
              <div className="border-bottom">
                <div className="p-3 pb-0">
                  <h3 className="font-fam">Shipping Address</h3>
                </div>
                <div className="d-flex justify-content-end p-3 ">
                  <button
                    className="btn  btn-primary rounded-pill px-3 border-0 fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#addressModal"
                    onClick={() => handleOpenModal("shipping", shippingAddress)}
                  >
                    {shippingAddress ? "Edit" : "Add"} Shipping Address
                  </button>
                </div>
              </div>
              {shippingAddress ? (
                <div className="p-3">
                  {shippingFields.map((field) => (
                    <p className="mb-1" key={field}>
                      <strong className="font-fam">
                        {field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/_/g, " ")}
                        :
                      </strong>{" "}
                      {shippingAddress[field]}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0 p-3">
                  You have not set up this type of address yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addressModal"
        tabIndex="-1"
        aria-labelledby="addressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addressModalLabel">{`${
                modalData?.type === "billing" ? "Billing" : "Shipping"
              } Address`}</h5>
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
                    Object.keys(modalData.fields)
                      .filter((field) =>
                        (modalData.type === "billing"
                          ? billingFields
                          : shippingFields
                        ).includes(field)
                      )
                      .map((field) => {
                        if (field === "user") return null;

                        if (field === "country") {
                          return (
                            <div className="col-12 col-md-6 mb-3" key={field}>
                              <select
                                className="form-control"
                                value={modalData.fields[field]}
                                onChange={(e) =>
                                  handleInputChange(field, e.target.value)
                                }
                              >
                                <option value="">Select Country</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                              </select>
                            </div>
                          );
                        }

                        if (field === "state") {
                          const country = modalData.fields.country;
                          const states = countryStates[country] || [];
                          return (
                            <div className="col-12 col-md-6 mb-3" key={field}>
                              <select
                                className="form-control"
                                value={modalData.fields[field]}
                                onChange={(e) =>
                                  handleInputChange(field, e.target.value)
                                }
                              >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                  <option key={state} value={state}>
                                    {state}
                                  </option>
                                ))}
                              </select>
                            </div>
                          );
                        }

                        return (
                          <div className="col-12 col-md-6 mb-3" key={field}>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={
                                field.charAt(0).toUpperCase() +
                                field.slice(1).replace(/_/g, " ")
                              }
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
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
