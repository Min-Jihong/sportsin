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
      // 인증 관련 엔드포인트는 accessToken을 추가하지 않음
      const isAuthEndpoint = config.url?.includes("/oauth/") || config.url?.includes("/login");

      if (!isAuthEndpoint) {
        const accessToken = getAuthToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
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

// Use local API routes to avoid CORS issues
export const commonApi = new AxiosApiClient().setBaseUrl("/api/common");
export const sportsinApi = new AxiosApiClient().setBaseUrl("/api/sportsin");
