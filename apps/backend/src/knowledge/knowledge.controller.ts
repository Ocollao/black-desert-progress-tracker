import { Body, Controller, Delete, Get, Param, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { KnowledgeQueryDto } from './dto/knowledge-query.dto';
import { KnowledgeService } from './knowledge.service';
import { UpdateKnowledgeProgressDto } from './dto/update-knowledge-progress.dto';
import { User } from '../user/user.entity';

@ApiTags('knowledge')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar registros de conocimiento' })
  findAll(@Query() query: KnowledgeQueryDto, @Request() request: { user: User }) {
    return this.knowledgeService.findAll(query, request.user.id);
  }

  @Get('themes/tree')
  @ApiOperation({ summary: 'Listar temas de conocimiento como árbol con conteos' })
  getThemesTree(@Request() request: { user: User }) {
    return this.knowledgeService.getThemesTree(request.user.id);
  }

  @Get('themes')
  @ApiOperation({ summary: 'Listar temas de conocimiento' })
  findThemes() {
    return this.knowledgeService.findThemes();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Listar últimos conocimientos obtenidos' })
  getRecent(@Request() request: { user: User }, @Query('limit') limit?: string) {
    const parsed = limit ? parseInt(limit, 10) : 5;
    return this.knowledgeService.getRecent(request.user.id, Number.isFinite(parsed) ? parsed : 5);
  }

  @Get('energy')
  @ApiOperation({ summary: 'Obtener resumen de energía por rama' })
  getEnergy(@Request() request: { user: User }) {
    return this.knowledgeService.getEnergySummary(request.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de conocimiento' })
  findOne(@Param('id') id: string) {
    return this.knowledgeService.findById(id);
  }

  @Get(':id/progress')
  getProgress(@Param('id') id: string, @Request() request: { user: User }) {
    return this.knowledgeService.getProgress(id, request.user.id);
  }

  @Put(':id/progress')
  updateProgress(@Param('id') id: string, @Body() dto: UpdateKnowledgeProgressDto, @Request() request: { user: User }) {
    return this.knowledgeService.updateProgress(id, request.user.id, dto);
  }

  @Delete(':id/progress')
  removeProgress(@Param('id') id: string, @Request() request: { user: User }): Promise<void> {
    return this.knowledgeService.removeProgress(id, request.user.id);
  }
}
