'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';
import { useConnectGoogleSheet } from '@/hooks/importPo';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/LoadingButton';

export type ImportPlatformOption = 'google-sheets' | 'microsoft-sheet';

export type GoogleSheetFile = {
  id: string;
  name: string;
  modifiedTime: string;
};

export type GoogleSheetTab = {
  title: string;
};

type PlatformCard = {
  id: ImportPlatformOption;
  title: string;
  description: string;
  image: string;
  connectedKey: 'googleSheetConnected' | 'microsoftSheetConnected';
};

const PLATFORM_OPTIONS: PlatformCard[] = [
  {
    id: 'google-sheets',
    title: 'Google Sheets',
    description: 'Integrate into the platform for seamless file imports',
    image: '/images/google-sheet-icon.svg',
    connectedKey: 'googleSheetConnected',
  },
  // {
  //   id: 'microsoft-sheet',
  //   title: 'Microsoft Sheet',
  //   description: 'Integrate into the platform for seamless file imports',
  //   image: '/images/microsoft-sheet-icon.svg',
  //   connectedKey: 'microsoftSheetConnected',
  // },
];

type ModalView = 'platforms' | 'files' | 'tabs';

type ImportPOModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: (selectedOption: ImportPlatformOption) => void;
  isFetchingFiles?: boolean;
  sheetFiles?: GoogleSheetFile[];
  onFileSelect?: (file: GoogleSheetFile) => void;
  onClearFiles?: () => void;
  isFetchingTabs?: boolean;
  sheetTabs?: GoogleSheetTab[];
  onTabSelect?: (tab: GoogleSheetTab) => void;
  onClearTabs?: () => void;
  isFetchingPreview?: boolean;
};

