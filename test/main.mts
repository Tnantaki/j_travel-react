import { adminData, planDatas, userDatas } from "./utils/constant";
import {
  createProfile,
  createUser,
  loginUser,
  prepareUserData,
  uploadProfileImage,
} from "./mockFuntion/mockUser.mts";
import type { ApiResponse, ResponsePlanType } from "./utils/type";
import { createPlan, getAllPlans } from "./mockFuntion/mockPlan.mts";
import { createBooking, createGroup } from "./mockFuntion/mockBooking.mts";

function printResult(msg: string, result: ApiResponse, email: string) {
  if (result.success) {
    console.log(`✅ ${msg} successfully: ${email}`);
  } else {
    console.log(`❌ Failed to ${msg}: ${email} - ${result.error}`);
  }
}

// Create multiple user
async function createMultiUser() {
  for (const user of userDatas) {
    const result = await createUser({
      email: user.email,
      password: user.password,
    });
    printResult("Create user", result, user.email);
  }
}

async function loginMultiUser() {
  for (const user of userDatas) {
    const result = await loginUser({
      email: user.email,
      password: user.password,
    });
    if (result.success) {
      user.token = result.data;
    }
    printResult("Login user", result, user.email);
  }
}

async function createMutiProfile() {
  let result;
  for (const user of userDatas) {
    result = await createProfile({
      email: user.email,
      token: user.token,
      name: user.name,
    });
    result = await uploadProfileImage(user.imgPath, user.token);

    printResult("Create Profile", result, user.email);
  }
}

async function createAdmin() {
  let result = await createUser({
    email: adminData.email,
    password: adminData.password,
    isAdmin: true,
  });
  printResult("Create admin", result, adminData.email);

  result = await loginUser({
    email: adminData.email,
    password: adminData.password,
  });
  if (result.success) {
    adminData.token = result.data;
  }
  printResult("Login admin", result, adminData.email);

  result = await createProfile({
    email: adminData.email,
    token: adminData.token,
    name: adminData.name,
  });
  result = await uploadProfileImage(adminData.imgPath, adminData.token);
  printResult("Create Admin Profile", result, adminData.email);
}

async function createMutiPlan() {
  for (const plan of planDatas) {
    const result = await createPlan(plan, adminData.token);
    printResult("Create Plan", result, plan.title);
  }
}

async function createMultiBooking() {
  await prepareUserData();
  const plans = await getAllPlans();
  const planIds: string[] = (plans.data as ResponsePlanType[]).map(
    (plan) => plan._id
  );

  let result;
  result = await createBooking(planIds[0]!, adminData, [
    userDatas[0]!,
    userDatas[1]!,
    userDatas[2]!,
  ]);
  printResult("Create Booking", result, "");

  result = await createGroup(planIds[1]!, adminData, [
    userDatas[3]!,
    userDatas[4]!,
  ]);
  printResult("Create Booking", result, "");

  result = await createGroup(planIds[2]!, adminData);
  printResult("Create Booking", result, "");
}

// await createMultiUser();
// await loginMultiUser();
// await createMutiProfile();
// await createAdmin();
// await createMutiPlan()
// await createMultiBooking();
