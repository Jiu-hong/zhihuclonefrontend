import {
  signin,
  signup,
  forgot,
  reset,
  userinfo,
  getusers,
  followuser,
  clearuser,
} from "../api";

export const signinUser = async (userdata, userdispatch, setError) => {
  //api getuser
  try {
    const { data } = await signin(userdata);

    localStorage.setItem("profile", JSON.stringify(data));

    userdispatch({
      type: "login",
      payload: data.result,
    });

    return true;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      setError(error.response.data);
    }

    return false;
  }
};

export const signupUser = async (userdata, userdispatch, setError) => {
  //api signup
  try {
    const { data } = await signup(userdata);

    localStorage.setItem("profile", JSON.stringify(data));

    userdispatch({
      type: "login",
      payload: data.result,
    });

    return true;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      setError(error.response.data);
    }

    return false;
  }
};

export const forgotPassword = async (userdata, setMessage) => {
  //api signup
  try {
    const { data } = await forgot(userdata);
    console.log("data:", data);
    setMessage(data.message);

    return true;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      setMessage(error.response.data);
    }

    return false;
  }
};

export const resetPassword = async (userdata, userdispatch, setMessage) => {
  try {
    const { data } = await reset(userdata);
    localStorage.setItem("profile", JSON.stringify(data));

    userdispatch({
      type: "login",
      payload: data.result,
    });

    return true;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      setMessage(error.response.data);
    }

    return false;
  }
};

export const getPersoninfo = async (postData, persondispatch) => {
  //api
  const { data } = await userinfo(postData);

  //dispatch
  persondispatch({
    type: "getperson",
    payload: data,
  });
};

// export const getusers = () => API.get(host + "/user");
export const getUsers = async (persondispatch) => {
  //api
  const { data } = await getusers();

  //dispatch
  persondispatch({
    type: "getfollowers",
    payload: data,
  });
};

const handleJwtexpire = (error, handler) => {
  if (error.response?.data?.error == "jwt expired") {
    logout(handler);
  }
};

export const followUser = async (postData, persondispatch, userdispatch) => {
  try {
    //api
    const { data } = await followuser(postData);

    //dispatch
    persondispatch({ type: "updateperson", payload: data });

    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);

    handleJwtexpire(error, userdispatch);

    return false;
  }
};

export const clearUser = async () => {
  try {
    await clearuser();
    return true;
  } catch (error) {
    if (error.response) console.log(error.response.data);
    return false;
  }
};

export const logout = (userdispatch) => {
  localStorage.clear("profile");

  userdispatch({ type: "logout" });
};
