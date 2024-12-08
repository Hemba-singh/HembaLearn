import axios from 'axios';

const MOODLE_URL = import.meta.env.VITE_MOODLE_URL;
const MOODLE_TOKEN = import.meta.env.VITE_MOODLE_TOKEN;

const moodleApi = axios.create({
  baseURL: MOODLE_URL,
  params: {
    wstoken: MOODLE_TOKEN,
    moodlewsrestformat: 'json',
  },
});

export interface MoodleCourse {
  id: number;
  shortname: string;
  fullname: string;
  summary: string;
  categoryid: number;
  progress?: number;
}

export interface MoodleSection {
  id: number;
  name: string;
  summary: string;
  modules: MoodleModule[];
}

export interface MoodleModule {
  id: number;
  name: string;
  modname: string;
  contents?: {
    type: string;
    filename: string;
    fileurl: string;
  }[];
}

export const moodleService = {
  async getCourses(): Promise<MoodleCourse[]> {
    const response = await moodleApi.get('/webservice/rest/server.php', {
      params: {
        wsfunction: 'core_course_get_courses',
      },
    });
    return response.data;
  },

  async getCourseContent(courseId: number): Promise<MoodleSection[]> {
    const response = await moodleApi.get('/webservice/rest/server.php', {
      params: {
        wsfunction: 'core_course_get_contents',
        courseid: courseId,
      },
    });
    return response.data;
  },

  async enrollUser(courseId: number, userId: number): Promise<void> {
    await moodleApi.post('/webservice/rest/server.php', null, {
      params: {
        wsfunction: 'enrol_manual_enrol_users',
        enrolments: JSON.stringify([
          {
            roleid: 5, // Student role
            userid: userId,
            courseid: courseId,
          },
        ]),
      },
    });
  },
};