import { useQuery } from 'react-query'
import { productApi } from '../../sevices/products'

export const useGetProductSearch = (keyword: string, category: string) => {
    return useQuery({
        queryKey: ['search-product', keyword, category],
        queryFn: () => productApi.searchProduct(keyword, category),
    })
}

export const useGetProductSale = () => {
    return useQuery({
        queryKey: ['productSale'],
        queryFn: () => productApi.getProductSale(),
    })
}



