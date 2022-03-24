import { Injectable } from '@nestjs/common';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Picap } from './providers/picap';
import { MiPaquete } from './providers/mi-paquete';
import { AbstractProvider } from './abstract-provider';

@Injectable()
export class DeliveryService {
  constructor(private pickup: Picap, private miPaquete: MiPaquete) {}

  // new Picap().getDelivery(deliveryId)
  // {}
  //  {}
  //  {}
  async getAllRates() {
    // switch (providerId) {
    //   case 1:
    //     return this.pickup.create({
    //       name: 'Pickup',
    //       description: 'Pickup',
    //       price: 0,
    //       providerId: 1,
    //     });
    //     break;
    //   case 2:
    //     return this.miPaquete.create({
    //       name: 'MiPaquete',
    //       description: 'MiPaquete',
    //       price: 0,
    //       providerId: 2,
    //     });
    //   default:
    //     return [];
    // }
    // return provider.create({
    //   name: 'Pickup',
    //   description: 'Pickup',
    //   price: 0,
    //   providerId: 1,
    // });

    const providers = [this.pickup, this.miPaquete];
    const rates = {};
    for (const provider of providers) {
      rates[provider.name] = await this.createOne(
        +provider.providerId,
        provider,
      );
    }

    return rates;
  }

  createOne(id: number, provider: AbstractProvider) {
    return provider.getRates('1');
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }

  getProvider(providerId: number) {
    switch (providerId) {
      case 1:
        return this.pickup;
      case 2:
        return this.miPaquete;
      default:
        return null;
    }
  }
}
