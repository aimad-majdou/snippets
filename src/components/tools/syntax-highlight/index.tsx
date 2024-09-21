import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { BundledLanguage, BundledTheme, codeToHtml } from "shiki";
import CopyToClipboard from "./copy-to-clipboard";

interface SyntaxHighlightProps {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
  title?: string;
}

export default async function SyntaxHighlight({
  code,
  lang = "javascript",
  theme = "dracula",
  title,
}: SyntaxHighlightProps) {
  const html = await codeToHtml(code, {
    lang,
    theme,
    transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });

  return (
    <div className="tw-mt-4 tw-rounded-lg  p-4 !tw-pr-0 [&>pre]:tw-rounded-none">
      <div className="tw-overflow-hidden tw-rounded-lg">
        <div className="tw-flex tw-items-center tw-justify-between tw-bg-gradient-to-r tw-from-sky-200 tw-to-sky-400 tw-py-2 tw-pl-2 tw-pr-4 tw-text-sm">
          <span className="tw--mb-[calc(0.5rem+2px)] tw-rounded-t-lg tw-border-2 tw-border-white/5 tw-border-b-neutral-700 tw-bg-neutral-80tw-0 tw-px-4 tw-py-2 ">
            {title}
          </span>
          <CopyToClipboard code={code} />
        </div>
        <div
          className="tw-border-t-2 tw-border-neutral-700 tw-text-sm [&>pre]:tw-overflow-x-auto [&>pre]:!tw-bg-neutral-900 [&>pre]:tw-py-3 [&>pre]:tw-pl-4 [&>pre]:tw-pr-5 [&>tw-pre]:tw-leading-snug [&_code]:tw-block [&_code]:tw-w-fit [&_code]:tw-min-w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </div>
  );
}
