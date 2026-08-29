import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'Black Desert Progress Tracker',
      version: '0.1.0',
      description: 'API for tracking Black Desert Online character progression',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
