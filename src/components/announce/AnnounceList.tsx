import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import type { Announcement } from '../../data/announcements';

type AnnounceListProps = {
  announcements: Announcement[];
};

type ViewMode = 'grid' | 'list';

export default function AnnounceList({ announcements }: AnnounceListProps) {
  const [view, setView] = useState<ViewMode>('grid');

  return (
    <div>
      <div className="flex flex-wrap items-end-safe justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announce</h1>
          <p className="mt-2 text-gray-500">最新公告與消息</p>
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

      {view === 'grid' ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((item) => (
            <a
              key={item.slug}
              href={`/announce/${item.slug}`}
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
                  {item.tag && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-500">
                      {item.tag}
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
          {announcements.map((item) => (
            <a
              key={item.slug}
              href={`/announce/${item.slug}`}
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
                  {item.tag && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-500">
                      {item.tag}
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

      {announcements.length === 0 && (
        <p className="mt-8 text-center text-gray-400">目前沒有公告。</p>
      )}
    </div>
  );
}
