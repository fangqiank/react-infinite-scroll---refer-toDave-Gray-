import React from 'react'

export const Post = React.forwardRef((props, ref) => {
	// console.log({props})
	const postBody = (
		<>
			<h2>{props.post.title}</h2>
			<p>{props.post.body}</p>
			<p>Post ID: {props.post.id}</p>
		</>
	)

	return (		
		ref ? (
			<article ref={ref}>{postBody}</article> 
		) 
		: (
				<article>{postBody}</article>
		)
	)
})
