import { useQuery } from 'react-query'
import { getCategory } from '../../sevices/client/category'


export const useGetCategoryLookBook = () => {
    return useQuery({
        queryKey: ['categoryLookBook'],
        queryFn: async () => await getCategory(),
    })
}


