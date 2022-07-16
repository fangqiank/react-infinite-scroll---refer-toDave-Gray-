import React, {useRef, useCallback} from 'react'
import { useInfiniteQuery } from 'react-query'
import { Post } from '../components/Post'
import { getPosts } from '../api/axios'

export const Example2 = () => {
	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		data,
		status,
		error,
	} = useInfiniteQuery(
		'posts', 
		({pageParam = 1}) => getPosts(pageParam),
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.length 
				? allPages.length + 1 
				: undefined
			}
		}
	) 
	

	const intObserver = useRef()
	const lastPostRef = useCallback(post => {
		if(isFetchingNextPage) return 

		if(intObserver.current) 
			intObserver.current.disconnect()

			intObserver.current = new IntersectionObserver(entries => {
				if(entries[0].isIntersecting && hasNextPage) {
					console.log('We are near the last post')
					fetchNextPage()
				}
			})

		if(post) 
			intObserver.current.observe(post)
	},[isFetchingNextPage, fetchNextPage, hasNextPage])

	if(status === 'error') 
		return <p className='center'>Error: {error.message}</p>
	
	console.log({data})

	return (
		<>
			<h1 id="top">
				&infin; Infinite Query &amp; Scroll<br />&infin; Ex. 2 - React Query
			</h1>
			
			{
				data?.pages.map(pg => {
					return pg.map((post, i) => {
							if (pg.length === i + 1) {
									return <Post ref={lastPostRef} key={post.id} post={post} />
							}
							return <Post key={post.id} post={post} />
					})
				})
			}
		
			{isFetchingNextPage && <p className='center'>Loading more posts...</p>}
      
			<p className="center">
				<a href="#top">Back to Top</a>
			</p>
		</>
	)
}
