import { adminData, planDatas, userDatas } from "./utils/constant";
import {
  createProfile,
  createUser,
  loginUser,
} from "./mockFuntion/mockUser.mts";
import type { ApiResponse } from "./utils/type";
import { createPlan } from "./mockFuntion/mockPlan.mts";
import { stat } from "fs/promises";
import { chownSync } from "fs";

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
      password: "12345678",
    });
    printResult("Create user", result, user.email);
  }
}

async function loginMultiUser() {
  for (const user of userDatas) {
    const result = await loginUser({
      email: user.email,
      password: "12345678",
    });
    if (result.success) {
      user.token = result.data;
    }
    printResult("Login user", result, user.email);
  }
}

async function createMutiProfile() {
  for (const user of userDatas) {
    const result = await createProfile({
      email: user.email,
      token: user.token,
      name: user.name,
    });
    printResult("Create Profile", result, user.email);
  }
}

async function createAdmin() {
  let result = await createUser({
    email: adminData.email,
    password: "12345678",
    isAdmin: true
  });
  printResult("Create admin", result, adminData.email);

  result = await loginUser({
    email: adminData.email,
    password: "12345678",
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
  printResult("Create Admin Profile", result, adminData.email);
}

async function createMutiPlan() {
  for (const plan of planDatas) {
    const result = await createPlan(plan, adminData.token);
    printResult("Create Plan", result, plan.title);
  }
}

// await createMultiUser();
// await loginMultiUser();
// await createMutiProfile();
await createAdmin();
await createMutiPlan()
