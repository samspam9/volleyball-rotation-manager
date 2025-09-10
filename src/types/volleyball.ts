export interface Player {
  id: number;
  role: string;
  abbreviation: string;
}

export type Phase = "starting" | "serve" | "serveReceive";
