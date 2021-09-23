import { Link } from "react-router-dom";
const NavBtn = ({ link, text }) => {
  return (
    <Link to={`/${link}`}>
      <button className="mt-3 min-w-max bg-gray-600 hover:bg-gray-300 hover:text-gray-600 shadow-md dark:bg-gray-300 dark:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-white hover:shadow-lg transition-all py-2 px-4 text-white rounded-md">
        {text}
      </button>
    </Link>
  );
};

export default NavBtn;
