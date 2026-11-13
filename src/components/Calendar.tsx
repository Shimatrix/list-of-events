import { useCallback, useEffect, useRef, useState } from 'react';
import type { MonthConfig } from '../core/types';
import { buildMonthConfig } from '../core/dateUtils';
import { MonthGrid } from './MonthGrid';

interface CalendarProps {
  selectedDate: string;
  onSelectDate: (iso: string) => void;
}

const WINDOW_RADIUS = 12;
const SHIFT_SIZE = 12;
const ROOT_MARGIN = '600px 0px';

function shiftMonth(year: number, month: number, delta: number) {
  const total = year * 12 + month + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}

function monthKey(year: number, month: number) {
  return `${year}-${String(month).padStart(2, '0')}`;
}

function buildWindow(centerYear: number, centerMonth: number): MonthConfig[] {
  const list: MonthConfig[] = [];
  for (let i = -WINDOW_RADIUS; i <= WINDOW_RADIUS; i++) {
    const { year, month } = shiftMonth(centerYear, centerMonth, i);
    list.push(buildMonthConfig(year, month));
  }
  return list;
}

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  const [initialNow] = useState(() => new Date());
  const [center, setCenter] = useState(() => ({
    year: initialNow.getFullYear(),
    month: initialNow.getMonth(),
  }));

  const [months, setMonths] = useState<MonthConfig[]>(() =>
    buildWindow(center.year, center.month),
  );

  const isCurrentMonth = useCallback(
    (config: MonthConfig) =>
      config.year === initialNow.getFullYear() &&
      config.month === initialNow.getMonth(),
    [initialNow],
  );

  const shiftWindow = useCallback((delta: number) => {
    const nextCenter = shiftMonth(center.year, center.month, delta);
    setCenter(nextCenter);
    setMonths(buildWindow(nextCenter.year, nextCenter.month));
  }, [center]);

  const loadBack = useCallback(() => shiftWindow(-SHIFT_SIZE), [shiftWindow]);
  const loadForward = useCallback(() => shiftWindow(SHIFT_SIZE), [shiftWindow]);

  useEffect(() => {
    const container = containerRef.current;
    const top = topSentinelRef.current;
    const bottom = bottomSentinelRef.current;
    if (!container || !top || !bottom) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target === top) loadBack();
          else if (entry.target === bottom) loadForward();
        }
      },
      { root: container, rootMargin: ROOT_MARGIN },
    );

    observer.observe(top);
    observer.observe(bottom);
    return () => observer.disconnect();
  }, [loadBack, loadForward]);

  // Первоначальный скролл к текущему месяцу
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(
      `[data-month="${monthKey(initialNow.getFullYear(), initialNow.getMonth())}"]`,
    );
    if (!el) return;
    const timer = setTimeout(() => {
      container.scrollTop = el.offsetTop - container.offsetTop;
    }, 0);
    return () => clearTimeout(timer);
  }, [initialNow]);

  return (
    <section className="calendar" ref={containerRef}>
      <div
        ref={topSentinelRef}
        aria-hidden="true"
        className="calendar__sentinel"
      />
      {months.map((config) => (
        <div
          key={monthKey(config.year, config.month)}
          data-month={monthKey(config.year, config.month)}
          className={
            isCurrentMonth(config) ? 'calendar__month' : 'calendar__month inactive'
          }
        >
          <h2 className="calendar__title">{config.label}</h2>
          <MonthGrid
            config={config}
            selectedDate={selectedDate}
            onDayClick={onSelectDate}
          />
        </div>
      ))}
      <div
        ref={bottomSentinelRef}
        aria-hidden="true"
        className="calendar__sentinel"
      />
    </section>
  );
}