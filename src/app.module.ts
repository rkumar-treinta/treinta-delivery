import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryModule } from './delivery/delivery.module';
import { MiPaquete } from './delivery/providers/mi-paquete';
import { Picap } from './delivery/providers/picap';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [DeliveryModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, MiPaquete, Picap],
})
export class AppModule {}
