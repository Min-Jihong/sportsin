"use client";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { cloneDeep } from "es-toolkit";

import { protectedServer } from "./protected-server";
import { getAuthToken } from "./auth";

class AxiosApiClient {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();

    if (protectedServer()) return;

    this.axios.interceptors.request.use((config) => {
      const accessToken = getAuthToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      config.data = cloneDeep(config.data);
      return config;
    });
  }

  public setBaseUrl(baseUrl: string) {
    this.axios.defaults.baseURL = baseUrl;
    return this;
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config).then((res) => res.data);
  }
  public async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(url, config).then((res) => res.data);
  }
  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.post<T>(url, data, config).then((res) => res.data);
  }
  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.put<T>(url, data, config).then((res) => res.data);
  }
  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.axios.patch<T>(url, data, config).then((res) => res.data);
  }
}

export const clientApi = new AxiosApiClient().setBaseUrl(`${process.env.NEXT_PUBLIC_API_HOST}/v1`);
