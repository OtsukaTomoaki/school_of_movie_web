export interface BackgroundJob {
  id: string,
  status: string,
  progress: number,
  total: number,
  createdAt: Date,
  finishedAt: Date,
  jobType: string
}
