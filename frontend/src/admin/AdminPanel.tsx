import { Admin, Layout, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import UserList from "./users/UserList";
import ShowUser from "./users/ShowUser";
import UserCreate from "./users/UserCreate";
import PlanList from "./plans/PlanList";
import PlanCreate from "./plans/PlanCreate";
import PlanShow from "./plans/PlanShow";
import PlanEdit from "./plans/PlanEdit";
import { FaUser } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FaPlane } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { CiImageOff } from "react-icons/ci";
import ImageList from "./images/ImageList";
import ImageCreate from "./images/ImageCreate";
import InactiveImageList from "./images/InactiveImageList";
import ProfileList from "./profiles/ProfileList";
import { ProfileShow } from "./profiles/ProfileShow";
import { ProfileEdit } from "./profiles/ProfileEdit";
import ProfileCreate from "./profiles/ProfileCreate";
import { FaBook } from "react-icons/fa";
import { BookingList } from "./booking/BookingList";
import { BookingShow } from "./booking/BookingShow";

const HomePage = () => {
  return <h1>Home Page</h1>;
};

const AdminPanel = () => {
  return (
    <Admin
      layout={Layout}
      dataProvider={dataProvider}
      dashboard={HomePage}
      authProvider={authProvider}
    >
      <Resource
        icon={FaUser}
        name="users"
        list={UserList}
        show={ShowUser}
        create={UserCreate}
      />
      <Resource
        icon={ImProfile}
        name="profiles"
        list={ProfileList}
        show={ProfileShow}
        create={ProfileCreate}
        edit={ProfileEdit}
      />
      <Resource
        icon={FaPlane}
        name="plans"
        list={PlanList}
        show={PlanShow}
        create={PlanCreate}
        edit={PlanEdit}
      />
      <Resource
        icon={FaBook}
        name="bookings"
        list={BookingList}
        show={BookingShow}
        // create={PlanCreate}
        // edit={PlanEdit}
      />
      <Resource
        icon={FaRegImage}
        name="images"
        list={ImageList}
        create={ImageCreate}
      />
      <Resource
        icon={CiImageOff}
        name="inactiveImages"
        list={InactiveImageList}
      />
    </Admin>
  );
};

export default AdminPanel;
