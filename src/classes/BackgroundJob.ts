import { BackgroundJob as BackgroundJobType } from '@/backgroundJobs'
import { FetchBackgroundJob } from '@/apis/background_jobs'

export class BackgroundJob implements BackgroundJobType {
  id: string
  status: string
  progress: number
  total: number
  createdAt: Date
  finishedAt: Date
  jobType: string

  constructor (backgroundJob: BackgroundJobType) {
    this.id = backgroundJob.id
    this.status = backgroundJob.status
    this.progress = backgroundJob.progress
    this.total = backgroundJob.total
    this.createdAt = backgroundJob.createdAt
    this.finishedAt = backgroundJob.finishedAt
    this.jobType = backgroundJob.jobType
  }

  isJobCompleted (): boolean {
    return this.status === 'complete'
  }

  startPolling (callback: (backgroundJob: BackgroundJobType) => void, interval = 1000, maxRetryCount = 50): void {
    if (this.isJobCompleted()) {
      return
    }
    const timer = setInterval(async () => {
      const newBackgroundJob = await FetchBackgroundJob(this.id)

      if (newBackgroundJob) {
        this.status = newBackgroundJob.status
      }
      console.log('status:', this.status)

      if (this.isJobCompleted()) {
        clearInterval(timer)
        callback(newBackgroundJob)
      }
      maxRetryCount--
      if (maxRetryCount <= 0) {
        clearInterval(timer)
      }
    }, interval)
  }
}
