import axios from 'axios'
import { FetchMessages } from '@/apis/messages'

// axiosのモックを作成
jest.mock('axios')

describe('FetchMessages関数のテスト', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('指定されたトークルームIDのメッセージを取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    const mockResponse = {
      data: {
        messages: [
          {
            id: '1',
            talk_room_id: 'room1',
            user: { id: 'user1', name: 'User One' },
            content: 'Test message content',
            created_at: '2023-09-30T16:06:00.957Z',
            updated_at: '2023-09-30T16:06:00.957Z'
          }
          // 他のメッセージデータも追加できます
        ]
      }
    }
    mockedAxios.get.mockResolvedValueOnce(mockResponse)

    const result = await FetchMessages('room1')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
    expect(result[0].content).toBe('Test message content')
    expect(result[0].user.name).toBe('User One')
  })
})
