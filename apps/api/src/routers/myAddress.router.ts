import { createMyAddressController, updateMyAddressController, deleteMyAddressController,updateStatusMyAddressController, getMyAddressController } from "@/controllers/myAddress.controller";
import { Container, Service } from "typedi";
import { Router } from "express";
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import express from 'express'
import { create } from "handlebars";

@Service()
export class AddressRouter{
    myAddressController = Container.get(createMyAddressController);
    myGetAddressController = Container.get(getMyAddressController)
    updateMyAddressController = Container.get(updateMyAddressController)
    updateStatusMyAddressController = Container.get(updateStatusMyAddressController)
    deleteMyAddressController = Container.get(deleteMyAddressController)
    authGuard = Container.get(AuthMiddlewares);

    private router: Router

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/",this.authGuard.verifyToken, this.myAddressController.myAddressController);
        this.router.get("/",this.authGuard.verifyToken, this.myGetAddressController.getMyAddressController)
        this.router.patch("/:id",this.updateMyAddressController.updateMyAddressController)
        this.router.patch("/status/:id",this.authGuard.verifyToken,this.updateStatusMyAddressController.updateStatusMyAddressController)
        this.router.delete("/:id",this.deleteMyAddressController.deleteMyAddressController)
    }

    getRouter(): Router {
        return this.router;
      }
}


// const router = express.Router()


// router.post("/", createMyAddressController)


// export default router