import axios from "axios";

const API_URL = "https://web-production-e9268.up.railway.app/api/v1";

// Register API call
export const registerUser = async (email, password, role = "artist") => {
  try {
    const response = await axios.post(`${API_URL}/user/register/`, {
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const registerCustomer = async (
  firstName,
  lastName,
  email,
  password
) => {
  try {
    const response = await axios.post(`${API_URL}/user/register/`, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      role: "customer",
    });
    return response.data;
  } catch (error) {
    console.error("Error registering customer:", error);
    throw error;
  }
};

//login api call

export const loginUser = async (email, password, role = "artist") => {
  try {
    const response = await axios.post(`${API_URL}/user/login/`, {
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error Login:", error);
    throw error;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/customer-account/forgot-password/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error forgot password:", error);
    throw error;
  }
};

//Category List

export const getArtCategoryList = async () => {
  try {
    const response = await axios.get(`${API_URL}/arts/art_category_list/`);

    return response.data;
  } catch (error) {
    console.error("Error fetching art categories:", error);
    throw error;
  }
};

// Artist Profile API call
export const getArtistProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/arts/artist_profile/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artist profile:", error);
    throw error;
  }
};

//art_api
export const getArtList = async () => {
  try {
    const response = await axios.get(`${API_URL}/arts/art/get_all_arts_list/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching art list:", error);
    throw error;
  }
};

// Category List by ID
export const getArtCategoryById = async (id) => {
  try {
    const response = await axios.get(
      `${API_URL}/arts/art_category_list/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching art category with ID ${id}:`, error);
    throw error;
  }
};

//Our Collection Api
export const getOurCollection = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/arts/home/?section=showcase_section`
    );
    return response.data;
  } catch (error) {
    console.log("Our Collection APi Error");
  }
};

//Home_list_one Api
export const getSectionListOne = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/arts/home/?section=list_one_section`
    );
    return response.data;
  } catch (error) {
    console.log("Our Collection APi Error");
  }
};

//Home_List_two
export const getSectionListtwo = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/arts/home/?section=list_two_section`
    );
    return response.data;
  } catch (error) {
    console.log("Our Collection APi Error");
  }
};

//ART MADE BY HUMANS

export const artistByHome = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/arts/home/?section=rotate_section`
    );
    return response.data;
  } catch (error) {
    console.log("Our Collection APi Error");
  }
};

//single Artist
export const fetchArtistProfile = (artistId) => {
  return axios.get(`${API_URL}/arts/artist_profile/${artistId}/`);
};
//Artist work
export const fetchArtistArtworks = (artistId) => {
  return axios.get(`${API_URL}/arts/art/get_all_arts_list/`, {
    params: { artis_id: artistId },
  });
};

//category by id
export const fetchCategoryById = (catId) => {
  return axios.get(
    `${API_URL}/arts/art/get_all_arts_list/?art_category=${catId}`
  );
};

export const fetchCustomerOrders = (headers, customerId) => {
  return axios.get(`${API_URL}/payment/orders_list/?buyer_id=${customerId}`, {
    headers,
  });
};

export const fetchCustomerShippingAddress = (headers) => {
  return axios.get(`${API_URL}/payment/shipment-info`, {
    headers,
  });
};

export const fetchCustomerBillingAddress = (headers) => {
  return axios.get(`${API_URL}/payment/billing-info`, {
    headers,
  });
};

export const createCustomerShippingAddress = (headers, data) => {
  return axios.post(`${API_URL}/payment/shipment-info/`, data, { headers });
};

export const updateCustomerShippingAddress = (
  headers,
  data,
  shipping_address_id
) => {
  return axios.put(
    `${API_URL}/payment/shipment-info/${shipping_address_id}/`,
    data,
    {
      headers,
    }
  );
};
export const createCustomerBillingAddress = (headers, data) => {
  return axios.post(`${API_URL}/payment/billing-info/`, data, { headers });
};
export const updateCustomerBillingAddress = (
  headers,
  data,
  billing_address_id
) => {
  return axios.put(
    `${API_URL}/payment/billing-info/${billing_address_id}/`,
    data,
    { headers }
  );
};

export const fetchCustomerPaymentMethods = (headers) => {
  return axios.get(`${API_URL}/payment/payment-methods/`, { headers });
};
export const createCustomerPaymentMethods = (headers, data) => {
  return axios.post(`${API_URL}/payment/payment-methods/`, data, { headers });
};
export const updateCustomerPaymentMethods = (
  headers,
  data,
  payment_method_id
) => {
  return axios.put(
    `${API_URL}/payment/payment-methods/${payment_method_id}/`,
    data,
    {
      headers,
    }
  );
};

export const deleteCustomerPaymentMethods = (headers, payment_method_id) => {
  return axios.delete(
    `${API_URL}/payment/payment-methods/${payment_method_id}/`,
    { headers }
  );
};

export const fetchCustomerAccount = (headers) => {
  return axios.get(`${API_URL}/user/customer-account/`, { headers });
};

export const patchCustomerAccount = (headers, data, user_id) => {
  return axios.patch(`${API_URL}/user/customer-account/${user_id}/`, data, {
    headers,
  });
};

export const changeCustomerPassword = (headers, data, user_id) => {
  return axios.put(`${API_URL}/user/customer-account/${user_id}/`, data, {
    headers,
  });
};
