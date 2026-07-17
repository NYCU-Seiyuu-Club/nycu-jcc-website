import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  GlobeIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { BilibiliIcon, XIcon } from './icons/SocialIcons';
import {
  attachTermId,
  DEFAULT_ACCENT_COLOR,
  type MemberTerm,
  type MemberWithTerm,
} from '../data/members';

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

type MembersBrowserProps = {
  terms: MemberTerm[];
  initialTermId?: string;
  initialSlug?: string;
};

function flattenMembers(terms: MemberTerm[]): MemberWithTerm[] {
  return terms.flatMap(attachTermId);
}

function resolveInitialTermId(terms: MemberTerm[], initialTermId?: string): string {
  if (initialTermId && terms.some((term) => term.id === initialTermId)) {
    return initialTermId;
  }
  return terms[0]?.id ?? ALL_TERM_ID;
}

function membersForTerm(terms: MemberTerm[], termId: string): MemberWithTerm[] {
  if (termId === ALL_TERM_ID) return flattenMembers(terms);
  const term = terms.find((t) => t.id === termId);
  return term ? attachTermId(term) : [];
}

export default function MembersBrowser({ terms, initialTermId, initialSlug }: MembersBrowserProps) {
  const [selectedTermId, setSelectedTermId] = useState<string>(() =>
    resolveInitialTermId(terms, initialTermId),
  );

  const activeMembers = useMemo<MemberWithTerm[]>(
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

  useEffect(() => {
    if (!currentMember) return;
    window.history.replaceState(null, '', `/members/${currentMember.termId}/${currentMember.slug}`);
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
          className={`rounded-full px-5 py-2 text-lg font-medium transition-colors ${
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
            className={`rounded-full px-5 py-2 text-lg font-medium transition-colors ${
              selectedTermId === term.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {term.label}
          </button>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-center gap-8">
        <button
          type="button"
          aria-label="上一位"
          onClick={() => handleStep(-1)}
          disabled={activeMembers.length < 2}
          className="rounded-full border-2 border-gray-300 p-3 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronLeft size={36} />
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
                  className={`relative overflow-hidden rounded-[1.5rem] border-4 border-gray-300 ${
                    !currentMember.oshi ? 'mx-auto w-[calc(5/7*100%)]' : 'w-full'
                  }`}
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: currentMember.accentColor ?? DEFAULT_ACCENT_COLOR }}
                  />
                  <div className="flex items-center justify-between px-8 pt-6 font-mono text-sm uppercase tracking-widest text-gray-400">
                    <span>Club Member Pass</span>
                    <span>
                      No. {currentMember.termId}-{currentMember.slug}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6 p-8 sm:min-h-[28rem] sm:flex-row">
                    <div className="relative w-96 shrink-0 justify-self-center self-center">
                      <img
                        src={currentMember.photo}
                        alt={currentMember.name}
                        className="aspect-square h-96 w-96 rounded-2xl border-4 border-gray-300 bg-gray-50 object-cover"
                      />
                      <div className="pointer-events-none absolute inset-x-1 bottom-1 flex items-end justify-center rounded-b-xl bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-10">
                        <p className="select-none text-center text-2xl font-black leading-tight text-white sm:text-3xl">
                          {currentMember.titles.join('・')}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex-1 pl-5 pr-3 py-5 pt-8">
                      <h2 className="relative text-3xl font-semibold text-gray-700">
                        {currentMember.name}
                      </h2>
                      <p className="mt-3 text-xl leading-relaxed text-gray-600">
                        {currentMember.description}
                      </p>

                      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-base">
                        {[
                          { label: '老家', value: currentMember.hometown },
                          { label: '誕生日', value: currentMember.birthday },
                          { label: '血型', value: currentMember.bloodType },
                          { label: '身高', value: currentMember.height },
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
{/*
                      {currentMember.certifications && (
                        <div className="mt-4">
                          <p className="text-base text-gray-400">證照</p>
                          <p className="mt-1 text-base leading-relaxed text-gray-700">
                            {currentMember.certifications}
                          </p>
                        </div>
                      )}*/}

                      {currentMember.sns && currentMember.sns.length > 0 && (
                        <div className="mt-6 gap-y-2">
                          <div className="mb-2 font-mono text-base uppercase tracking-widest text-gray-400">
                            聯繫
                          </div>
                          <div className="flex max-w-xs flex-wrap gap-2 sm:max-w-100">
                            {currentMember.sns.map((link) => {
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
                        </div>
                      )}

                      <div
                        className="pointer-events-none absolute bottom-3 right-3 flex items-end gap-0.5 opacity-90"
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

                    {currentMember.oshi && (
                      <div className="relative flex w-[22rem] shrink-0 flex-col items-center justify-start gap-3 border-t-2 border-gray-300 pt-6 text-center sm:border-l-2 sm:border-t-0 sm:pl-6 sm:pt-0">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -left-2.5 top-16 hidden h-0 w-0 border-y-[10px] border-l-[10px] border-y-transparent border-l-white sm:block"
                        />
                        <p className="my-5 text-2xl font-semibold uppercase tracking-wide text-gray-800">
                          主推成員
                        </p>
                        <img
                          src={currentMember.oshi.photo}
                          alt={currentMember.oshi.name}
                          className="aspect-square h-72 w-72 rounded-2xl border-4 border-gray-300 bg-white object-cover"
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
          className="rounded-full border-2 border-gray-300 p-3 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronRight size={36} />
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
