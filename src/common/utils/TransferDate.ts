import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

/**
 * @description 转换日期相关工具类
 * @export
 * @class TransferDate
 */
export class TransferDate {
  /**
   * @description 将UTC时间转化为东八区时间
   * @param s
   * @returns {Date} 东八区的日期
   * @example
   * TransferDate.parseISOLocal('2023-06-18T00:57:37.691Z');
   * 输出: 2023-06-18T08:57:37.691+08:00
   */
  public static parseISOLocal = (s?: string | number | Date): Date => {
    let date: Date;
    if (s) {
      date = new Date(s);
      if (date.getHours() >= 0) {
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
      }
      const str = new Date(date).getTime();
      const str1 = new Date(str);
      return str1;
    } else {
      date = new Date();
      if (date.getHours() >= 0) {
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
      }
      const str = new Date(date).getTime();
      const str1 = new Date(str);
      return str1;
    }
    // return str1;
  };
  /**
   * @description 将中国时间date转化为时间字符串
   * @param dateData
   * @returns {string} 时间字符串
   *  * @example
   * TransferDate.dataToTime('2023-06-18T00:57:37.691Z');
   * 输出: '2023-06-18 08:57:37'
   */

  public static dataToTime(dateData: string | number | Date): string {
    const date =
      typeof dateData === 'string' ? parseISO(dateData) : new Date(dateData);
    const timeZone = 'Asia/Shanghai';
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
  }
  /**
   * @description 将UTC时间转化为时间字符串
   * @param dateData
   * @returns {string} UTC时间字符串
   * @example
   * TransferDate.dataToUTCTime('2023-06-18T00:57:37.691Z');
   * 输出: '2023-06-18 00:57:37'
   */

  public static dataToUTCTime(dateData: string | number | Date): string {
    const date =
      typeof dateData === 'string' ? parseISO(dateData) : new Date(dateData);
    const timeZone = 'UTC';
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
  }

  /**
   * @description 将时间转化为日期
   * @param dateData
   * @returns {string} 时间转换后的日期字符串
   * @example
   * TransferDate.dateFormat(new Date('2023-06-18T00:57:37.691Z'));
   * 输出: '2023-06-18'
   */
  public static dateFormat(dateData: Date): string {
    const y = dateData.getFullYear();
    const m = dateData.getMonth() + 1;
    const d = dateData.getUTCDate();
    const time = y + '-' + m + '-' + d;
    return time;
  }

  // 减少八小时
  // public static parseISO = (s?: any) => {
  //   let date = undefined;
  //   if (s) {
  //     date = new Date(s);
  //   } else {
  //     date = new Date();
  //   }

  //   if (date.getHours() >= 0) {
  //     date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
  //   }
  //   const str = new Date(date).getTime();
  //   const str1 = new Date(str);
  //   return str1;
  // };
}
