import {
  type Day,
  addDays,
  differenceInHours,
  eachDayOfInterval,
  parse,
  parseISO,
  set,
  setMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { format, formatInTimeZone, fromZonedTime } from 'date-fns-tz';

type ISOFormatOptions =
  | 'h:mm:ss a'
  | 'M/d/yyyy'
  | 'M/d/yyyy h:mm:ss a'
  | 'M/d/yyyy h:mm a'
  | 'h:mm a'
  | 'yyy-MM-dd'
  | 'yyyy-MM-dd'
  | 'eee, MMM d yyyy'
  | "yyyy-MM-dd'T'HH:mm:ssXXX";

export const CURRENT_TIME_ZONE =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export function formatISOString({
  date,
  timezone,
  formatOption = 'h:mm a',
}: {
  date: string;
  timezone?: string;
  formatOption?: ISOFormatOptions;
}) {
  const zone = timezone || CURRENT_TIME_ZONE;

  return formatInTimeZone(date, zone, formatOption);
}

export function formatDateToTimezone({
  date,
  timezone,
  formatOption = "yyyy-MM-dd'T'HH:mm:ssXXX",
}: {
  date: Date;
  timezone?: string;
  formatOption?: ISOFormatOptions;
}) {
  const zone = timezone || CURRENT_TIME_ZONE;

  return formatInTimeZone(date, zone, formatOption);
}

export function formatDateToString({
  date,
  timezone,
  formatOption = 'yyy-MM-dd',
}: {
  date: Date;
  timezone?: string;
  formatOption?: ISOFormatOptions;
}) {
  const zone = timezone || CURRENT_TIME_ZONE;

  return format(date, formatOption, {
    timeZone: zone,
  });
}

export function formatDateToUTC(date: Date, timezone?: string) {
  const zone = timezone || CURRENT_TIME_ZONE;

  return fromZonedTime(date, zone).toISOString();
}

export function getWeekdayStartInZone({
  date,
  weekday,
  timezone,
}: {
  date: Date;
  weekday: Day;
  timezone: string;
}) {
  try {
    if (weekday < 0 || weekday > 6) {
      throw new Error('Weekday must be between 0 and 6');
    }

    const zone = timezone || CURRENT_TIME_ZONE;

    const targetDate = startOfWeek(date, {
      weekStartsOn: weekday,
    });

    return formatInTimeZone(targetDate, zone, "yyyy-MM-dd'T'HH:mm:ssXXX");
  } catch (error) {
    console.error('Error getting weekday start:', error);
    throw error;
  }
}

export function formatDateDifferenceInHours(
  firstDateISOString: string,
  secondDateISOString: string,
) {
  return differenceInHours(
    parseISO(secondDateISOString),
    parseISO(firstDateISOString),
  );
}

export const normalizeDate = (
  date: Date | string | undefined,
): Date | undefined => {
  if (typeof date === 'undefined' || typeof date === 'object') {
    return date;
  }
  return parseISO(date);
};

export function generateWeekDays({ shortWeekDay }: { shortWeekDay: boolean }) {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, index) => {
    const day = addDays(start, index);
    return {
      label: format(day, shortWeekDay ? 'EEEEE' : 'EEE'),
      value: index,
    };
  });
}

export function generateMonths() {
  const start = startOfYear(new Date());
  return Array.from({ length: 12 }, (_, index) => {
    const month = setMonth(start, index);
    return format(month, 'MMMM');
  });
}

export function getLastMonthOfYear(year: number) {
  const date = new Date(year, 0);
  const lastMonthDate = setMonth(date, 11);
  return lastMonthDate.getMonth();
}

export function getUniqueDatesInRange(startDate: Date, endDate: Date) {
  const uniqueDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return [...new Set(uniqueDays.map((day) => format(day, 'EEE')))];
}

export function generateStartDate(startDate: Date, startTime: string) {
  const parsedTime = parse(startTime, 'hh:mm a', new Date());

  return set(startDate, {
    hours: parsedTime.getHours(),
    minutes: parsedTime.getMinutes(),
    seconds: 0,
    milliseconds: 0,
  });
}

export function generateEndDate({
  startTime,
  startDate,
  endTime,
}: {
  startTime: string;
  startDate: Date;
  endTime: string;
}) {
  let endDate = parse(endTime, 'hh:mm a', startDate);

  if (startTime.endsWith('PM') && endTime.endsWith('AM')) {
    endDate = addDays(endDate, 1);
  }

  return endDate;
}
