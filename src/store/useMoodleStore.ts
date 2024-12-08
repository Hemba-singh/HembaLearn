import { create } from 'zustand';
import { moodleService, type MoodleCourse, type MoodleSection } from '../lib/moodle';

interface MoodleState {
  courses: MoodleCourse[];
  currentCourse: MoodleCourse | null;
  courseContent: MoodleSection[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseContent: (courseId: number) => Promise<void>;
  enrollInCourse: (courseId: number, userId: number) => Promise<void>;
}

export const useMoodleStore = create<MoodleState>((set) => ({
  courses: [],
  currentCourse: null,
  courseContent: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true });
    try {
      const courses = await moodleService.getCourses();
      set({ courses, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchCourseContent: async (courseId: number) => {
    set({ loading: true });
    try {
      const content = await moodleService.getCourseContent(courseId);
      set({ courseContent: content, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  enrollInCourse: async (courseId: number, userId: number) => {
    set({ loading: true });
    try {
      await moodleService.enrollUser(courseId, userId);
      set({ error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));