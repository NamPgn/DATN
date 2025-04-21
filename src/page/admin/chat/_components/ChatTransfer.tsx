import { List, Avatar, Badge, Typography, Tag, Button } from 'antd';
import { MessageSquare } from 'lucide-react';

const { Text } = Typography;

interface Staff {
    id: number;
    name: string;
    avatar: string;
}

interface Transfer {
    id: number;
    staff: Staff;
    to_staff_id: number;
    conversation_id: number;
    note: string;
    created_at: string;
    status: 'pending' | 'accepted' | 'rejected';
}

interface ChatTransferProps {
    selectedChat: string | number;
    onSelectChat: (id: string | number) => void;
    tranferData: Transfer[];
    rejectTranferChat: (id: any) => void;
    acceptTranferChat: (id: any) => void
}

const ChatTransfer = ({ selectedChat, onSelectChat, tranferData, rejectTranferChat, acceptTranferChat }: ChatTransferProps) => {

    const handleAccept = (id: any) => {
        acceptTranferChat(id)
    }

    const handleReject = (id: any) => {
        rejectTranferChat(id)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'accepted':
                return 'success';
            case 'rejected':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Đang chờ';
            case 'accepted':
                return 'Đã chấp nhận';
            case 'rejected':
                return 'Đã từ chối';
            default:
                return 'Không xác định';
        }
    };

    return (
        <List
            className="conversations-list"
            itemLayout="horizontal"
            dataSource={tranferData}
            renderItem={(transfer: Transfer) => (
                <List.Item
                    className={`cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors ${selectedChat === transfer.conversation_id ? 'bg-blue-50' : ''
                        }`}
                    onClick={() => onSelectChat(transfer.conversation_id)}
                >
                    <List.Item.Meta
                        avatar={
                            <Badge
                                dot
                                status={getStatusColor(transfer.status)}
                                offset={[-4, 32]}
                            >
                                <Avatar
                                    src={transfer.staff.avatar}
                                    className="bg-blue-500"
                                    icon={!transfer.staff.avatar && <MessageSquare size={20} />}
                                />
                            </Badge>
                        }
                        title={
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Text strong>{transfer.staff.name}</Text>
                                    <Tag color={getStatusColor(transfer.status)}>
                                        {getStatusText(transfer.status)}
                                    </Tag>
                                </div>
                                <Text className="text-xs text-gray-500">
                                    {new Date(transfer.created_at).toLocaleString('vi-VN')}
                                </Text>
                            </div>
                        }
                        description={
                            <div className="flex flex-col gap-1">
                                <Text className="text-sm text-gray-600">
                                    Ghi chú: {transfer.note || 'Không có ghi chú'}
                                </Text>
                                <Text className="text-xs text-gray-400">
                                    ID cuộc trò chuyện: {transfer.conversation_id}
                                </Text>
                                <Button
                                    variant='filled'
                                    color='primary'
                                    onClick={() => {
                                        handleAccept(transfer?.id)
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Chấp nhận
                                </Button>
                                <Button
                                    variant='filled'
                                    color='danger'
                                    onClick={() => {
                                        handleReject(transfer?.id)
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Từ chối
                                </Button>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ChatTransfer; 