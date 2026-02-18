import { urls } from '@/constants/urls';
import { api } from '../api';
import { AxiosResponse } from 'axios';
import { PurchaseOrders, PurchaseOrdersResponse } from '@/types/purchaseOrders';

export const purchaseOrdersService = ({
  limit,
  pageNumber,
}: {
  limit: number;
  pageNumber: number;
}): Promise<AxiosResponse<PurchaseOrdersResponse>> =>
  api.get(`${urls.purchaseOrder}/?limit=${limit}&pageNumber=${pageNumber}`);

export const purchaseOrderDetails = (
  purchaseOrderId: string,
): Promise<AxiosResponse<{ purchaseOrder: PurchaseOrders }>> =>
  api.get(
    urls.purchaseOrderDetails.replace('{purchaseOrderId}', purchaseOrderId),
  );
