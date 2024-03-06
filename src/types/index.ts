type Skills = {
  id: number;
  skill_name: string;
  description: string;
  proficency_lvl: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
  value: string;
  text: string;
  selected: boolean;
  element?: HTMLElement;
};

type Projects = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  img_url: string;
  project_url: string;
  github_url: string;
  tech_stack: string[];
  created_at: Date;
  updated_at: Date;
}



export type { Skills, Projects };