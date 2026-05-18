export {};

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    /** Fixed column width in pixels (purchase orders table layout). */
    width?: number;
  }
}
