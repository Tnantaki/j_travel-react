import { Admin, Layout, ListGuesser, Resource, ShowGuesser } from "react-admin";
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
      <Resource icon={ImProfile} name="profiles" list={ListGuesser} />
      <Resource
        icon={FaPlane}
        name="plans"
        list={PlanList}
        show={PlanShow}
        create={PlanCreate}
        edit={PlanEdit}
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
