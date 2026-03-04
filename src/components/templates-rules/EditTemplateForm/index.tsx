'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { FollowUpRuleModal } from './FollowUpRuleModal';

/** Renders text with content inside {} (including the braces) in bold */
function formatWithBoldPlaceholders(text: string) {
  const parts = text.split(/(\{[^}]*\})/g);
  return parts.map((part, i) =>
    part.startsWith('{') && part.endsWith('}') ? (
      <span key={i} className="font-bold">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const HARDCODED_SUBJECT = 'Follow-up on Purchase Order {PO Number}';

const AVAILABLE_VARIABLES = [
  '{PO Number}',
  '{Order Date}',
  '{Vendor}',
  '{Email Address}',
  '{Unit Cost}',
  '{PO Value}',
  '{Quantity}',
  '{Due Date}',
  '{Status}',
  '{PO Line Item}',
  '{Company Signature}',
];

const HARDCODED_BODY = `Dear {Vendor},

I hope this message finds you well. I am reaching out to follow up on our Purchase Order # {PO Number}, which was placed on {Order Date}. As we approach the due date of {Due Date}, I wanted to check in on the status of the order.

Could you kindly provide us with an update on the current progress of the order, including the expected timeline for delivery? If there have been any delays or issues that might affect the delivery schedule, please inform us as soon as possible so we can adjust our planning accordingly.

Additionally, we would appreciate any details regarding the PO Line Items, Unit Cost {Unit Cost} and PO Value {PO Value} if there are any discrepancies.

Thank you for your time and consideration. Should you have any questions or require further assistance, please don't hesitate to reach out. We look forward to the opportunity of working with you.
Best regards,
{Company Signature}`;

interface EditTemplateFormProps {
  templateId: string;
}

export const EditTemplateForm = ({ templateId }: EditTemplateFormProps) => {
  const router = useRouter();
  const [subject, setSubject] = useState(HARDCODED_SUBJECT);
  const [body, setBody] = useState(HARDCODED_BODY);
  const [editingSubject, setEditingSubject] = useState(false);
  const [editingBody, setEditingBody] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);

  const handleCancel = () => {
    router.push(`/templates/${templateId}`);
  };

  const handleSave = () => {
    // TODO: persist when API is ready
    router.push(`/templates/${templateId}`);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-semibold">Edit Template</h1>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className="bg-[#52a46d] hover:bg-[#438e5b]"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 max-w-[1200px] m-auto">
        {/* Left: Template content */}
        <div className="rounded-[8px] p-[16px] border border-[#E4E4E7] space-y-[20px]">
          <div>Template 2</div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Subject</Label>
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
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-text"
              >
                {formatWithBoldPlaceholders(subject)}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-foreground font-medium">Body</Label>
            {editingBody ? (
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onBlur={() => setEditingBody(false)}
                className="min-h-[280px] resize-y"
                placeholder="Body"
                autoFocus
              />
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => setEditingBody(true)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingBody(true)}
                className="block min-h-[280px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-text whitespace-pre-wrap"
              >
                {formatWithBoldPlaceholders(body)}
              </div>
            )}
          </div>
        </div>

        {/* Right: Available Variables, Email Signature, Follow-up Rule, Usage Stats */}
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
            <CardContent className="p-4 pt-0 space-y-1 text-sm text-muted-foreground">
              <p>Sends 3 days after PO creation</p>
              <p>Threshold 60%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Usage Stats</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-1 text-sm text-muted-foreground">
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
};
