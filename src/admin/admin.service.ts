import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./model/admin.model";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async registration(
      createAdminDto: CreateAdminDto,
      res: Response
  ): Promise<{
      message: string;
      admin: Admin;
      tokens: {
          access_token: string;
          refresh_token: string;
      };
  }> {
      const admin = await this.adminRepo.findOne({
          where: { email: createAdminDto.email },
      });
      if (admin) {
          throw new BadRequestException("Email already exists");
      }
      if (createAdminDto.password !== createAdminDto.confirm_password) {
          throw new BadRequestException("Passwords is not matched");
      }

      const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
      const newAdmin = await this.adminRepo.create({
          ...createAdminDto,
          password: hashed_password,
      });
      const tokens = await this.getTokens(newAdmin);
      const uniqueKey: string = uuidv4();

      const updatedAdmin = await this.hashRefeshToken(
          tokens.refresh_token,
          newAdmin,
          res,
          uniqueKey
      );

      try {
          console.log(updatedAdmin[1][0]);

          await this.mailService.sendAdminConfirmation(updatedAdmin[1][0].dataValues);
      } catch (error) {
          console.log(error);
      }

      const response = {
          message: "Admin registered",
          admin: updatedAdmin[1][0],
          tokens,
      };
      return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      name: admin.first_name,
      is_creator: admin.is_creator,
      role: "Admin",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async hashRefeshToken(
    refresh_token: string,
    admin: Admin,
    res: Response,
    uniqueKey?: string
  ): Promise<[affectedCount: number, affectedRows: Admin[]]> {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 7);
    if (uniqueKey) {
      const updatedAdmin = await this.adminRepo.update(
        {
          refresh_token: hashed_refresh_token,
          activation_link: uniqueKey,
        },
        { where: { id: admin.dataValues.id }, returning: true }
      );
      res.cookie("refresh_token", refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return updatedAdmin;
    }

    const updatedAdmin = await this.adminRepo.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true }
    );

    res.cookie("refresh_token", refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return updatedAdmin;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException("Admin is not registered");
    }
    const isMatchPass = await bcrypt.compare(password, admin.password);
    if (!isMatchPass) {
      throw new UnauthorizedException("Admin is not registered(pass");
    }

    const tokens = await this.getTokens(admin);
    const updatedAdmin = await this.hashRefeshToken(
      tokens.refresh_token,
      admin,
      res
    );

    const response = {
      message: "Admin logged in",
      admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    console.log(34);
    
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    console.log(12);
    
    if (!adminData) {
      throw new ForbiddenException("Admin not found");
    }
    const updatedAdmin = await this.adminRepo.update(
      { refresh_token: null },
      { where: { id: adminData.id }, returning: true }
    );
    console.log(updatedAdmin);
    
    res.clearCookie("refresh_token");
    const response = {
      message: "Admin logged out successfully",
      admin: updatedAdmin[1][0],
    };
    return response;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);

    if (admin_id != decodedToken["id"]) {
      throw new BadRequestException("Admin not found 1");
    }
    const admin = await this.adminRepo.findOne({
      where: { id: admin_id },
    });
    if (!admin) {
      throw new BadRequestException("Admin not found");
    }

    const tokenMatch = await bcrypt.compare(refreshToken, admin.refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const tokens = await this.getTokens(admin);

    const updatedAdmin = await this.hashRefeshToken(refreshToken, admin, res);

    const response = {
      message: "Admin refreshed",
      admin: updatedAdmin[1][0],
      tokens,
    };
    return response;
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepo.findAll();
    if (admins.length > 0) {
      return admins;
    }
    throw new HttpException("Not found", HttpStatus.NOT_FOUND);
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findByPk(id);
    if (admin) {
      return admin;
    }
    throw new HttpException("Not found with such id", HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto
  ): Promise<{ message: string; updated: Admin }> {
    const admin = await this.adminRepo.findByPk(id);
    if (admin) {
      const updatedAdmin = await this.adminRepo.update(updateAdminDto, {
        where: { id },
        returning: true,
      });

      if (updatedAdmin[0]) {
        return {
          message: "Updated succesfully",
          updated: updatedAdmin[1][0].dataValues,
        };
      }
      throw new BadRequestException("Did not updated");
    } else {
      throw new HttpException("Not found with such id", HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleted = await this.adminRepo.destroy({
      where: { id },
    });
    if (deleted) {
      return { message: "Deleted succesfully" };
    }
    throw new HttpException("Not found with such id", HttpStatus.NOT_FOUND);
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updatedAdmin = await this.adminRepo.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false },
        returning: true,
      }
    );

    if (!updatedAdmin[1][0]) {
      throw new BadRequestException("Admin already activated");
    }

    const response = {
      message: "Admin activated successfully",
      admin: updatedAdmin[1][0],
    };
    return response;
  }
}
