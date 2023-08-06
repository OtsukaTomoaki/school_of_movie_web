import axios from 'axios'
import { BackgroundJob } from '@/backgroundJobs'
import { API_V1_BASE_URL } from './base'

export const FetchBackgroundJob = async (id: string): Promise<BackgroundJob> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const backgroundJob: Promise<BackgroundJob> = axios.get(API_V1_BASE_URL + `/background_jobs/${id}`, params).then((response) => {
    return {
      id: response.data.id,
      status: response.data.status,
      progress: response.data.progress,
      total: response.data.total,
      createdAt: response.data.created_at,
      finishedAt: response.data.finished_at
    } as BackgroundJob
  })
  return backgroundJob
}
