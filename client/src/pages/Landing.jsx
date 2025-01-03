import { Logo } from "../components";
import { Link } from "react-router-dom";

function Landing() {

  
  return (
    <section>
      <nav className='bg-[#ebebeb] py-6'>
        <div className='alignment'>
          <Logo />
        </div>
      </nav>
      <div className='alignment grid gap-y-4 mt-12'>
        <h1>Job portal app</h1>
        <p className="text-lg">
          Some of the libraries used are Bcryptjs, cloudinary, jsonwebtoken, multer, helmet, express-validator, dayjs, recharts, axios, react-router, react-toastify, tailwind css and so on. 
        </p>
        <div className='flex gap-x-4'>
          <Link to='/register' className='btn'>
            Register
          </Link>
          <Link to='/login' className='btn'>
            Login / Demo User
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;
