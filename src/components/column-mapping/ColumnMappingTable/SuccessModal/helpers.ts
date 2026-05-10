import { AxiosResponse } from 'axios';

export function getImportJobIdFromVendorCsvResponse(
  res: AxiosResponse<unknown>,
): string | null {
  const body = res.data as
    | { importJobId?: number | string; data?: { importJobId?: number } }
    | undefined;
  const id = body?.importJobId ?? body?.data?.importJobId;
  return id != null ? String(id) : null;
}
