import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/id'

dayjs.locale('id')
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export function formatDate(date: Date | string, format?: string) {
  return dayjs(date).format(format ?? "D MMM YYYY");
}

export function formatDateHumanize(date: Date | string) {
  return dayjs(date).fromNow();
}
