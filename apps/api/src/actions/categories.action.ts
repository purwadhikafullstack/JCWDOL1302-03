import { ICategories } from "@/interfaces/categories.interface"
import { createCategoriesQuery, getCategoriesQuery, updateCategoriesQuery,deleteCategoriesQuery } from "@/queries/categories.query"
import { CategoriesRouter } from "@/routers/categories.router"

const createCategoriesAction = async (data: ICategories) => {
    try {
        const address = await createCategoriesQuery(data)

        return address
    } catch (err) {
        throw err
    }
}

const getCategoriesAction = async (filters: { category?: string }): Promise<ICategories[]> => {
    try {
        const event = await getCategoriesQuery(filters)

        return event
    } catch (err) {
        throw err
    }
}

const updateCategoriesAction = async (id: number, filters: {
    category?: string
    

}) =>{
    try {
        const updateCategory = await updateCategoriesQuery (id, filters)

        return updateCategory
    } catch (err) {
        throw err
    }
}

const deleteCategoriesAction = async (id: number): Promise<ICategories> => {
    try {
        const deleteCategory =  await deleteCategoriesQuery (id)

        return deleteCategory
    } catch (err) {
        throw err
    }
}




export {
    createCategoriesAction,
    getCategoriesAction,
    updateCategoriesAction,
    deleteCategoriesAction
}