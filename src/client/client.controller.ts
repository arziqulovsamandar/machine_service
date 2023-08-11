import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CookieGetter } from "../decorators/cookieGetter.decorator";
import { Client } from "./model/client.model";
import { LoginClientDto } from "./dto/login-client.dto";
import { JwtGuard } from "../guards/jwt.guard";
import { AdminGuard } from "../guards/admin.guard";
import { IsCreatorGuard } from "../guards/is-creator.guard";

@ApiTags("Client")
@Controller("client")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiOperation({ summary: "Yangi client qo'shish" })
  @Post("registration")
  registration(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.registration(createClientDto, res);
  }

  @ApiOperation({ summary: "Client tizimga kirishi" })
  @Post("login")
  login(
    @Body() loginClientDto: LoginClientDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.clientService.login(loginClientDto, res);
  }

  @ApiOperation({ summary: "Client tizimdan chiqishi" })
  @Post("logout")
  logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(11);

    return this.clientService.logout(refreshToken, res);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Clientlarni ko'rish" })
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Clientni id orqali ko'rish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Clientni id orqali yangilash" })
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateClientDto: UpdateClientDto,
    @CookieGetter("refresh_token") refreshToken: string
  ) {
    return this.clientService.update(+id, updateClientDto, refreshToken);
  }

  @UseGuards(JwtGuard, AdminGuard, IsCreatorGuard)
  @ApiOperation({ summary: "Clientni id orqali o'chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientService.remove(+id);
  }

  @ApiOperation({ summary: "Clientni activate qilish" })
  @ApiResponse({ status: 200, type: Client })
  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.clientService.activate(link);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({ summary: "Foydalanuvchi tokenini yangilash" })
  @Post("refresh/:id")
  refresh(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(81);

    return this.clientService.refreshToken(+id, refreshToken, res);
  }
}