export const ImportPOModal = ({
  open,
  onOpenChange,
  onContinue,
  isFetchingFiles = false,
  sheetFiles,
  onFileSelect,
  onClearFiles,
  isFetchingTabs = false,
  sheetTabs,
  onTabSelect,
  onClearTabs,
  isFetchingPreview = false,
}: ImportPOModalProps) => {
  const [selectedOption, setSelectedOption] =
    useState<ImportPlatformOption | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedTabTitle, setSelectedTabTitle] = useState<string | null>(null);
  const { mutate: connectGoogle, isPending: isConnectingGoogle } =
    useConnectGoogleSheet();

  const view: ModalView =
    sheetTabs && sheetTabs.length > 0
      ? 'tabs'
      : sheetFiles && sheetFiles.length > 0
        ? 'files'
        : 'platforms';

  const handleConnectGoogle = (e: React.MouseEvent) => {
    e.stopPropagation();
    connectGoogle(undefined, {
      onSuccess: (res) => {
        window.location.href = (res as any)?.url;
      },
      onError: () => {
        toast.error('Could not connect Google Sheets. Please try again.');
      },
    });
  };

  const handlePlatformContinue = () => {
    if (!selectedOption) return;
    onContinue?.(selectedOption);
  };

  const handleFilesContinue = () => {
    const file = sheetFiles?.find((f) => f.id === selectedFileId);
    if (file) onFileSelect?.(file);
  };

  const handleTabsContinue = () => {
    const tab = sheetTabs?.find((t) => t.title === selectedTabTitle);
    if (tab) onTabSelect?.(tab);
  };

  const resetAll = () => {
    setSelectedFileId(null);
    setSelectedTabTitle(null);
    onClearTabs?.();
    onClearFiles?.();
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetAll();
    onOpenChange(next);
  };

  const goBackToFiles = () => {
    setSelectedTabTitle(null);
    onClearTabs?.();
  };

  const goBackToPlatforms = () => {
    setSelectedFileId(null);
    setSelectedTabTitle(null);
    onClearTabs?.();
    onClearFiles?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[92vw] max-w-[763px] p-0 overflow-hidden [&>button]:hidden">
        <div className="p-[24px]">
          {/* ─── View: Platform selection ─── */}
          {view === 'platforms' && (
            <>
              <div className="flex items-start justify-between gap-4">
                <DialogHeader>
                  <DialogTitle className="text-sm font-semibold">
                    Integrate Platform
                  </DialogTitle>
                </DialogHeader>
                <button
                  type="button"
                  className="rounded-md p-1.5 text-zinc-700 hover:bg-zinc-100"
                  onClick={() => handleOpenChange(false)}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {PLATFORM_OPTIONS.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isAlreadyConnected =
                    option.connectedKey &&
                    (JSON.parse(localStorage.getItem('user') ?? '{}') as User)[
                      option.connectedKey
                    ];
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedOption(option.id)}
                      className={cn(
                        'rounded-xl border p-4 text-left transition-colors space-y-[16px]',
                        'hover:border-[#20A665]/70',
                        isSelected ? 'border-[#20A665]' : 'border-zinc-200',
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <Image
                          src={option.image}
                          width={62}
                          height={62}
                          alt={option.title}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-9 px-5 bg-[#FAFAFA] text-[#20A665] hover:text-[#20A665]"
                          disabled={
                            isAlreadyConnected ||
                            (option.id === 'google-sheets' &&
                              isConnectingGoogle)
                          }
                          onClick={
                            option.id === 'google-sheets'
                              ? handleConnectGoogle
                              : undefined
                          }
                        >
                          {isAlreadyConnected
                            ? 'Connected'
                            : option.id === 'google-sheets' &&
                                isConnectingGoogle
                              ? 'Connecting…'
                              : 'Connect'}
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base font-medium leading-[24px] text-black">
                          {option.title}
                        </h3>
                        <p className="max-w-[335px] text-sm text-[#3F3F46]">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-end">
                <LoadingButton
                  type="button"
                  loading={isFetchingFiles}
                  className="w-[170px] bg-background-secondary"
                  disabled={!selectedOption || isFetchingFiles}
                  onClick={handlePlatformContinue}
                >
                  Continue
                </LoadingButton>
              </div>
            </>
          )}

          {/* ─── View: Spreadsheet file list ─── */}
          {view === 'files' && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-md p-1.5 text-zinc-700 hover:bg-zinc-100"
                    onClick={goBackToPlatforms}
                    aria-label="Go back"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <DialogHeader>
                    <DialogTitle className="text-sm font-semibold">
                      Select a Spreadsheet
                    </DialogTitle>
                  </DialogHeader>
                </div>
                <button
                  type="button"
                  className="rounded-md p-1.5 text-zinc-700 hover:bg-zinc-100"
                  onClick={() => handleOpenChange(false)}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 max-h-[400px] space-y-2 overflow-y-auto">
                {(!sheetFiles || sheetFiles.length === 0) && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No spreadsheets found in your account.
                  </p>
                )}
                {sheetFiles?.map((file) => {
                  const isSelected = selectedFileId === file.id;
                  return (
                    <button
                      key={file.id}
                      type="button"
                      onClick={() => setSelectedFileId(file.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                        'hover:border-[#20A665]/70',
                        isSelected
                          ? 'border-[#20A665] bg-[#20A665]/5'
                          : 'border-zinc-200',
                      )}
                    >
                      <Image
                        src="/images/google-sheet-icon.svg"
                        width={32}
                        height={32}
                        alt="Google Sheet"
                      />
                      <span className="truncate text-sm font-medium text-black">
                        {file.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-end">
                <LoadingButton
                  type="button"
                  loading={isFetchingTabs}
                  className="w-[170px] bg-background-secondary"
                  disabled={!selectedFileId || isFetchingTabs}
                  onClick={handleFilesContinue}
                >
                  Continue
                </LoadingButton>
              </div>
            </>
          )}

          {/* ─── View: Tab list ─── */}
          {view === 'tabs' && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-md p-1.5 text-zinc-700 hover:bg-zinc-100"
                    onClick={goBackToFiles}
                    aria-label="Go back"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <DialogHeader>
                    <DialogTitle className="text-sm font-semibold">
                      Select a Sheet Tab
                    </DialogTitle>
                  </DialogHeader>
                </div>
                <button
                  type="button"
                  className="rounded-md p-1.5 text-zinc-700 hover:bg-zinc-100"
                  onClick={() => handleOpenChange(false)}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 max-h-[400px] space-y-2 overflow-y-auto">
                {(!sheetTabs || sheetTabs.length === 0) && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No tabs found in this spreadsheet.
                  </p>
                )}
                {sheetTabs?.map((tab) => {
                  const isSelected = selectedTabTitle === tab.title;
                  return (
                    <button
                      key={tab.title}
                      type="button"
                      onClick={() => setSelectedTabTitle(tab.title)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                        'hover:border-[#20A665]/70',
                        isSelected
                          ? 'border-[#20A665] bg-[#20A665]/5'
                          : 'border-zinc-200',
                      )}
                    >
                      <Image
                        src="/images/google-sheet-icon.svg"
                        width={32}
                        height={32}
                        alt="Sheet tab"
                      />
                      <span className="truncate text-sm font-medium text-black">
                        {tab.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-end">
                <LoadingButton
                  type="button"
                  loading={isFetchingPreview}
                  className="w-[170px] bg-background-secondary"
                  disabled={!selectedTabTitle || isFetchingPreview}
                  onClick={handleTabsContinue}
                >
                  Continue
                </LoadingButton>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
