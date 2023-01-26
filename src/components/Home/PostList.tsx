import React from "react";
import Post from "./Post";
import { PUBLICATIONS_DATA } from "./publishData";
import styled from "@emotion/styled";

function PostList() {
	return (
		<PostListGlobal>
			{PUBLICATIONS_DATA.map((item: any) => {
				return (
					<Post
						key={item.id}
						owner={item.owner}
						ownerPicture={item.ownerPicture}
						category={item.category}
						icon={item.icon}
						content={item.content}
						image={item.image}
						tags={item.tags}
						likes={item.likes}
						commentsNumber={item.commentsNumber}
					/>
				);
			})}
		</PostListGlobal>
	);
}

export default PostList;

const PostListGlobal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
