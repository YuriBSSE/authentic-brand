import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function SkeletonComponent(props) {
    return (
        <main>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
		</main>
    );
}

export default SkeletonComponent;