import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'Black Desert Progress Tracker',
      version: '0.5.0',
      description: 'API para rastrear la progresión de personajes de Black Desert Online',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
