import { Link } from "react-router-dom";
import Image from "../img/profile.jpg";

const Contact = () => {
  return (
    <div className="flex flex-col ml-10 p-8 min-h-screen  items-center">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <img
        src={Image}
        alt="Profile"
        className="w-48 h-48 rounded-full mb-8 object-cover shadow-lg"
      />
      <div className="text-lg space-y-4">
        <div>
          <Link
            to="https://github.com/seolyam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            GitHub
          </Link>
        </div>
        <div>
          <a
            href="mailto:leeyam.dev@gmail.com"
            className="text-black hover:underline"
          >
            leeyam.dev@gmail.com
          </a>
        </div>
        <div>
          <Link
            to="https://www.linkedin.com/in/lhiam-andrei-lingco-5b1b622a0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
