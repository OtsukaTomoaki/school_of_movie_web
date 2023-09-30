import axios from 'axios'
import { FetchMovieGenres } from '@/apis/movie_genres' // ここに実際のファイルのパスを入れてください

// axiosのモックを作成
jest.mock('axios')

describe('FetchMovieGenres関数のテスト', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('映画のジャンルをすべて取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    const mockResponse = {
      data: {
        movie_genres: [
          {
            id: '1',
            name: 'Action',
            created_at: '2023-09-30T16:06:00.957Z',
            updated_at: '2023-09-30T16:06:00.957Z'
          },
          {
            id: '2',
            name: 'Romance',
            created_at: '2023-10-01T17:07:01.000Z',
            updated_at: '2023-10-01T17:07:01.000Z'
          }
          // 必要に応じて他のジャンルデータを追加
        ]
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mockResponse)

    const result = await FetchMovieGenres()
    expect(result).toHaveLength(2)
    expect(result[0].name).toBe('Action')
    expect(result[1].name).toBe('Romance')
  })
})
