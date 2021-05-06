import { signin, signup, forgot, reset } from "../api/user";

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

export const logout = (userdispatch) => {
  localStorage.clear("profile");

  userdispatch({ type: "logout" });
};
