import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  GlobeIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { BilibiliIcon, XIcon } from '../icons/SocialIcons';
import {
  attachHonorTermId,
  DEFAULT_ACCENT_COLOR,
  type HonorMemberTerm,
  type HonorMemberWithTerm,
  type SnsLink,
} from '../../data/honor_members';

const ALL_TERM_ID = 'all';

const SNS_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  instagram: InstagramLogoIcon,
  ig: InstagramLogoIcon,
  x: XIcon,
  twitter: XIcon,
  discord: DiscordLogoIcon,
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
  bilibili: BilibiliIcon,
};

function getSnsIcon(label: string) {
  return SNS_ICONS[label.trim().toLowerCase()] ?? GlobeIcon;
}

function getRealSnsLinks(sns?: SnsLink[]) {
  return (sns ?? []).filter((link) => link.label.trim().toLowerCase() !== 'none');
}

type HonorMembersBrowserProps = {
  terms: HonorMemberTerm[];
  initialTermId?: string;
  initialSlug?: string;
};

function resolveInitialTermId(terms: HonorMemberTerm[], initialTermId?: string): string {
  if (initialTermId && terms.some((term) => term.id === initialTermId)) {
    return initialTermId;
  }
  return terms[0]?.id ?? ALL_TERM_ID;
}

function flattenMembers(terms: HonorMemberTerm[]): HonorMemberWithTerm[] {
  return terms.flatMap(attachHonorTermId);
}

function membersForTerm(terms: HonorMemberTerm[], termId: string): HonorMemberWithTerm[] {
  if (termId === ALL_TERM_ID) return flattenMembers(terms);
  const term = terms.find((t) => t.id === termId);
  return term ? attachHonorTermId(term) : [];
}

