import axiosClient from "./axiosClient";

export async function createSessionId(): Promise<void> {
  try {
    await axiosClient.get("/session");
  } catch (error) {
    console.error("Erreur création session :", error);
    throw error;
  }
}