export interface Step {
  step: number;
  title: string;
  description: string;
  apiRoutes?: string[];
  features?: string[];
  components?: string[];
  considerations?: string[];
  actionableSteps?: string[];
  videoId?: string;
  timestamps?: string[];
  type: "setup" | "roadmap";
}
