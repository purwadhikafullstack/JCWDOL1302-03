import { DiscountControllers } from "@/controllers/discount.controller";
import { Router } from "express";
import { Container, Service } from "typedi";

@Service()
export class DiscountRouter{
    discountController = Container.get(DiscountControllers);
    private router: Router;

    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void{
        this.router.post('/create', this.discountController.createDiscountController);   
    }

    getRouter():Router{
        return this.router;
    }
}