import { useContext, useEffect, useRef, useState } from 'react';
import { Layout, Input, Typography, Tabs } from 'antd';
import { MessageSquare } from 'lucide-react';
import { useGetChatConversations, useGetChatConversationMessages, useSendMessage, useGetChatUnassigned, useChatClaimMsg, useCloseChatMsg, useChatAll, useGetEmployee, useChangeEmployee, useChangeEmployeeChat } from '../../../hook/chat';
import TailwindComponent from '../../../components/Tailwind/TailwinComponent';
import ChatList from './_components/ChatList';
import ChatHeader from './_components/ChatHeader';
import ChatMessages from './_components/ChatMessages';
import ChatInput from './_components/ChatInput';
import { useQueryClient } from 'react-query';
import ChatUnassigned from './_components/ChatUnassigned';
import { toast } from 'react-toastify';
import { UsersContext } from '../../../context/usersContext';
import ChatAll from './_components/ChatAll';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const { Search: SearchInput } = Input;
const { Text } = Typography;

const AdminChat = () => {
	const [selectedChat, setSelectedChat] = useState<string | number>(1);
	const [messageText, setMessageText] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const bottomRef = useRef<HTMLDivElement>(null);
	const [url, setUrl] = useState<any>(null);
	const queryClient = useQueryClient();
	const { userId }: any = useContext(UsersContext) || {}
	const { data: conversationsData }: any = useGetChatConversations({});
	const { data: messages }: any = useGetChatConversationMessages(selectedChat || '', {
		enabled: !!selectedChat
	});
	const { data: unassignedData }: any = useGetChatUnassigned({});
	const { data: chatAll }: any = useChatAll({});
	const { data: employee }: any = useGetEmployee({});


	const { mutate: changeEmployee, isLoading: loadingChangeEmployee }: any = useChangeEmployee({
		onSuccess: () => {
			toast.success('Gán hội thoại thành công')
		},
		onError: () => {
			toast.error('Gán hội thoại thất bại')
		}
	});

	const { mutate: closeChatMsg, isLoading: loadingClose }: any = useCloseChatMsg({
		onSuccess: () => {
			toast.success('Đóng hội thoại thành công')
		},
		onError: () => {
			toast.error('Đóng hội thoại thất bại')
		}
	});

	const { mutate: sendMessage }: any = useSendMessage({
		onSuccess: () => {
			setMessageText('');
			queryClient.invalidateQueries({ queryKey: ['conversation-messages', selectedChat] });
		}
	});

	const { mutate: onClaimMsg }: any = useChatClaimMsg({
		onSuccess: () => {
			toast.success('Nhận thành công')
		},
		onError: () => {
			toast.error('Nhận thất bại')
		}
	});

	const { mutate: changeEmployeeChat }: any = useChangeEmployeeChat({
		onSuccess: () => {
			toast.success('Chuyển nhân viên thành công')
		},
		onError: () => {
			toast.error('Chuyển nhân viên thất bại')
		}
	});

	useEffect(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		});
	}, [selectedChat]);

	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages, selectedChat]);


	const handleSendMessage = () => {
		if (!messageText.trim() || !selectedChat) return;
		const dataAtm = url?.map((item: any) => ({
			url: item.secure_url,
			type: "image",
			name: item?.original_filename
		}))

		sendMessage({
			conversation_id: selectedChat,
			content: messageText,
			attachments: dataAtm
		});
	};

	const filteredConversations = conversationsData?.conversations?.filter((conv: any) =>
		conv.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
		conv.user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
	) || [];

	const selectedConversation = filteredConversations.find((c: any) => c.id === selectedChat);
	const handleUploadSuccess = (data: any) => {
		setUrl(data)
	};
	const handleClaimMsg = (id: any) => {
		onClaimMsg(id)
	}

	const handleCloseGroupChat = (data: any) => {
		closeChatMsg(data)
	}
	return (
		<TailwindComponent>
			<Layout className="h-screen rounded " style={{
				overflow: "hidden"
			}}>
				<Sider width={400} className="bg-white border-r">
					<div className="h-full flex flex-col">
						<div className="p-4">
							<SearchInput
								placeholder="Tìm kiếm cuộc trò chuyện..."
								onChange={(e) => setSearchQuery(e.target.value)}
								className="mb-4"
							/>
						</div>
						<Tabs defaultActiveKey="1" className="px-2 flex-1 overflow-auto">
							<TabPane tab="Bạn" key="1" className="h-full">
								<ChatList
									conversations={filteredConversations}
									selectedChat={selectedChat}
									onSelectChat={setSelectedChat}
								/>
							</TabPane>
							<TabPane tab="Chưa được gán" key="2" className="h-full">
								<ChatUnassigned changeEmployee={changeEmployee} loadingEmployee={loadingChangeEmployee} unassignedData={unassignedData} onClaimMsg={handleClaimMsg} userId={userId} employee={employee} />
							</TabPane>
							{userId?.role === 'admin' && <TabPane tab="Tất cả" key="3" className="h-full">
								<ChatAll
									conversations={chatAll?.conversations}
									selectedChat={selectedChat}
									onSelectChat={setSelectedChat} />
							</TabPane>}
						</Tabs>
					</div>
				</Sider>

				<Layout>
					{selectedChat ? (
						<>
							<ChatHeader onChangeChatByEmployee={changeEmployeeChat} conversation={selectedConversation} onCloseChatMsg={handleCloseGroupChat} isLoading={loadingClose} employee={employee} />
							<Content className="bg-gray-50 p-6">
								<div className="h-full flex flex-col">
									<div className="flex-1 overflow-y-auto mb-4">
										<ChatMessages
											messages={messages?.messages}
											bottomRef={bottomRef}
										/>
									</div>
									<ChatInput
										userId={userId}
										conversationsAdmin={chatAll?.conversations}
										conversation={selectedConversation}
										messageText={messageText}
										onMessageChange={(e) => setMessageText(e.target.value)}
										onSendMessage={handleSendMessage}
										onUploadSuccess={handleUploadSuccess}
									/>
								</div>
							</Content>
						</>
					) : (
						<div className="h-full flex items-center justify-center bg-gray-50">
							<div className="text-center text-gray-500">
								<MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
								<Text className="text-lg">Chọn một cuộc trò chuyện để bắt đầu</Text>
							</div>
						</div>
					)}
				</Layout>
			</Layout>
		</TailwindComponent>
	);
};

export default AdminChat;
