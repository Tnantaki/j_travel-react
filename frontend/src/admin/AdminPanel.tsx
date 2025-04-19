import { Admin, Layout, ListGuesser, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { useLocation, useNavigate } from "react-router";
import { authProvider } from "./authProvider";

const HomePage = () => {
  return <h1>Home Page</h1>
}

const AdminPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const history = {
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
    location,
    listen: () => () => {}, // no-op
  };

  return (
    <Admin layout={Layout} dataProvider={dataProvider} dashboard={HomePage} authProvider={authProvider} >
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
};

export default AdminPanel;
