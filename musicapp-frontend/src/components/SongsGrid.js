import { useSongsContext } from "../hooks/useSongsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const SongsGrid = ({ song }) => {
  const { dispatch } = useSongsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/songs/${song._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SONGS", payload: json });
    }
  };
  return (
    <div className="song-details">
      <h4>{song.title}</h4>
    </div>
  );
};

export default SongsGrid;
