import { Models } from 'appwrite';
import Loader from './loader';
import GridPostList from './GridPostList';

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[] | any;
}
const SearchResults = ({isSearchFetching, searchedPosts}: SearchResultsProps) => {
  if(isSearchFetching) return <Loader/>
 
  if(searchedPosts && searchedPosts.documents.length>0) {
    return (
    <GridPostList posts={searchedPosts.documents}/>
    )
  }
  return (
   <p className='text-light-4 mt-10 text-centere w-full'>No results found</p>
  )
}

export default SearchResults
