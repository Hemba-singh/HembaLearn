export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor_id: string
          thumbnail: string
          duration: string
          level: 'Beginner' | 'Intermediate' | 'Advanced'
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          instructor_id: string
          thumbnail: string
          duration: string
          level: 'Beginner' | 'Intermediate' | 'Advanced'
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          instructor_id?: string
          thumbnail?: string
          duration?: string
          level?: 'Beginner' | 'Intermediate' | 'Advanced'
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string
          role: 'student' | 'instructor'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string
          role?: 'student' | 'instructor'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string
          role?: 'student' | 'instructor'
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          bio?: string
          location?: string
          occupation?: string
          avatar_url?: string
          cover_image_url?: string
          skills?: Json
          achievements?: Json
          social_links?: Json
          professional_interests?: string[]
          languages?: string[]
          contact_preferences?: Json
          last_updated?: string
          details?: Json
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          bio?: string
          location?: string
          occupation?: string
          avatar_url?: string
          cover_image_url?: string
          skills?: Json
          achievements?: Json
          social_links?: Json
          professional_interests?: string[]
          languages?: string[]
          contact_preferences?: Json
          last_updated?: string
          details?: Json
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          bio?: string
          location?: string
          occupation?: string
          avatar_url?: string
          cover_image_url?: string
          skills?: Json
          achievements?: Json
          social_links?: Json
          professional_interests?: string[]
          languages?: string[]
          contact_preferences?: Json
          last_updated?: string
          details?: Json
        }
      }
    }
    Views: {
      // Optional: Add any database views
    }
    Functions: {
      // Optional: Add any database functions
    }
  }
}