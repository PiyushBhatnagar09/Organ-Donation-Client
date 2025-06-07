import Top from "./Navbar/Top";
import Corous from "./Home_Page/corousal/Corous";
import About from "./Home_Page/About/About";
import Success from "./Home_Page/Success_Story/Success";
import Partner from "./Home_Page/Partner_with_us/Partner";
// import DonateMoney from "./Home_Page/Donate_money/DonateMoney";

const Home = () => {
    return (
        <>
            <Top />
            <Corous/>
            <About />
            <Success />
            {/* <DonateMoney/> */}
            <Partner />
        </>
    );
};

export default Home;