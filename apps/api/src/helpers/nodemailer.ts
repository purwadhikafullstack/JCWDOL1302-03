import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cheeryfresh.verify@gmail.com',
    pass: 'dgkyjjbdvyfuxvga',
  },
});
