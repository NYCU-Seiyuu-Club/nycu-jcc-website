import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import type { JournalEntry } from '../../data/journal';
import { aboutHighlights, getGroupAccentColor } from '../../data/about';

type JournalListProps = {
  entries: JournalEntry[];
};

type ViewMode = 'grid' | 'list';

const ALL_FILTER = 'all';
const PAGE_SIZE = 6;
const GROUPS = aboutHighlights.map((group) => ({ title: group.title, color: group.accentColor }));

export default function JournalList({ entries }: JournalListProps) {
  const [view, setView] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_FILTER);
  const [selectedGroup, setSelectedGroup] = useState<string>(ALL_FILTER);
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(entries.map((item) => item.category))),
    [entries],
  );

  const filtered = useMemo(
    () =>
      entries
        .filter(
          (item) =>
            (selectedCategory === ALL_FILTER || item.category === selectedCategory) &&
            (selectedGroup === ALL_FILTER || item.group === selectedGroup),
        )
        .sort((a, b) => b.date.localeCompare(a.date)),
    [entries, selectedCategory, selectedGroup],
  );

  useEffect(() => setPage(1), [selectedCategory, selectedGroup]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-wrap items-end-safe justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Journal</h2>
          <p className="mt-2 text-gray-500">活動花絮與心得紀錄</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="網格檢視"
            onClick={() => setView('grid')}
            className={`rounded-full p-2 transition-colors ${
              view === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="清單檢視"
            onClick={() => setView('list')}
            className={`rounded-full p-2 transition-colors ${
              view === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSelectedCategory(ALL_FILTER)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === ALL_FILTER ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === category ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={() => setSelectedGroup(ALL_FILTER)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedGroup === ALL_FILTER ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {GROUPS.map(({ title, color }) => (
          <button
            key={title}
            type="button"
            onClick={() => setSelectedGroup(title)}
            style={
              selectedGroup === title
                ? { backgroundColor: color, color: '#fff' }
                : { backgroundColor: `${color}1a`, color }
            }
            className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
          >
            {title}
          </button>
        ))}
      </div>

      {view === 'grid' ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((item) => (
            <a
              key={item.slug}
              href={`/journal/${item.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{item.date}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-500">
                    {item.category}
                  </span>
                  {item.group && (
                    <span
                      style={{ backgroundColor: `${getGroupAccentColor(item.group)}1a`, color: getGroupAccentColor(item.group) }}
                      className="rounded-full px-2 py-0.5 font-medium"
                    >
                      {item.group}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.summary}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
          {pageItems.map((item) => (
            <a
              key={item.slug}
              href={`/journal/${item.slug}`}
              className="flex gap-4 py-4 transition-colors hover:bg-gray-50"
            >
              <img
                src={item.coverImage}
                alt={item.title}
                className="h-20 w-28 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{item.date}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-500">
                    {item.category}
                  </span>
                  {item.group && (
                    <span
                      style={{ backgroundColor: `${getGroupAccentColor(item.group)}1a`, color: getGroupAccentColor(item.group) }}
                      className="rounded-full px-2 py-0.5 font-medium"
                    >
                      {item.group}
                    </span>
                  )}
                </div>
                <h3 className="mt-1 truncate font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-gray-600">{item.summary}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-400">此分類目前沒有活動日誌。</p>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="上一頁"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full border-2 border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-500">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="下一頁"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full border-2 border-gray-300 p-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