export default function HonorMembersBrowser({
  terms,
  initialTermId,
  initialSlug,
}: HonorMembersBrowserProps) {
  const [selectedTermId, setSelectedTermId] = useState<string>(() =>
    resolveInitialTermId(terms, initialTermId),
  );

  const activeMembers = useMemo<HonorMemberWithTerm[]>(
    () => membersForTerm(terms, selectedTermId),
    [terms, selectedTermId],
  );

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (!initialSlug) return 0;
    const startingMembers = membersForTerm(terms, resolveInitialTermId(terms, initialTermId));
    const index = startingMembers.findIndex((member) => member.slug === initialSlug);
    return index === -1 ? 0 : index;
  });

  const currentMember = activeMembers[currentIndex];
  const realSnsLinks = useMemo(() => getRealSnsLinks(currentMember?.sns), [currentMember]);

  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const descMeasureRef = useRef<HTMLParagraphElement>(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isDescClamped, setIsDescClamped] = useState(false);
  const [truncatedDescription, setTruncatedDescription] = useState('');

  useEffect(() => {
    if (!currentMember) return;
    window.history.replaceState(
      null,
      '',
      `/special-thanks/${currentMember.termId}/${currentMember.slug}`,
    );
  }, [currentMember]);

  useEffect(() => {
    setIsDescExpanded(false);
  }, [currentMember]);

  useLayoutEffect(() => {
    const realEl = descriptionRef.current;
    const measureEl = descMeasureRef.current;
    if (!realEl || !measureEl || !currentMember) return;

    const fullText = currentMember.description;

    const recalculate = () => {
      // Copy the real paragraph's exact rendered pixel width onto the hidden
      // clone, so there's no ambiguity from padding/containing-block math —
      // the clone is a normal, fully laid-out element, just moved off-screen.
      measureEl.style.width = `${realEl.clientWidth}px`;

      // Measure two *actual* stacked lines via a forced <br>, instead of
      // measuring one line and doubling it — doubling assumes the browser's
      // sub-pixel line-stacking rounding is perfectly linear, which it isn't
      // at every zoom level, and that's what caused the boundary to shift.
      measureEl.textContent = '';
      measureEl.append(document.createTextNode('測'));
      measureEl.appendChild(document.createElement('br'));
      measureEl.append(document.createTextNode('測'));
      const maxHeight = measureEl.scrollHeight;

      const renderCandidate = (text: string, withButton: boolean) => {
        measureEl.textContent = '';
        measureEl.append(document.createTextNode(withButton ? `${text}...` : text));
        if (withButton) {
          const btn = document.createElement('button');
          btn.className = 'inline border-0 bg-transparent p-0 m-0 align-baseline font-medium';
          btn.style.font = 'inherit';
          btn.style.lineHeight = 'inherit';
          btn.textContent = '展開';
          measureEl.appendChild(btn);
        }
        return measureEl.scrollHeight <= maxHeight;
      };

      if (renderCandidate(fullText, false)) {
        setIsDescClamped(false);
        setTruncatedDescription(fullText);
        return;
      }

      setIsDescClamped(true);
      let lo = 0;
      let hi = fullText.length;
      let best = 0;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (renderCandidate(fullText.slice(0, mid), true)) {
          best = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      setTruncatedDescription(fullText.slice(0, best));
    };

    recalculate();
    window.addEventListener('resize', recalculate);
    return () => window.removeEventListener('resize', recalculate);
  }, [currentMember]);

  const handleSelectTerm = (termId: string) => {
    setSelectedTermId(termId);
    setCurrentIndex(0);
  };

  const handleStep = (delta: number) => {
    setCurrentIndex((index) => {
      const length = activeMembers.length;
      if (length === 0) return 0;
      return (index + delta + length) % length;
    });
  };

  return (
    <div style={{ zoom: 0.85 }}>
      <div className="flex flex-wrap justify-center gap-2 mb-9">
        <button
          type="button"
          onClick={() => handleSelectTerm(ALL_TERM_ID)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-5 sm:py-2 sm:text-lg ${
            selectedTermId === ALL_TERM_ID
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {terms.map((term) => (
          <button
            key={term.id}
            type="button"
            onClick={() => handleSelectTerm(term.id)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-5 sm:py-2 sm:text-lg ${
              selectedTermId === term.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {term.label}
          </button>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-center gap-2 sm:gap-8">
        <button
          type="button"
          aria-label="上一位"
          onClick={() => handleStep(-1)}
          disabled={activeMembers.length < 2}
          className="rounded-full border-2 border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30 sm:p-3"
        >
          <ChevronLeft className="h-6 w-6 sm:h-9 sm:w-9" />
        </button>

        <div className="min-h-[24rem] w-full max-w-[96em]">
          <AnimatePresence mode="wait">
            {currentMember ? (
              <motion.div
                key={`${currentMember.termId}-${currentMember.slug}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div
                  className={`relative mx-auto w-full overflow-hidden rounded-[1.5rem] border-4 border-gray-300 ${
                    !currentMember.oshi ? 'sm:w-[calc(5/7*100%)]' : ''
                  }`}
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: currentMember.accentColor ?? DEFAULT_ACCENT_COLOR }}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 px-4 pt-4 font-mono text-xs uppercase tracking-widest text-gray-400 sm:px-8 sm:pt-6 sm:text-sm">
                    <span>Club Member Pass</span>
                    <span>
                      No. {currentMember.termId.toUpperCase()}-{currentMember.slug.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6 p-4 sm:min-h-[28rem] sm:flex-row sm:p-8">
                    <div className="relative mx-auto w-64 shrink-0 self-center sm:mx-0 sm:w-96">
                      <img
                        src={currentMember.photo}
                        alt={currentMember.name}
                        className="aspect-square w-64 rounded-2xl border-4 border-gray-300 bg-gray-50 object-cover sm:h-96 sm:w-96"
                      />
                      <div className="pointer-events-none absolute inset-x-1 bottom-1 flex items-end justify-center rounded-b-xl bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3 pt-6 sm:p-4 sm:pt-10">
                        <p className="select-none text-center text-lg font-black leading-tight text-white sm:text-2xl md:text-3xl">
                          {currentMember.titles.join('・')}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex-1 pt-4 text-center sm:pl-5 sm:pr-3 sm:py-5 sm:pt-8 sm:text-left">
                      <h2 className="relative text-2xl font-semibold text-gray-700 sm:text-3xl">
                        {currentMember.name}
                      </h2>

                      <p
                        aria-hidden="true"
                        ref={descMeasureRef}
                        className="invisible absolute left-0 top-0 text-lg leading-relaxed sm:text-xl"
                      />
                      <p
                        ref={descriptionRef}
                        className="mt-3 px-5 text-lg leading-relaxed text-gray-600 sm:px-0 sm:text-xl"
                      >
                        {isDescExpanded ? currentMember.description : truncatedDescription}
                        {isDescClamped && !isDescExpanded && '...'}
                        {isDescClamped && (
                          <button
                            type="button"
                            onClick={() => setIsDescExpanded((expanded) => !expanded)}
                            style={{ font: 'inherit', lineHeight: 'inherit' }}
                            className="inline border-0 bg-transparent p-0 m-0 align-baseline font-medium text-orange-600 hover:underline"
                          >
                            {isDescExpanded ? '收合' : '展開'}
                          </button>
                        )}
                      </p>

                      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:gap-x-6 sm:text-base">
                        {[
                          { label: '老家', value: currentMember.hometown },
                          { label: '誕生日', value: currentMember.birthday },
                          { label: '血型', value: currentMember.bloodType },
                          { label: '身高/體重', value: currentMember.height },
                          { label: '興趣', value: currentMember.hobbies },
                          { label: '特技', value: currentMember.specialSkill },
                        ]
                          .filter((fact) => fact.value)
                          .map((fact) => (
                            <div key={fact.label}>
                              <dt className="font-mono text-base uppercase tracking-widest text-gray-400">
                                {fact.label}
                              </dt>
                              <dd className="text-lg font-semibold text-gray-800">{fact.value}</dd>
                            </div>
                          ))}
                      </dl>

                      <div className="mt-6 flex flex-wrap items-end gap-4">
                        <div>
                          <div className="mb-2 font-mono text-base uppercase tracking-widest text-gray-400">
                            聯繫
                          </div>
                          <div className="flex min-h-16 items-start">
                            {realSnsLinks.length > 0 ? (
                              <div className="mx-auto flex max-w-xs flex-wrap justify-center gap-2 sm:mx-0 sm:max-w-100 sm:justify-start">
                                {realSnsLinks.map((link) => {
                                  const Icon = getSnsIcon(link.label);
                                  const isLink = /^https?:\/\//.test(link.url);
                                  const pillClass =
                                    'inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600';

                                  if (isLink) {
                                    return (
                                      <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.label}
                                        title={link.label}
                                        className={`${pillClass} transition-colors hover:bg-gray-200`}
                                      >
                                        <Icon className="h-4 w-4" />
                                        {link.label}
                                      </a>
                                    );
                                  }

                                  return (
                                    <span
                                      key={link.label}
                                      title={link.url ? `${link.label}: ${link.url}` : link.label}
                                      className={pillClass}
                                    >
                                      <Icon className="h-4 w-4" />
                                      {link.url ? `${link.label}｜${link.url}` : link.label}
                                    </span>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-base text-red-500">
                                此人沒有留下任何聯絡方式 (∠・ω&lt;)⌒★
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className="ml-auto hidden items-end gap-0.5 opacity-90 sm:flex"
                          aria-hidden="true"
                        >
                          {Array.from({ length: 38 }).map((_, i) => (
                            <span
                              key={i}
                              className="bg-gray-900"
                              style={{
                                width: i % 3 === 0 ? 4 : 2,
                                height: i % 5 === 0 ? 48 : i % 2 === 0 ? 34 : 22,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {currentMember.oshi && (
                      <div className="flex w-full shrink-0 flex-col items-center justify-center gap-3 border-t-2 border-gray-300 pt-6 text-center sm:w-[22rem] sm:border-l-2 sm:border-t-0 sm:pl-6 sm:pt-0">
                        <p className="my-2 text-xl font-semibold uppercase tracking-wide text-gray-800 sm:my-5 sm:text-2xl">
                          主推成員
                        </p>
                        <img
                          src={currentMember.oshi.photo}
                          alt={currentMember.oshi.name}
                          className="aspect-square h-56 w-56 rounded-2xl border-4 border-gray-300 bg-white object-cover sm:h-72 sm:w-72"
                        />
                        <div className="w-full">
                          <p className="mt-3 text-xl font-semibold text-gray-800">
                            {currentMember.oshi.name}
                          </p>
                          <p className="min-h-[1rem] text-sm text-gray-600">
                            {currentMember.oshi.subtitle}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <p className="text-center text-gray-500">目前沒有幹部資料。</p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="下一位"
          onClick={() => handleStep(1)}
          disabled={activeMembers.length < 2}
          className="rounded-full border-2 border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30 sm:p-3"
        >
          <ChevronRight className="h-6 w-6 sm:h-9 sm:w-9" />
        </button>
      </div>

      {activeMembers.length > 0 && (
        <p className="mt-4 text-center text-sm text-gray-400">
          {currentIndex + 1} / {activeMembers.length}
        </p>
      )}
    </div>
  );
}
