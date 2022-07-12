import Layout from "./components/Layout";
import LoginForm from "./components/login/LoginForm";
import LoginHead from "./components/login/LoginHead";
import Home from "./components/home/Home";

export const routes = [
    {
        path: '/login',
        component:
            <Layout>
                <LoginHead />
                <LoginForm />
            </Layout>
    },
    {
        path: '/',
        component:
            <Layout>
                <Home />
            </Layout>

    },
    {
        path: '/test',
        component:
            <Layout>
                <Home />
            </Layout>

    },

]