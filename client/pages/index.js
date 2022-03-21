import axios from "axios";

const LandingPage = ({ currentUser }) => {
    console.log(currentUser);


    return <h1> Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
    console.log(req.headers);

    // const response = await axios.get('/api/users/currentuser');
    // console.log('I am on the server');
    // return response.data;

    console.log("I was executed");
    if (typeof window === 'undefined') {

        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
            headers: req.headers
        });
        return data;
        // we are on server
    }
    else {
        // we are on browser
        const { data } = await axios.get('/api/users/currentuser');
        return data;
    }
    return {};


};

export default LandingPage;
