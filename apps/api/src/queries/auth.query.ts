import { Auth } from '@/interfaces/auth.interface';
import prisma from '@/prisma';
import { User } from '@/interfaces/user.interface';
import { transporter } from '@/helpers/nodemailer';
import * as handlebars from 'handlebars';
import path from 'path';
import { API_KEY } from '@/config';
import fs from 'fs';
import { sign } from 'jsonwebtoken';
import { httpException } from '@/exceptions/http.exception';
import { Container, Service } from 'typedi';
import { UserQueries } from './user.query';

@Service()
export class AuthQueries {
  userQuery = Container.get(UserQueries);

  async generateCode(length: number) {
    try {
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let retVal = '';
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n)).toUpperCase();
      }
      return retVal;
    } catch (e) {
      throw e;
    }
  }

  private sendRegistrationEmail = async (data: User) => {
    try {
      const payload = {
        id: data.id,
        username: data.username,
        email: data.email,
        password: data.password,
        verified: data.verified,
        referralCode: data.referralCode,
        name: data.name,
        gender: data.gender,
        birthDate: data.birthDate,
        role: data.role,
        profilePicture: data.profilePicture,
        claimedCode: data.claimedCode,
      };
      const token = sign(payload, String(API_KEY), { expiresIn: '1hr' });
      const urlVerify = `${process.env.FE_URL}/verify?token=${token}`;
      const templatePath = path.join(
        __dirname,
        '../templates',
        'registrationEmail.hbs',
      );
      console.log(templatePath);
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
        email: data.email,
        url: urlVerify,
      });
      console.log('email terkirim!');
      await transporter.sendMail({
        from: 'Cheery Fresh',
        to: data.email,
        subject: 'Account Verification',
        html,
      });
    } catch (e) {
      throw e;
    }
  };

  private sendResetPasswordEmail = async (email: string) => {
    try {
      const user = await this.userQuery.getUserByEmail(email);
      if (!user) throw new httpException(404, 'User not found');
      const token = sign({ email }, String(API_KEY), { expiresIn: '1hr' });
      const urlReset = `${process.env.FE_URL}/login/resetpassword/reset?token=${token}`;
      const templatePath = path.join(
        __dirname,
        '../templates',
        'resetPasswordByEmail.hbs',
      );
      console.log(templatePath);
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      const html = compiledTemplate({
        email: email,
        url: urlReset,
      });
      console.log('email terkirim!');
      await transporter.sendMail({
        from: 'Cheery Fresh',
        to: email,
        subject: 'Reset Password',
        html,
      });
    } catch (e) {
      throw e;
    }
  };

  public resetConfirmationQuery = async (email: string) => {
    try {
      const user = await this.userQuery.getUserByEmail(email);
      if (!user) throw new httpException(404, 'No User Found');
      await this.sendResetPasswordEmail(email);
      return user;
    } catch (e) {
      throw e;
    }
  };

  public updatePasswordQuery = async (data: User, pass: string) => {
    try {
      await prisma.$transaction(async (prisma) => {
        try {
          const reset = await prisma.user.update({
            where: { email: data.email },
            data: {
              password: pass,
            },
          });
          return reset;
        } catch (e) {
          throw e;
        }
      });
    } catch (e) {
      throw e;
    }
  };

  public registerQuery = async (email: string) => {
    try {
      const t = await prisma.$transaction(
        async (prisma) => {
          try {
            const startDate = new Date(0, 0, 0).toISOString();
            const user = await prisma.user.create({
              data: {
                username: null,
                email: email,
                password: '',
                referralCode: '',
                verified: false,
                name: '',
                gender: '',
                birthDate: startDate,
                role: 'User',
                profilePicture: '',
                claimedCode: '',
              },
            });

            await this.sendRegistrationEmail(user);

            return user;
          } catch (err) {
            throw err;
          }
        },
        {
          maxWait: 5000, // default: 2000
          timeout: 10000, // default: 5000
        },
      );

      return t;
    } catch (err) {
      throw err;
    }
  };

  public async loginQuery(data: Auth) {
    try {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
        where: {
          email: data.email,
          password: data.password,
        },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  public async verifyQuery(user: User, pass: string) {
    try {
      let generateReferral = '';
      if (user.role === 'User') {
        while (true) {
          generateReferral = await this.generateCode(6);
          const check = await prisma.user.findFirst({
            where: { referralCode: generateReferral },
          });
          if (!check) break;
        }
      }

      if (user.claimedCode) {
        const availableReferralCode = await prisma.user.findFirst({
          where: { referralCode: user.claimedCode },
        });
        if (!availableReferralCode) {
          throw new httpException(500, 'Referral code not available');
        }
      }

      await prisma.$transaction(async (prisma) => {
        try {
          const verify = await prisma.user.update({
            where: {
              email: user.email,
            },
            data: {
              password: pass,
              verified: true,
              referralCode: generateReferral,
              profilePicture: 'apps/web/public/default_avatar.webp',
            },
          });
          return verify;
        } catch (e) {
          throw e;
        }
      });
    } catch (e) {
      throw e;
    }
  }

  public async adminLoginQuery(data: Auth) {
    try {
      const admin = await prisma.admin.findUnique({
        select: {
          id: true,
          email: true,
          username: true,
          role_id: true,
        },
        where: {
          email: data.email,
          password: data.password,
        },
      });
      return admin;
    } catch (e) {
      throw e;
    }
  }
}
