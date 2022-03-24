import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  //get rates from multiple delivery services
  @Get()
  getRates() {
    // get a list of users and posts together
    return this.deliveryService.getAllRates();
  }

  // get rate for one delivery with one provider
  @Get(':id')
  createOne(@Param('id') id: string) {
    const provider = this.deliveryService.getProvider(+id);

    // no se ejecuta si el id no existe
    return this.deliveryService.createOne(+id, provider);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
