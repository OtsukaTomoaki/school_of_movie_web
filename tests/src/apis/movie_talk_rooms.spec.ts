import axios from 'axios'
import { FetchMovieTalkRoom } from '@/apis/movie_talk_rooms'

// axiosのモックを作成
jest.mock('axios')

describe('FetchMovieTalkRoom関数のテスト', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('指定した映画のIDに対するトークルーム情報を取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    const mockResponse = {
      data: {
        id: '123',
        movie_id: '456',
        talk_room_id: '789'
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mockResponse)

    const result = await FetchMovieTalkRoom('456')
    expect(result.id).toBe('123')
    expect(result.movieId).toBe('456')
    expect(result.talkRoomId).toBe('789')
  })
})
