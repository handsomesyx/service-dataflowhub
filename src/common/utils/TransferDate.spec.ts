import { TransferDate } from './TransferDate';
describe('TransferDate', () => {
    //将UTC时间转化为东八区时间
    describe('parseISOLocal', () => {
        test('should convert UTC time to local time', () => {
            const utcTime = '2023-06-18T00:57:37.691Z';
            const expected = new Date('2023-06-18T08:57:37.691+08:00');
            console.log("123", TransferDate.parseISOLocal(
                new Date()
            ));

            expect(TransferDate.parseISOLocal(utcTime)).toEqual(expected);
        });
        test('should return current local time if no argument is provided', () => {
            const expected = new Date();
            expect(TransferDate.parseISOLocal()).toEqual(expected);
        });
    });
    //将中国时间date转化为时间字符串
    describe('dataToTime', () => {
        test('把中国时间转换成时间字符串', () => {
            const chinaTime = '2023-06-18T00:57:37.691Z';
            const expected = '2023-06-18 08:57:37';
            expect(TransferDate.dataToTime(chinaTime)).toBe(expected);
        });
        test('should convert UTC time to time string', () => {
            const utcTime = '2023-06-18T00:57:37.691Z';
            const expected = '2023-06-18 00:57:37';
            expect(TransferDate.dataToTime(utcTime)).toBe(expected);
        });
    });
    describe('dataToUTCTime', () => {
        test('should convert China time to UTC time string', () => {
            const chinaTime = '2023-06-18T00:57:37.691Z';
            const expected = '2023-06-18 00:57:37';
            expect(TransferDate.dataToUTCTime(chinaTime)).toBe(expected);
        });
        test('should convert UTC time to UTC time string', () => {
            const utcTime = '2023-06-18T00:57:37.691Z';
            const expected = '2023-06-18 00:57:37';
            expect(TransferDate.dataToUTCTime(utcTime)).toBe(expected);
        });
    });
    describe('dateFormat', () => {
        test('should convert date to date string', () => {
            const date = new Date('2023-06-18T00:57:37.691Z');
            const expected = '2023-06-18';
            expect(TransferDate.dateFormat(date)).toBe(expected);
        });
    });
});