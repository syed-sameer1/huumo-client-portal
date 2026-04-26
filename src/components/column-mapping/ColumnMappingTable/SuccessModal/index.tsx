import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AccordionContent } from '@/components/ui/accordion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PreviewSummaryType } from '@/types/csvImport';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { routeUrls } from '@/constants/urls';
import { Check } from 'lucide-react';

export const SuccessModal = ({
  previewSummary,
  open,
  onClose,
  setShowEmailMissingModal,
  flow = 'purchase-order',
}: {
  previewSummary: PreviewSummaryType;
  open: boolean;
  onClose: () => void;
  setShowEmailMissingModal?: (show: boolean) => void;
  flow?: 'purchase-order' | 'vendor';
}) => {
  const router = useRouter();

  const onContinue = () => {
    if (flow === 'vendor') {
      onClose();
      router.push(routeUrls.vendorsRoute);
      return;
    }
    const isVendorEmailMissing = !!previewSummary.missingVendorEmailCount;
    if (isVendorEmailMissing && setShowEmailMissingModal) {
      setShowEmailMissingModal(true);
      onClose();
    } else {
      onClose();
      router.push(routeUrls.purchaseOrdersRoute);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[520px] pt-10">
          <div>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <div className="w-[120px] h-[120px] rounded-full bg-[#20A6650D] flex items-center justify-center mx-auto mb-6">
                  <Check size={70} color="#20A665" strokeWidth={3} />
                </div>
                <div className="text-[18px] font-semibold">
                  Successfully Imported
                </div>
                <div className="text-sm">
                  Data has been imported successfully
                </div>
              </div>
              <div
                className={
                  flow === 'vendor'
                    ? 'import-success-modal-scroll max-h-[252px] space-y-2 overflow-y-auto'
                    : 'import-success-modal-scroll h-[252px] space-y-2'
                }
              >
                <div className="text-[#3F3F46]">
                  Total records :{' '}
                  <span className="font-semibold text-[#09090B]">
                    {previewSummary?.totalRows}
                  </span>
                </div>
                <div className="text-[#3F3F46]">
                  Valid records :{' '}
                  <span className="font-semibold text-[#09090B]">
                    {previewSummary?.validRows}
                  </span>
                </div>
                <div className="text-[#3F3F46]">
                  Invalid records :{' '}
                  <span className="font-semibold text-[#09090B]">
                    {previewSummary?.invalidRows}
                  </span>
                </div>
                <div className="text-[#3F3F46]">
                  Duplicate records :{' '}
                  <span className="font-semibold text-[#09090B]">
                    {previewSummary?.duplicateRows}
                  </span>
                </div>
                {flow === 'purchase-order' && (
                  <>
                    <div className="text-[#3F3F46]">
                      Total POs :{' '}
                      <span className="font-semibold text-[#09090B]">
                        {previewSummary?.uniquePOs}
                      </span>
                    </div>
                    <div className="text-[#3F3F46]">
                      POs to create :{' '}
                      <span className="font-semibold text-[#09090B]">
                        {previewSummary?.newPOs}
                      </span>
                    </div>
                    <div className="text-[#3F3F46]">
                      POs to update :{' '}
                      <span className="font-semibold text-[#09090B]">
                        {previewSummary?.existingPOs}
                      </span>
                    </div>
                    <div className="text-[#3F3F46]">
                      Missing vendor emails:{' '}
                      <span className="font-semibold text-[#09090B]">
                        {previewSummary?.missingVendorEmailCount}
                      </span>
                    </div>

                    <div className="text-[#3F3F46]">
                      Overdue POs:{' '}
                      <span className="font-semibold text-[#09090B]">
                        {previewSummary?.overdueCount}
                      </span>
                    </div>
                  </>
                )}
                <div className="text-[#3F3F46]">
                  Errors :{' '}
                  <span className="font-semibold text-[#09090B]">
                    {previewSummary?.topErrors?.length ?? 0}
                  </span>
                </div>
              </div>

              {!!previewSummary?.topErrors?.length && (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="errors">
                    <AccordionTrigger className="no-underline hover:no-underline pt-0 text-md text-[#3F3F46]">
                      Errors
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {Object.keys(previewSummary.errorBreakdown).map(
                          (val, index) => {
                            return (
                              <li key={`${val}-${index}`}>
                                {val}: {previewSummary.errorBreakdown[val]}
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              <div className="flex justify-between gap-12">
                <Button className="flex-1" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={onContinue}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
