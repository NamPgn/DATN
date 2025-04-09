import { useQuery } from "react-query"
import { getReviewTotal } from "../../sevices/client/comment"

export const useGetStaticReview = (id: any) => {
	return useQuery<any>({
		queryKey: ['reviews', id],
		queryFn: async () => await (await getReviewTotal(id))?.data,
		enabled: !!id,
		staleTime: 5 * 60 * 1000,
		cacheTime: 30 * 60 * 1000
	})
}