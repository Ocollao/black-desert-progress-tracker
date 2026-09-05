import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeEntry, KnowledgeTheme } from './knowledge.entity';
import { KnowledgeEnergy } from './knowledge-energy.entity';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeProgress, KnowledgeRequirement } from './knowledge-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KnowledgeEntry, KnowledgeTheme, KnowledgeProgress, KnowledgeRequirement, KnowledgeEnergy])],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
  exports: [KnowledgeService],
})
export class KnowledgeModule {}
