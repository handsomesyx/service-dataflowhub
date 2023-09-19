import { Address4 } from 'ip-address';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';

import type { HeadersDataInterface } from './dto/headerData';

export const HeadersData = createParamDecorator(
  (data: unknown, context: ExecutionContext): HeadersDataInterface => {
    try {
      //处理IP地址，转换至IPV4
      function transferIPV4(ip: string) {
        // const ipv4Address = ip.replace('::ffff:', '');
        let ipv4Address;
        if (ip === '::1') {
          ipv4Address = '127.0.0.1';
        } else {
          ipv4Address = ip.replace('::ffff:', '');
        }
        const address = new Address4(ipv4Address);
        const ipv4 = address.address;
        return ipv4;
      }
      const ctx = context.switchToHttp();

      const request = ctx.getRequest();

      const user_agent = request.headers['user-agent'] || '';
      const ip = transferIPV4(request.ip) || '';
      const request_time = Date.now(); // 当前时间戳

      // Use info object to get request type and query
      const request_type = request.method;
      const request_query = request.url;
      const request_params = JSON.stringify(request.body) || '{}';

      return {
        request_query,
        request_type,
        request_params,
        request_time,
        user_agent,
        ip,
      };
    } catch (e) {
      throw new Error('Failed to extract headers data: ' + e);
    }
  }
);
