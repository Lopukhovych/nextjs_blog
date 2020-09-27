import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, '')
		const fullPath = path.join(postsDirectory, fileName)
		const fileContents = fs.readFileSync(fullPath, 'utf8')

		const matterResult = matter(fileContents);
		return {
			id,
			...matterResult.data
		}
	});

	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1
		} else {
			return -1
		}
	})
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	if(!fileContents) return null;
	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents)

	const processedContent = await remark()
		.use(html)
		.process(matterResult.content)
	const contentHtml = processedContent.toString()

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data
	}
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory)

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
	//     }
	//   }
	// ]
	return fileNames.map(fileName => {
		return {
			params: {
				id: fileName.replace(/\.md$/, '')
			}
		}
	})

	// Instead of the file system,
	// fetch post data from an external API endpoint
	// const res = await fetch('..')
	// const posts = await res.json()
	// return posts.map(post => {
	// 	return {
	// 		params: {
	// 			id: post.id
	// 		}
	// 	}
	// })
}

export async function getSortedPosts() {
	// Instead of the file system,
	// fetch post data from an external API endpoint
	const res = await fetch('..')
	return res.json()
}
