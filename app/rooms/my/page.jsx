import Heading from "@/components/Heading";
import getMyRooms from "@/actions/getMyRoom";
import MyRoomCard from "@/components/MyRoomCard";
const MyRoomsPage = async () => {
    const rooms= await getMyRooms();
    return (  
        <>
          <Heading title='My Rooms'/>
          {rooms.length > 0 ? (
            rooms.map(room => (
                <MyRoomCard key={room.$id} room={room}/>
            ))
          ) : (
            <p>You have no room</p> )}
        </>
    );
}
 
export default MyRoomsPage;