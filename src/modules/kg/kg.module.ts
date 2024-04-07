import { Module } from '@nestjs/common';
import { KgController } from './kg.controller';
import { KgService } from './kg.service';
import { Neo4jModule } from '@nhogs/nestjs-neo4j';
import { AppConfigService } from 'src/shared/services/app-config.service';

@Module({
  imports: [
    Neo4jModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.neo4jConfig,
    }),
  ],
  controllers: [KgController],
  providers: [KgService],
})
export class KgModule {}
