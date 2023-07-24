import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES, RequestWithUser } from 'src/utils/types/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  @Roles(ROLES.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  getAll(@Req() req: RequestWithUser) {
    console.log('getAll resources api', req.user);
    return this.resourcesService.getAll();
  }
}
