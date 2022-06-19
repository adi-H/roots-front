import { Quiz } from "../types/types";
import { axiosInstance } from "./AxiosInstance";

export class QuizService {
  public static async getAll() {
    return (await axiosInstance.get<Quiz[]>(`/quizzes`)).data;
  }

  public static async deleteQuiz(itemId: number) {
    await axiosInstance.delete(`/quizzes/${itemId}`, {});
  }

  public static async createQuiz(item: Omit<Quiz, "id">) {
    await axiosInstance.post<Quiz>(`/quizzes/create`, item);
  }
}
