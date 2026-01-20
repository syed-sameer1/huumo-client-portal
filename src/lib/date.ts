import { formatDistanceToNow, format } from 'date-fns';

type DateParam = Date | string;

export const distanceFromNow = (date: DateParam, options = {}): string => {
  const d =
    typeof date === 'string' || date instanceof String ? new Date(date) : date;
  return formatDistanceToNow(d, options);
};

export const formatDate = (date: DateParam, formatType = 'M/d/yy'): string => {
  const d =
    typeof date === 'string' || date instanceof String ? new Date(date) : date;
  return format(d, formatType);
};
