import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/constants';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Get('auth/login')
  async login(@Request() req: any) {
    console.log('login');
    return {
      csrfToken: req.csrfToken(),
      token: await this.authService.login(req.user),
    };
  }

  @Post('/transfer')
  transfer(@Body() params: { name: string; amount: number }): boolean {
    return this.appService.transfer(params);
  }
}
