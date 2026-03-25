import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) throw new Error('User not found');
    return { id: user.id, email: user.email, language: user.language, createdAt: user.createdAt };
  }

  @Patch('me/password')
  async changePassword(
    @Request() req,
    @Body() body: { currentPassword: string; newPassword: string }
  ) {
    await this.usersService.changePassword(req.user.id, body.currentPassword, body.newPassword);
    return { message: 'Password updated successfully' };
  }
}
