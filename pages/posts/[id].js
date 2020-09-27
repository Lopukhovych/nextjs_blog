import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import {getPostData, getAllPostIds} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'
import styles from './[id].module.css';

const Post = ({postData}) => {
	console.log('postData: ', postData);
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<p className={styles.id_data}>{postData.id}</p>
				<hr/>
				<div>
					{postData.date}
					<br/>
					<div className={utilStyles.lightText}>
						<Date dateString={postData.date} />
					</div>
				</div>
				<hr/>
				<div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
			</article>
		</Layout>
	);
};

export default Post;

export async function getStaticPaths() {
	console.log('getAllPostIds: ', getAllPostIds());
	const paths = await getAllPostIds();
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({params}) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData
		}
	}
}
