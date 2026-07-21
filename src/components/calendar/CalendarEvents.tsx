import { useEffect, useMemo, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

interface GoogleCalendarEvent {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink: string;
  colorId?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
}

type LoadState = 'loading' | 'success' | 'error';

const CALENDAR_ID = import.meta.env.PUBLIC_GOOGLE_CALENDAR_ID;
const API_KEY = import.meta.env.PUBLIC_GOOGLE_CALENDAR_API_KEY;
const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];
/** 行事曆上用來標記「放假」「不社課」之類公告的事件，直接濾掉不顯示 */
const IGNORED_KEYWORDS = ['放假', '假日', '國定假日', '不社課'];

/** Google 日曆事件顏色（colorId）對應的實際色碼 */
const EVENT_COLORS: Record<string, string> = {
  '1': '#7986cb',
  '2': '#33b679',
  '3': '#8e24aa',
  '4': '#e67c73',
  '5': '#f6c026',
  '6': '#f5511d',
  '7': '#039be5',
  '8': '#616161',
  '9': '#3f51b5',
  '10': '#0b8043',
  '11': '#d60000',
};
const DEFAULT_EVENT_COLOR = '#f97316';

function getEventColor(event: GoogleCalendarEvent) {
  return (event.colorId && EVENT_COLORS[event.colorId]) || DEFAULT_EVENT_COLOR;
}

function isIgnoredEvent(event: GoogleCalendarEvent) {
  return IGNORED_KEYWORDS.some((keyword) => event.summary?.includes(keyword));
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 展開跨日活動，回傳它所涵蓋的每一天的日期 key（全天活動的 end 是不含當天，故要 -1 天） */
function getEventDayKeys(event: GoogleCalendarEvent): string[] {
  const isAllDay = !!event.start.date;
  const startRaw = event.start.date ?? event.start.dateTime!;
  const endRaw = event.end.date ?? event.end.dateTime!;

  const start = isAllDay ? new Date(`${startRaw}T00:00:00`) : new Date(startRaw);
  const end = isAllDay ? new Date(`${endRaw}T00:00:00`) : new Date(endRaw);
  if (isAllDay) end.setDate(end.getDate() - 1);

  const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const keys: string[] = [];
  let guard = 0;
  while (cursor.getTime() <= last.getTime() && guard < 366) {
    keys.push(toDateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
    guard++;
  }
  return keys.length > 0 ? keys : [toDateKey(start)];
}

function getCalendarGrid(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }
  return cells;
}

function formatDateBadge(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString('zh-TW', { month: 'short' }),
    day: d.getDate(),
    weekday: d.toLocaleDateString('zh-TW', { weekday: 'short' }),
  };
}

function formatTimeRange(event: GoogleCalendarEvent) {
  if (event.start.date) {
    if (event.end.date) {
      const startDay = new Date(`${event.start.date}T00:00:00`);
      const endDay = new Date(`${event.end.date}T00:00:00`);
      endDay.setDate(endDay.getDate() - 1);
      if (toDateKey(startDay) !== toDateKey(endDay)) {
        const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
        return `${fmt(startDay)} - ${fmt(endDay)}（全天）`;
      }
    }
    return '全天';
  }
  const opts: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const start = new Date(event.start.dateTime!);
  const end = new Date(event.end.dateTime!);
  return `${start.toLocaleTimeString('zh-TW', opts)} - ${end.toLocaleTimeString('zh-TW', opts)}`;
}

export default function CalendarEvents() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));
  const [state, setState] = useState<LoadState>('loading');
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);

  useEffect(() => {
    if (!API_KEY || !CALENDAR_ID) {
      setState('error');
      return;
    }

    setState('loading');

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const timeMin = new Date(year, month, 1);
    const timeMax = new Date(year, month + 1, 1);

    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
    );
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy', 'startTime');
    url.searchParams.set('maxResults', '100');
    url.searchParams.set('timeMin', timeMin.toISOString());
    url.searchParams.set('timeMax', timeMax.toISOString());

    fetch(url.toString())
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEvents((data.items ?? []).filter((event: GoogleCalendarEvent) => !isIgnoredEvent(event)));
        setState('success');
      })
      .catch(() => setState('error'));
  }, [currentMonth.getTime()]);

  const eventDayColors = useMemo(() => {
    const map = new Map<string, string>();
    for (const event of events) {
      const color = getEventColor(event);
      for (const key of getEventDayKeys(event)) {
        if (!map.has(key)) map.set(key, color);
      }
    }
    return map;
  }, [events]);
  const grid = useMemo(() => getCalendarGrid(currentMonth), [currentMonth]);
  const todayKey = toDateKey(now);
  const monthLabel = `${currentMonth.getFullYear()} 年 ${currentMonth.getMonth() + 1} 月`;

  const goPrevMonth = () => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNextMonth = () => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToday = () => setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{monthLabel}</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToday}
              className="rounded-full px-3 py-1 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-50"
            >
              今天
            </button>
            <button
              type="button"
              aria-label="上個月"
              onClick={goPrevMonth}
              className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="下個月"
              onClick={goNextMonth}
              className="rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-orange-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-y-2 text-center">
          {WEEKDAY_LABELS.map((label) => (
            <span key={label} className="text-xs font-semibold text-gray-400">
              {label}
            </span>
          ))}

          {grid.map(({ date, inMonth }) => {
            const key = toDateKey(date);
            const dotColor = eventDayColors.get(key);
            const isToday = key === todayKey;
            return (
              <div key={key} className="flex flex-col items-center gap-1 py-1.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                    isToday
                      ? 'bg-orange-500 font-bold text-white'
                      : inMonth
                        ? 'text-gray-700'
                        : 'text-gray-300'
                  }`}
                >
                  {date.getDate()}
                </span>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: dotColor ?? 'transparent' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        {state === 'loading' && (
          <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
            <p>行事曆載入中...</p>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-gray-400">
            <Calendar className="h-10 w-10 text-gray-300" />
            <p>本月行事曆暫無任何預定。</p>
          </div>
        )}

        {state === 'success' && events.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-gray-400">
            <Calendar className="h-10 w-10 text-gray-300" />
            <p>{monthLabel}目前沒有排定的活動。</p>
          </div>
        )}

        {state === 'success' && events.length > 0 && (
          <div className="space-y-4">
            {events.map((event) => {
              const dateStr = event.start.dateTime ?? event.start.date!;
              const badge = formatDateBadge(dateStr);
              const color = getEventColor(event);
              return (
                <a
                  key={event.id}
                  href={event.htmlLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-5 overflow-hidden rounded-2xl border border-gray-200 p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div
                    className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl py-2"
                    style={{ backgroundColor: `${color}1a`, color }}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide">{badge.month}</span>
                    <span className="text-2xl font-bold leading-tight">{badge.day}</span>
                    <span className="text-xs opacity-80">{badge.weekday}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
                      {event.summary || '（無標題活動）'}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTimeRange(event)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-gray-600">{event.description}</p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
