import {
  connectGoogleSheet,
  googleSheetFiles,
  googleSheetTabs,
  googleSheetPreview,
} from '@/service/import-po';
import { useApiMutation } from './query';

export const useConnectGoogleSheet = (options?: any) => {
  return useApiMutation(connectGoogleSheet, options);
};

export const useGoogleSheetFiles = (options?: any) => {
  return useApiMutation(googleSheetFiles, options);
};

export const useGoogleSheetTabs = (options?: any) => {
  return useApiMutation(googleSheetTabs, options);
};

export const useGoogleSheetPreview = (options?: any) => {
  return useApiMutation(googleSheetPreview, options);
};
