import React from 'react';
import Link from "next/link";

const FirstPost = () => {
	return (
		<section>
			<h2>First post page111</h2>
			<div>
				<Link href="/"><a>Home</a></Link> <br/>
				<Link href="/posts/first-post"><a>First posts</a></Link><br/>
				<Link href="/second"><a>Second page</a></Link><br/>
			</div>
		</section>
	);
};

export default FirstPost;
