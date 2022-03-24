import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { MiPaquete } from './providers/mi-paquete';
import { Picap } from './providers/picap';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AxiosInterceptor } from './axios.interceptor';

@Module({
  imports: [HttpModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    MiPaquete,
    Picap,
    {
      provide: APP_INTERCEPTOR,
      useClass: AxiosInterceptor,
    },
  ],
})
export class DeliveryModule {}
