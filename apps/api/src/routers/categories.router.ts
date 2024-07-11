import { createCategoriesController, getCategoriesController, updateCategoriesController, deleteCategoriesController } from "@/controllers/categories.controller";
import { Container, Service } from "typedi";
import { Router } from "express";
import { AuthMiddlewares } from '@/middlewares/auth.middleware';
import express from 'express'
import { create } from "handlebars";

@Service()
export class CategoriesRouter{
    createCategoriesController = Container.get(createCategoriesController);
    getCategoriesController = Container.get(getCategoriesController);
    updateCategoriesController = Container.get(updateCategoriesController);
    deleteCategoriesController = Container.get(deleteCategoriesController);
    authGuard = Container.get(AuthMiddlewares);

    private router: Router

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/",this.authGuard.verifyToken,this.authGuard.superAdminGuard,this.createCategoriesController.createCategoriesController);
        this.router.get("/",this.authGuard.verifyToken,this.authGuard.superAdminGuard, this.getCategoriesController.getCategoriesController)
        this.router.patch("/:id",this.authGuard.verifyToken,this.authGuard.superAdminGuard,this.updateCategoriesController.updateCategoriesController)
        this.router.delete("/:id",this.authGuard.verifyToken,this.authGuard.superAdminGuard, this.deleteCategoriesController.deleteCategoriesController)
    }

    getRouter(): Router {
        return this.router;
      }
}
