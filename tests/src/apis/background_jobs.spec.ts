import axios from 'axios'
import { FetchBackgroundJob } from '@/apis/background_jobs'
import { API_V1_BASE_URL, API_V1_BASE_PARAMS } from '@/apis/base'

// axiosのモックを作成
jest.mock('axios')

describe('FetchBackgroundJob 関数', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('指定されたIDのバックグラウンドジョブを取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    const testId = '12345'

    const mockData = {
      id: testId,
      status: 'processing',
      progress: 5,
      total: 100,
      created_at: '2023-10-01T12:00:00Z',
      finished_at: null as string | null,
    }

    mockedAxios.get.mockResolvedValueOnce({ data: mockData })

    const expectedBackgroundJob = {
      id: testId,
      status: 'processing',
      progress: 5,
      total: 100,
      createdAt: '2023-10-01T12:00:00Z',
      finishedAt: null as string | null,
    }

    const result = await FetchBackgroundJob(testId)
    expect(result).toEqual(expectedBackgroundJob)
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_V1_BASE_URL}/background_jobs/${testId}`, API_V1_BASE_PARAMS)  // APIのベースURLとパラメータを適切に置き換えてください
  })
})
