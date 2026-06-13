import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {environment} from '../utils/environment';

const apiUrl = environment.apiUrl;
const apiUrl2 = environment.apiUrl3;

const getHeaders = async () => {
  const token = await AsyncStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    'x-key': 'rajesh',
    'x-auth-token': token
      ? JSON.stringify(token)
      : null,
  };
};

// ADMIN LOGIN
export const login = async (post: any) => {
  const response = await axios.post(
    `${apiUrl2}/erp-wt/admin-login`,
    post,
    {
      headers: await getHeaders(),
    },
  );

  return response.data;
};

// DELIVERY LOGIN
export const dellogin = async (post: any) => {
  const response = await axios.post(
    `${apiUrl2}/erp-wt/csa-login`,
    post,
    {
      headers: await getHeaders(),
    },
  );

  return response.data;
};

// USER LOGIN
export const ulogin = async (post: any) => {
  const response = await axios.post(
    `${apiUrl}/user/login`,
    post,
    {
      headers: await getHeaders(),
    },
  );

  return response.data;
};

// USER ORG
export const getUserOrg = async () => {
  const response = await axios.get(
    `${apiUrl2}/erp/get-user-org`,
    {
      headers: await getHeaders(),
    },
  );

  return response.data;
};

// REFRESH TOKEN
export const refreshToken = async (
  csaId: number,
) => {
  const response = await axios.post(
    `${apiUrl2}/erp/refresh-token`,
    {
      CSA_Id: Number(csaId),
    },
    {
      headers: await getHeaders(),
    },
  );

  if (response.data?.token) {
    await AsyncStorage.setItem(
      'token',
      String(response.data.token),
    );
  }

  return response.data;
};

// CSA PROFILE
export const getCsaProfile = async (
  csaId: number,
) => {
  const response = await axios.post(
    `${apiUrl2}/erp/csa-profile`,
    {
      CSA_Id: csaId,
    },
    {
      headers: await getHeaders(),
    },
  );

  return response.data;
};


// SALE PURCHASE (CSA BASED)
export const getSalePurchase = async (
  csaId: number,
) => {
  const response = await axios.post(
    `${apiUrl2}/erp/sale-purchase`,
    {
      csaId,
    },
    {
      headers: await getHeaders(),
    },
  );

  return response.data;
};

// RETAIL SALE PURCHASE (DATE FILTER)
export const getRetailSalePurchase =
  async (
    startDate: string,
    endDate: string,
  ) => {
    const response = await axios.post(
      `${apiUrl2}/retail/sale-purchase`,
      {
        startDate,
        endDate,
      },
      {
        headers: await getHeaders(),
      },
    );

    return response.data;
  };

// yaha se Reports ki functions
// // STOCK ANALYSIS ERP
export const getStockAnalysisERP = async (
  csaId: number,
  startDate: string = '',
  endDate: string = '',
) => {
  const response = await axios.post(
    `${apiUrl2}/erp/stock-anal`,
    {
      startDate,
      endDate,
      csa_id: String(csaId),
    },
    {
      headers: await getHeaders(),
    },
  );

  return response.data;
};