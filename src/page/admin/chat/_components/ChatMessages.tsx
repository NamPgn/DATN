import React from 'react';
import { List, Typography } from 'antd';
import dayjs from 'dayjs';
import { PhotoView } from 'react-photo-view';

const { Text } = Typography;

interface ChatMessagesProps {
	messages: any[];
	bottomRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages = ({ messages, bottomRef }: ChatMessagesProps) => {
	return (
		<List
			itemLayout="horizontal"
			dataSource={messages || []}
			renderItem={(message: any) => {
				const isAdmin = message.sender_type === 'admin' || message.sender_type === 'system' || message.sender_type === 'staff';
				return (
					<List.Item style={{
						display: 'flex',
						justifyContent: isAdmin ? "flex-end" : "flex-start",
						border: "none"
					}}>
						<div
							style={{
								background: isAdmin ? "" : '#1c1c1d14'
							}}
							className={`w-6/12 ${isAdmin ? 'text-end ' : 'p-2 rounded'}`}
						>
							<Text className={`rounded-lg w-full ${isAdmin
								? 'bg-blue-500 text-white p-2'
								: ''
								}`}>
								{message.content}
							</Text>
							{message.attachments?.length > 0 && (
								<div
									style={{
										marginTop: '0.5rem',
										display: 'grid',
										gap: '0.5rem',
										gridTemplateColumns: `repeat(${message.attachments?.length || 1}, minmax(0, 1fr))`
									}}
								>
									{message.attachments.map((att: any, index: number) => (
										<PhotoView width={200} height={200} key={index} src={att.url}>
											<img src={att.url} alt="" className="object-cover rounded border cursor-pointer" />
										</PhotoView>

									))}
								</div>
							)}
							<Text
								className={`block text-xs  ${isAdmin ? 'text-gray-400 mt-2' : 'text-gray-400 '
									}`}
							>
								{dayjs(message.last_message_time).format('DD/MM/YYYY')}
							</Text>
						</div>
						<div ref={bottomRef} />
					</List.Item>
				);
			}}
		/>
	);
};

export default ChatMessages; 