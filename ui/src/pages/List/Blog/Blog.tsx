import List from "components/Hoc/List/List";
import Resource from "components/General/ListItems/Resource/Resource";
import useFetchList from "lib/utils/hooks/useFetchList";
import Search from "components/General/Search/Search";

const URL = `./blog.json`;
const QUERY_KEY = "blog";

const Blog: React.FC = () => {
	const { data, isLoading, isError } = useFetchList(QUERY_KEY, URL);

	return (
		<>
			<Search items={data} resourceName={QUERY_KEY} />
			<List
				items={data}
				resourceName={QUERY_KEY}
				itemComponent={Resource}
				isLoading={isLoading}
				isError={isError}
			/>
		</>
	);
};

export default Blog;
