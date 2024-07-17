import { httpException } from '@/exceptions/http.exception';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { join } from 'path';
import path = require('path');
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, folderName?: string) => {
  try {
    const defaultDirectory = join(__dirname, '../public');

    const storage = multer.diskStorage({
      destination: (
        req: Request,
        file: Express.Multer.File,
        cb: DestinationCallback,
      ) => {
        const destination = folderName
          ? defaultDirectory + folderName
          : defaultDirectory;
        cb(null, destination);
      },
      filename: (
        req: Request,
        file: Express.Multer.File,
        cb: FileNameCallback,
      ) => {
        const originalNameFile = file.originalname.split('.');
        console.log(originalNameFile);
        const fileExtension = originalNameFile[originalNameFile.length - 1];
        const newFileName = filePrefix + Date.now() + '.' + fileExtension;
        cb(null, newFileName);
      },
    });
    const filter = (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      try {
        const extension = path.extname(file.originalname);
        if (
          extension !== '.jpg' &&
          extension !== '.jpeg' &&
          extension !== '.png' &&
          extension !== '.gif'
        ) {
          cb(new httpException(500, 'File extension type is invalid!'));
        }
        cb(null, true);
      } catch (e) {
        throw e;
      }
    };
    return multer({
      storage: storage,
      fileFilter: filter,
      limits: { fileSize: 1024 * 1024 },
    });
  } catch (e) {
    throw e;
  }
};
