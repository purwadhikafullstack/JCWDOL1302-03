import { Category, PrismaClient } from "@prisma/client";
import { IAddress } from "@/interfaces/address.interface";
import { ICategories } from "@/interfaces/categories.interface";


const prisma = new PrismaClient
const createCategoriesQuery = async (data: ICategories) => {
    try {
        

        const {category} = data

        const categories = await prisma.category.create({
            data: {
                category
            }
        })

        return categories

    } catch (err) {
        throw err
        
    }
}

const getCategoriesQuery = async (filters: {
    category?: string
    
}): Promise<ICategories[]> => {
    try {
        const {category} = filters
        // const skipPage = Number(page) > 1? (Number(page) - 1) * Number(pageSize) : 0
        const event = await prisma.category.findMany({
//             include: {
// name: true
//             },
            // skip: skipPage,
            // take: Number(pageSize),
            where: {
                category: {contains:category},
               
            }
        })
        return event
    } catch (err) {
        throw err
    }
}

const updateCategoriesQuery = async (id: number, filters: {
    category?: string;
   
}): Promise<ICategories> => {
    try {
        const updateCategory = await prisma.category.update({
            where: {id},

            data: {
                ...filters
            }
        })

        return updateCategory
    } catch (err) {
        throw err
    }
}

const deleteCategoriesQuery = async (id: number): Promise<ICategories> => {
    try {
        const deleteCategory = await prisma.category.delete({
            where: { id }
        })

        return deleteCategory
    } catch (err) {
        throw err
    }
}

export {
    createCategoriesQuery,
    getCategoriesQuery,
    updateCategoriesQuery,
    deleteCategoriesQuery
}