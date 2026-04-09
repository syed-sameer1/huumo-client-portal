import { urls } from '@/constants/urls';
import { api } from '../api';

export const connectGoogleSheet = async () => {
  const { data } = await api.get(urls.connectGoogleSheet);
  return data;
};

export const googleSheetFiles = async () => {
  return api.get(urls.googleSheetFiles);
};

export const googleSheetTabs = async (spreadsheetId: string) => {
  return api.get(urls.googleSheetTabs, { params: { spreadsheetId } });
};

export const googleSheetPreview = async (params: {
  spreadsheetId: string;
  sheetName: string;
}) => {
  return api.get(urls.googleSheetPreview, { params });
};
