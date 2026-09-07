"use client";
import {
  FileArchiveIcon,
  FileCodeIcon,
  FileTextIcon,
  PresentationIcon,
  TableIcon,
  XIcon,
} from "lucide-react";
import { Example } from "@/components/examples/example";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
export default function Preview() {
  return (
    <div className="example-stack">
      <AttachmentFiles />
    </div>
  );
}
function AttachmentFiles() {
  return (
    <Example title="Files" className="gap-8">
      <div className="flex w-full flex-col gap-2">
        <div className="px-1 text-xs font-medium text-muted-foreground">
          Horizontal
        </div>
        <div className="flex flex-col gap-3">
          <Attachment className="w-full">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove sales-dashboard.pdf">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment className="w-full">
            <AttachmentMedia>
              <TableIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>customer-import.csv</AttachmentTitle>
              <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove customer-import.csv">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment className="w-full">
            <AttachmentMedia>
              <FileCodeIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
              <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove message-renderer.tsx">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="px-1 text-xs font-medium text-muted-foreground">
          Vertical
        </div>
        <AttachmentGroup className="w-full">
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
              <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove sales-dashboard.pdf">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <TableIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>customer-import.csv</AttachmentTitle>
              <AttachmentDescription>CSV · 18 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove customer-import.csv">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <FileCodeIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
              <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove message-renderer.tsx">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <FileArchiveIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>source-assets.zip</AttachmentTitle>
              <AttachmentDescription>ZIP · 4.2 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove source-assets.zip">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment orientation="vertical">
            <AttachmentMedia>
              <PresentationIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>quarterly-review.key</AttachmentTitle>
              <AttachmentDescription>Keynote · 9 MB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Remove quarterly-review.key">
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
        </AttachmentGroup>
      </div>
    </Example>
  );
}
