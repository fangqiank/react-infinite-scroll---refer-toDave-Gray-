import React, {useState, useRef, useCallback} from 'react'
import usePosts from '../hooks/usePosts'
import { Post } from '../components/Post'

export const Example1 = () => {
	const [pageNum, setPageNum] = useState(1)
	const {
		isLoading,
		isError,
		error,
		results,
		hasNextPage
	} = usePosts(pageNum)

	// const lastPostRef = useRef()
	const intObserver = useRef()
	const lastPostRef = useCallback(post => {
		if(isLoading) return 


		if(intObserver.current) 
			intObserver.current.disconnect()
			

		intObserver.current = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting && hasNextPage) {
				console.log('We are near the last post')
				setPageNum(prev => prev + 1)
			}
		})

		if(post) 
			intObserver.current.observe(post)
	},[isLoading, hasNextPage])

	
	if(isError)
		return <p className='center'>Error: {error.message}</p>
	
	return (
		<>
			<h1 id="top">
				&infin; Infinite Query &amp; Scroll<br />&infin; Ex. 1 - React only
			</h1>
			{results.map((post, idx) => {
				if(results.length === idx + 1) {
					return <Post ref={lastPostRef} key={post.id} post={post} />
				}

				return <Post key={post.id} post={post} />
			})}
			{isLoading && <p className='center'>Loading more posts...</p>}
      <p className="center">
				<a href="#top">Back to Top</a>
			</p>
		</>
	)
}
