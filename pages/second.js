import React from 'react';
import Link from "next/link";
import Head from "next/head";
import Layout from '../components/layout';

const Second = () => {
	return (
		<Layout>
			<Head>
				<title>Second page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section>
				<h2>Second-page</h2>
				<div>
					<Link href="/"><a>Home</a></Link> <br/>
					<Link href="/posts/first-post"><a>First posts</a></Link><br/>
					<Link href="/second"><a>Second page</a></Link><br/>
				</div>
			</section>
			<style jsx>{`
				h2 {
				background: yellow;
				}
			`}</style>
		</Layout>
	);
};

export default Second;
