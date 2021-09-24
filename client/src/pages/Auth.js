import AuthCard from "../components/AuthCard";
const Auth = ({ state }) => {
  return (
    <div
      className="w-screen  flex flex-col justify-center items-center h-screen  bg-opacity-50"
      style={{
        backgroundColor: "#FAACA8 ",
        backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
      }}
    >
      <AuthCard state={state} />
    </div>
  );
};

export default Auth;
