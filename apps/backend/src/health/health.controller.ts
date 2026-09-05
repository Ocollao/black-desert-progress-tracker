import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Comprobar la salud de la aplicación' })
  @ApiResponse({ status: 200, description: 'La aplicación está sana' })
  @ApiResponse({ status: 503, description: 'La aplicación no está sana' })
  async getHealth() {
    return this.healthService.getHealth();
  }

  @Get('ready')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Comprobar si la aplicación está lista para atender peticiones' })
  async getReadiness() {
    return this.healthService.getHealth();
  }

  @Get('live')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Comprobar si la aplicación sigue viva' })
  getLiveness() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
