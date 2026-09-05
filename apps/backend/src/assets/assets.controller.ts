import { Controller, Get, NotFoundException, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import * as fs from 'node:fs';
import * as path from 'node:path';

const FALLBACK_DATA_DIRS = ['/bdo-data', 'C:/BDO_Data_Fixed', 'C:\\BDO_Data_Fixed'];

@Controller('assets')
export class AssetsController {
  constructor(private readonly configService: ConfigService) {}

  @Get('knowledge')
  sendKnowledgeIcon(
    @Query('path') relativePath: string,
    @Res() response: Response,
  ): void {
    this.sendAsset('knowledge_icons', relativePath, response);
  }

  @Get('items')
  sendItemIcon(
    @Query('path') relativePath: string,
    @Res() response: Response,
  ): void {
    this.sendAsset('icons', relativePath, response);
  }

  private sendAsset(
    folder: string,
    relativePath: string | undefined,
    response: Response,
  ): void {
    if (!relativePath || path.isAbsolute(relativePath)) {
      throw new NotFoundException('Recurso no encontrado');
    }
    const configured = this.configService.get<string>('BDO_DATA_DIR');
    const candidates = [configured, ...FALLBACK_DATA_DIRS].filter(
      (dir): dir is string => typeof dir === 'string' && dir.length > 0,
    );
    const root = candidates
      .map((dir) => path.resolve(dir, folder))
      .find((dir) => fs.existsSync(dir));
    if (!root) {
      throw new NotFoundException('Recurso no encontrado');
    }
    const filePath = path.resolve(root, relativePath);
    if (!filePath.startsWith(`${root}${path.sep}`)) {
      throw new NotFoundException('Recurso no encontrado');
    }
    response.sendFile(filePath, (error) => {
      if (error && !response.headersSent)
        response.status(404).json({ message: 'Recurso no encontrado' });
    });
  }
}
