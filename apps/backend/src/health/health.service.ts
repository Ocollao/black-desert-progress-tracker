import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async checkDatabase(): Promise<{ status: string; latency?: number }> {
    const start = Date.now();
    try {
      await this.dataSource.query('SELECT 1');
      return { status: 'up', latency: Date.now() - start };
    } catch {
      return { status: 'down', latency: Date.now() - start };
    }
  }

  async getHealth(): Promise<{
    status: string;
    timestamp: string;
    uptime: number;
    database: { status: string; latency?: number };
  }> {
    const database = await this.checkDatabase();
    const isHealthy = database.status === 'up';

    return {
      status: isHealthy ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database,
    };
  }
}
