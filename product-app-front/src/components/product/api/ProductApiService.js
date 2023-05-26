import { apiClient } from './ApiClient'

export const retrieveAllProductApi
    = () => apiClient.get(`/api/products`)

export const deleteProductApi
    = (productcode) => apiClient.delete(`/api/products/${productcode}`)

export const retrieveProductApi
    = (productcode) => apiClient.get(`/api/products/${productcode}`)

export const updateProductApi
    = (productcode, product) => apiClient.put(`/api/products/${productcode}`, product)

export const createProductApi
    = (product) => apiClient.post(`/api/products`, product)
