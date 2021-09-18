import axios from "axios";
const BASE_URL =
  "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";

let token = null;
const setToken = (newToken) => {
  console.log("Setting google fit token ");
  token = `Bearer ${newToken}`;
};

const absolutedatetoday = new Date(new Date().setHours(0, 0, 0, 0));
let absolutedatetomorrow = absolutedatetoday;
absolutedatetomorrow = absolutedatetomorrow.setDate(
  absolutedatetoday.getDate() + 1
);

export const fitScopes =
  "email profile https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.blood_pressure.read openid";

const getSteps = async () => {
  const config = {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  };
  const body = {
    aggregateBy: [
      {
        dataTypeName: "com.google.step_count.delta",
      },
    ],
    bucketByTime: {
      durationMillis: 86400000,
    },
    endTimeMillis: absolutedatetomorrow,
    startTimeMillis: absolutedatetomorrow - 30 * 86400000,
  };
  try {
    const res = await axios.post(BASE_URL, body, config);
    return res.data.bucket.map((activity) => {
      return {
        date: new Date(parseInt(activity.startTimeMillis)),
        steps: activity.dataset[0].point[0]
          ? parseInt(activity.dataset[0].point[0].value[0].intVal)
          : null,
      };
    });
  } catch (error) {
    console.log("error occured");
  }
};

const getCalories = async () => {
  const config = {
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
  };
  const body = {
    aggregateBy: [
      {
        dataTypeName: "com.google.calories.expended",
      },
    ],
    bucketByTime: {
      durationMillis: 86400000,
    },
    endTimeMillis: absolutedatetomorrow,
    startTimeMillis: absolutedatetomorrow - 30 * 86400000,
  };

  try {
    const res = await axios.post(BASE_URL, body, config);
    return res.data.bucket.map((activity) => {
      return {
        date: new Date(parseInt(activity.startTimeMillis)),
        calories: activity.dataset[0].point[0]
          ? parseInt(activity.dataset[0].point[0].value[0].fpVal)
          : null,
      };
    });
  } catch (error) {
    console.log("error occured");
  }
};

export default { setToken, getSteps, getCalories };
