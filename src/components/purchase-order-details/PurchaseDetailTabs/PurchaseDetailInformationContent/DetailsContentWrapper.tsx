export const DetailsContentWrapper = ({ children, Icon, title }) => {
  return (
    <div className="p-6 border rounded-2xl shadow-[0px_1px_2px_0px_#0000000F,0px_1px_3px_0px_#0000001A] space-y-6">
      <div className="flex items-center gap-2">
        <Icon className="text-muted-foreground" />
        <div className="text-lg font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
};
