import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_min: number | null;
  salary_max: number | null;
  description: string;
  created_at: string;
  category: string;
  image_url: string | null;
}

interface UseJobsParams {
  keyword?: string;
  location?: string;
  page?: number;
  pageSize?: number;
}

export const useJobs = ({ keyword = "", location = "", page = 1, pageSize = 10 }: UseJobsParams = {}) => {
  return useQuery({
    queryKey: ["jobs", keyword, location, page],
    queryFn: async () => {
      let query = supabase
        .from("jobs")
        .select("*", { count: "exact" })
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      // Apply filters
      if (keyword) {
        query = query.or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%,company.ilike.%${keyword}%`);
      }

      if (location) {
        query = query.ilike("location", `%${location}%`);
      }

      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        jobs: (data as Job[]) || [],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
      };
    },
  });
};
