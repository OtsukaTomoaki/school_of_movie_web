import axios from 'axios';
import {
  FetchTalkRooms,
  CreateTalkRooms,
  TalkRoomBodyToCreate
} from '@/apis/talk_rooms';

jest.mock('axios');

describe('TalkRooms関連の関数のテスト', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('トークルーム情報をすべて取得する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = {
      data: {
        talk_rooms: [
          {
            id: '1',
            name: 'TalkRoom1',
            describe: 'Description1',
            status: 'active',
            created_at: '2023-09-30T16:06:00.957Z',
            updated_at: '2023-09-30T16:06:00.957Z',
          },
          // 必要に応じて他のトークルームデータを追加
        ]
      }
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await FetchTalkRooms();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].name).toBe('TalkRoom1');
    // 他のフィールドも確認してください
  });

  it('新しいトークルームを作成する', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockResponse = {
      data: {
        id: '2',
        name: 'NewTalkRoom',
        describe: 'NewDescription',
        status: 'active',
        created_at: '2023-10-01T17:07:01.000Z',
        updated_at: '2023-10-01T17:07:01.000Z',
      }
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const newTalkRoom: TalkRoomBodyToCreate = {
      name: 'NewTalkRoom',
      describe: 'NewDescription',
      status: 1
    };
    const result = await CreateTalkRooms(newTalkRoom);
    expect(result.id).toBe('2');
    expect(result.name).toBe('NewTalkRoom');
    // 他のフィールドも確認してください
  });
});
