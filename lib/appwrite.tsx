import {
  Client,
  Account,
  ID,
  Databases,
  Avatars,
  Query,
} from "react-native-appwrite";
import { Video } from "../models/Video";
import { User } from "../models/User";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "id.bhaga.aora",
  projectId: "6631c742000003dbb8cb",
  databaseId: "6631c8490000395b93cf",
  userCollectionId: "6631c86000142d92bdbd",
  videoCollectionId: "6631c87f003520d6898e",
  storageId: "6631c9e5002725c2ee7b",
};

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

interface RegisterUserData {
  email: string;
  password: string;
  username: string;
}
interface LoginUserData {
  email: string;
  password: string;
}

export async function registerUser(userData: RegisterUserData): Promise<any> {
  try {
    const newUser = await account.create(
      ID.unique(),
      userData.email,
      userData.password,
      userData.username
    );

    await createNewUserDocument(newUser.$id, userData.email, userData.email);
    const session = await loginUser(userData);
    return session;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(userData: LoginUserData): Promise<User> {
  try {
    await account.createEmailSession(userData.email, userData.password);

    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (error) {
    throw error;
  }
}

async function createNewUserDocument(
  accountId: string,
  email: string,
  username: string
): Promise<any> {
  try {
    const avatarUrl = avatar.getInitials(username);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        account_id: accountId,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const CurrentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );

    if (!CurrentUser) throw Error;

    return CurrentUser.documents[0];
  } catch (error) {
    throw error;
  }
}

export async function getAllPosts(): Promise<Video[]> {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
}

export async function getLatestVideo(): Promise<Video[]> {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
}
export async function getSearchPost(
  query: string | undefined
): Promise<Video[]> {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
}
export async function getuserPost(id: string | undefined): Promise<Video[]> {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", id)]
    );

    return posts.documents;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw error;
  }
}
