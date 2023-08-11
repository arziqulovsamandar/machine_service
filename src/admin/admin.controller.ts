import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { CookieGetter } from "../decorators/cookieGetter.decorator";
import { JwtGuard } from "../guards/jwt.guard";
import { AdminGuard } from "../guards/admin.guard";
import { IsCreatorGuard } from "../guards/is-creator.guard";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(IsCreatorGuard)
  @ApiOperation({ summary: "Yangi admin qo'shish" })
  @Post("registration")
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: "Admin tizimga kirishi" })
  @Post("login")
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: "Admin tizimdan chiqishi" })
  @Post("logout")
  logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(67);
    
    return this.adminService.logout(refreshToken, res);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: "Adminlarni ko'rish" })
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: "Adminni id orqali ko'rish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @ApiOperation({ summary: "Adminni id orqali yangilash" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtGuard, AdminGuard, IsCreatorGuard)
  @ApiOperation({ summary: "Adminni id orqali o'chirish" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @ApiOperation({ summary: "Adminni activate qilish" })
  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.adminService.activate(link);
  }

  @ApiOperation({ summary: "Adminni tokenini yangilash" })
  @Post("refresh/:id")
  refresh(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(80);
    
    return this.adminService.refreshToken(+id, refreshToken, res);
  }
}
