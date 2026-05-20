'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoadingButton } from '@/components/LoadingButton';
import { toast } from 'sonner';
import { FollowUpRuleModal } from './FollowUpRuleModal';
import { EditTemplateFormSkeleton } from './EditTemplateFormSkeleton';
import { routeUrls } from '@/constants/urls';
import { useEmailTemplate } from '@/tanstack/templates/useEmailTemplate';
import { useUpdateEmailTemplate } from '@/tanstack/templates/useUpdateEmailTemplate';
import { emailTemplateKeys } from '@/tanstack/templates/keys';
import {
  formatEmailTemplateTypeLabel,
  type EmailTemplate,
} from '@/types/emailTemplate';

const PLACEHOLDER_SPLIT_RE = /(\{\{[^}]+\}\}|\{[^}]+\})/g;

function isPlaceholderSegment(part: string): boolean {
  return /^\{\{[^}]+\}\}$/.test(part) || /^\{[^}]+\}$/.test(part);
}

/** Renders text with `{{var}}` or `{var}` segments in bold */
function formatWithBoldPlaceholders(text: string) {
  const parts = text.split(PLACEHOLDER_SPLIT_RE);
  return parts.map((part, i) =>
    isPlaceholderSegment(part) ? (
      <span key={i} className="font-bold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function isHtmlContent(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

const AVAILABLE_VARIABLES = [
  '{{PO Number}}',
  '{{Order Date}}',
  '{{Vendor}}',
  '{{Email Address}}',
  '{{Unit Cost}}',
  '{{PO Value}}',
  '{{Quantity}}',
  '{{Due Date}}',
  '{{Status}}',
  '{{PO Line Item}}',
  '{{Company Signature}}',
];

interface EditTemplateFormProps {
  templateId: string;
}

type EditTemplateFormFieldsProps = {
  templateId: string;
  template: EmailTemplate;
};

function EditTemplateFormFields({
  templateId,
  template,
}: EditTemplateFormFieldsProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: updateTemplate, isPending } = useUpdateEmailTemplate();

  const [name, setName] = useState(template.name);
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const [metaData] = useState(template.metaData);
  const [editingSubject, setEditingSubject] = useState(false);
  const [editingBody, setEditingBody] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);

  const templateTypeLabel = formatEmailTemplateTypeLabel(template.type);

  const handleCancel = () => {
    router.push(`${routeUrls.templateRulesRoute}/${templateId}`);
  };

  const handleSave = () => {
    const id = Number(templateId);
    if (!Number.isFinite(id)) {
      toast.error('Invalid template id');
      return;
    }

    updateTemplate(
      {
        id,
        name: name.trim(),
        subject: subject.trim(),
        body,
        metaData,
      },
      {
        onSuccess: () => {
          toast.success('Template saved successfully');
          queryClient.invalidateQueries({
            queryKey: emailTemplateKeys.all,
          });
          router.push(`${routeUrls.templateRulesRoute}/${templateId}`);
        },
        onError: () => {
          toast.error('Failed to save template. Please try again.');
        },
      },
    );
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-semibold">Edit Template</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            className="bg-[#52a46d] hover:bg-[#438e5b]"
            onClick={handleSave}
            loading={isPending}
          >
            Save Changes
          </LoadingButton>
        </div>
      </div>

      <div className="m-auto grid max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-[20px] rounded-[8px] border border-[#E4E4E7] p-[16px]">
          <div className="space-y-2">
            <Label className="font-medium text-foreground">Template name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
              placeholder="Template name"
            />
            <p className="text-sm text-muted-foreground">{templateTypeLabel}</p>
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-foreground">Subject</Label>
            {editingSubject ? (
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onBlur={() => setEditingSubject(false)}
                className="h-11"
                placeholder="Subject"
                autoFocus
              />
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setEditingSubject(true)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingSubject(true)}
                className="flex h-11 w-full cursor-text rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {formatWithBoldPlaceholders(subject)}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-medium text-foreground">Body</Label>
            {editingBody ? (
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onBlur={() => setEditingBody(false)}
                className="min-h-[280px] resize-y font-mono text-sm"
                placeholder="Body"
                autoFocus
              />
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setEditingBody(true)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingBody(true)}
                className="block min-h-[280px] w-full cursor-text rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {isHtmlContent(body) ? (
                  <div
                    className="prose prose-sm max-w-none font-normal [&_p]:mb-4 [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                ) : (
                  <span className="whitespace-pre-wrap">
                    {formatWithBoldPlaceholders(body)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Available Variables</CardTitle>
              <CardDescription className="text-sm">
                Following variables are available to use in this template. Write
                them in the email template where to need to use. The format
                should be exactly the same
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                {AVAILABLE_VARIABLES.map((variable, index) => (
                  <span key={variable}>
                    <span className="font-bold">{variable}</span>
                    {index < AVAILABLE_VARIABLES.length - 1 && ', '}
                  </span>
                ))}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Email Signature</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex gap-2">
                <Input
                  placeholder="example.png"
                  className="flex-1"
                  readOnly
                  disabled
                />
                <Button variant="outline" size="sm" type="button">
                  Choose file
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Follow-up Rule</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setFollowUpModalOpen(true)}
                  aria-label="Edit follow-up rule"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 p-4 pt-0 text-sm text-muted-foreground">
              <p>{metaData || '—'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Usage Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-4 pt-0 text-sm text-muted-foreground">
              <p>Used 42 times · 87% response rate</p>
              <p>Last edited by John Doe</p>
              <p>Edited 5 days ago</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <FollowUpRuleModal
        open={followUpModalOpen}
        onOpenChange={setFollowUpModalOpen}
      />
    </div>
  );
}

export const EditTemplateForm = ({ templateId }: EditTemplateFormProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useEmailTemplate(templateId);

  const handleCancel = () => {
    router.push(`${routeUrls.templateRulesRoute}/${templateId}`);
  };

  if (isLoading) {
    return <EditTemplateFormSkeleton />;
  }

  if (isError || !data?.template) {
    return (
      <div className="space-y-4">
        <h1 className="text-[24px] font-semibold">Edit Template</h1>
        <p className="text-sm text-destructive">
          Unable to load template. Please try again later.
        </p>
        <Button variant="secondary" onClick={handleCancel}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <EditTemplateFormFields
      key={`${templateId}-${data.template.updatedAt}`}
      templateId={templateId}
      template={data.template}
    />
  );
};
