interface SourceCreditProps {
  sourceTitle?: string;
  sourceUrl?: string;
}

export default function SourceCredit({ sourceTitle, sourceUrl }: SourceCreditProps) {
  if (!sourceTitle && !sourceUrl) return null;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <p className="text-xs text-gray-500 flex items-center gap-1 flex-wrap">
        <span className="font-medium">Source:</span>
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4A843] hover:underline hover:text-[#1A1A2E] transition-colors"
          >
            {sourceTitle ?? sourceUrl}
          </a>
        ) : (
          <span>{sourceTitle}</span>
        )}
        {sourceUrl && (
          <svg className="w-3 h-3 text-gray-400 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </p>
    </div>
  );
}
