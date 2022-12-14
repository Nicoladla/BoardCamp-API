import dayjs from "dayjs";

export default function CurrentDate() {
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const day = dayjs().date();

  const date = `${year}-${month}-${day}`;

  return date;
}
