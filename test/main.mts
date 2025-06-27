import { createProfile, createUser, loginUser } from "./mockUser.mts";

const userDatas = [
  {
    email: "admin@email.com",
    token: "",
    name: "admin scotland",
  },
  {
    email: "mos1@email.com",
    token: "",
    name: "mos1 america",
  },
  {
    email: "mos2@email.com",
    token: "",
    name: "mos2 thailand",
  },
  {
    email: "mos3@email.com",
    token: "",
    name: "mos3 british",
  },
  {
    email: "test1@email.com",
    token: "",
    name: "test1 japan",
  },
  {
    email: "test2@email.com",
    token: "",
    name: "test2 india",
  },
];

// Create multiple user
async function createMultiUser() {
  for (const user of userDatas) {
    const result = await createUser({
      email: user.email,
      password: "12345678",
    });
    if (result.success) {
      console.log(`✅ User created successfully: ${user.email}`);
    } else {
      console.log(`❌ Failed to create user: ${user.email} - ${result.error}`);
    }
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
      console.log(`✅ Login successfully: ${user.email}`);
    } else {
      console.log(`❌ Failed to login user: ${user.email} - ${result.error}`);
    }
  }
}

async function createMutiProfile() {
  for (const user of userDatas) {
    const result = await createProfile({
      email: user.email,
      token: user.token,
      name: user.name,
    });
    if (result.success) {
      user.token = result.data;
      console.log(`✅ Create Profile successfully: ${user.email}`);
    } else {
      console.log(
        `❌ Failed to create Profile: ${user.email} - ${result.error}`
      );
    }
  }
}

await createMultiUser();
await loginMultiUser();
await createMutiProfile();
