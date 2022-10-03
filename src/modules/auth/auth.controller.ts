import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { sessionDataInfo } from 'interfaces/IWexin';

import { RoleType } from '../../constants';
import { ApiFile, Auth, AuthUser } from '../../decorators';
import { IFile } from '../../interfaces';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { RequestService } from '../../shared/services/request.service';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { WxUserLoginDto } from './dto/WxUserLoginDto';
import { AuthWxLoginException } from './exceptions/wx-login.exception';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private requestService: RequestService,
    private configService: ApiConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Post('wx/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async wxLogin(
    @Body() wxUserLoginDto: WxUserLoginDto,
  ): Promise<LoginPayloadDto> {
    const { openid, unionid } = await this.getOpenId(wxUserLoginDto);
    let userEntity = await this.userService.findByUsernameOrEmailOrOpenid({
      openid,
    });

    if (!userEntity) {
      userEntity = await this.userService.createUser({
        openid,
        name: '微信用户',
        email: '',
        password: '',
        phone: '',
        avatar:
          'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png',
      });
    }

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  private async getOpenId(wxUserLoginDto: WxUserLoginDto) {
    const appId = this.configService.wxConfig.appid;
    const appSecret = this.configService.wxConfig.appSecret;
    const loginUrl = this.configService.wxConfig.loginUrl;
    // 获取session
    const sessionData = (await this.requestService.requests({
      url: `${loginUrl}?grant_type=authorization_code&js_code=${wxUserLoginDto.code}&appid=${appId}&secret=${appSecret}`,
      method: 'GET',
    })) as sessionDataInfo;

    if (!sessionData.openid) {
      throw new AuthWxLoginException();
    }

    return {
      openid: sessionData.openid,
      unionid: sessionData.unionid,
      session_key: sessionData.session_key,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
