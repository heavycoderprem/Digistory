import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type TopCreatorProps = {
    creator?: Models.Document;
}
const TopCreators = ({creator}: TopCreatorProps) => {
  return (
    <div>
        <Link to={`/profile/${creator?.$id}`} className="px-2 py-5 border-[#1F1F22] border-2 rounded-[20px] flex flex-col items-center gap-1 justify-center w-[150px] h-[170px]">
        <img src={`${creator?.imageUrl}` || "/assets/icons/profile-placeholder.svg"} alt="profile" className="h-14 w-14 rounded-full" />
        <p className="body-bold">
         {creator?.name}
        </p>

        <Button className="bg-primary-500 py-5">
            Follow
        </Button>
        </Link>
    </div>
  )
}

export default TopCreators
